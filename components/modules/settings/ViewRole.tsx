import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";

import Button from "@/components/ui/Button/Button";
import ChevronLeft from "@/components/icons/ChevronLeft";
import RoleBox from "./RoleBox";
import { useViewRoleQuery } from "@/api-services/settingsService";
import { rolesOptionsArr } from "@/constants";
import Loader from "@/components/ui/Loader/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useUpdateRoleMutation } from "@/api-services/settingsService";
import { CreateRolePayload } from "@/models/Settings";
import { toast } from "react-toastify";

interface Props {
  handleBack: () => void;
}

const ViewRole: FC<Props> = ({ handleBack }) => {
  const router = useRouter();
  const [
    updateRole,
    { isSuccess, isLoading: updateLoading, error: updateError },
  ] = useUpdateRoleMutation();
  const [roleOptions, setRoleOptions] = useState([...rolesOptionsArr]);
  const [roles, setRoles] = useState(roleOptions.map((r) => r.label));
  const [isChangeMade, setIsChangeMade] = useState<boolean>(false);

  const { roleId } = router.query;

  const { data, isLoading, error, refetch } = useViewRoleQuery(
    { roleId: String(roleId) },
    { skip: !roleId, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const handleIsChangeMade = () => {
    if (isChangeMade !== true) setIsChangeMade(true);
  };

  const handleCheckChange = ({
    checked,
    label,
    key,
  }: {
    checked: boolean;
    label: string;
    key: "isChecked" | "read" | "write";
  }) => {
    const mapped = roleOptions.map((role) => {
      if (role.label === label) {
        if (key === "isChecked") return { ...role, isChecked: checked };
        else if (key === "read")
          return { ...role, read: checked, write: false };
        else if (key === "write")
          return { ...role, write: checked, read: false };
        return role;
      }
      return role;
    });

    setRoleOptions(mapped);
    handleIsChangeMade()
  };

  const getDefaultRights = (
    data: Record<string, { read: boolean; write: boolean }>
  ) => {
    const skipKeys = ["id", "name", "level", "total_number_of_permissions"];
    const roleswithDefaultRights: typeof rolesOptionsArr = [];
    for (const key in data) {
      if (skipKeys.indexOf(key) === -1) {
        const role = [...roleOptions].filter((item) => item.label === key)[0];
        if (role) {
          role.read = data[key].read;
          role.write = data[key].write;

          roleswithDefaultRights.push(role);
        }
      }
    }

    return roleswithDefaultRights;
  };

  const getRole = (label: string) => {
    const role = roleOptions.filter((role) => {
      return role.label === label;
    });

    return role[0];
  };

  const generatePayload = ({
    name,
    level,
  }: {
    name: string;
    level: number;
  }): CreateRolePayload => {
    const payload: Record<string, { read: boolean; write: boolean }> = {};

    roles.forEach((role) => {
      payload[role] = {
        read: getRole(role).read,
        write: getRole(role).write,
      };
    });

    return { ...payload, name, level } as CreateRolePayload;
  };

  useEffect(() => {
    if (data) {
      const roles = getDefaultRights(data as any);
      setRoleOptions(roles);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Role Successfully Updated");
      handleBack();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (updateError && "data" in updateError) {
      const { message }: any = updateError.data;
      toast.error(message);
    }
  }, [updateError]);

  useEffect(() => {
    if (error && "data" in error) {
      const { message }: any = error.data;
      toast.error(message);
    }
  }, [error]);

  return (
    <div>
      <Button
        title="Back to roles"
        variant="text"
        startIcon={<ChevronLeft />}
        onClick={handleBack}
      />

      <div className="pt-10 pb-3 border-b border-b-[#E6E6E6] flex justify-between items-center">
        {data && (
          <div>
            <p className="text-xl font-semibold mb-4">{data.name}</p>
            <p className="text-base">
              {data.total_number_of_permissions} permissions
            </p>
          </div>
        )}
        <div>
          {data && isChangeMade && (
            <Button
              title="Save changes"
              loading={updateLoading}
              disabled={updateLoading}
              onClick={() => {
                const payload = generatePayload({ level: 4, name: data.name });
                updateRole({ payload, roleId: String(roleId) });
              }}
            />
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {data && !isLoading && !error && (
          <>
            {roleOptions.map((role, idx) => {
              return (
                <RoleBox
                  key={idx}
                  title={role.title}
                  readChecked={role.read}
                  writeChecked={role.write}
                  isChecked={role.isChecked}
                  handleChecked={(checked) =>
                    handleCheckChange({
                      checked,
                      label: role.label,
                      key: "isChecked",
                    })
                  }
                  handleRead={(checked) =>
                    handleCheckChange({
                      checked,
                      label: role.label,
                      key: "read",
                    })
                  }
                  handleWrite={(checked) =>
                    handleCheckChange({
                      checked,
                      label: role.label,
                      key: "write",
                    })
                  }
                />
              );
            })}
          </>
        )}
      </div>
      {!data && !error && isLoading && (
        <div className="flex flex-col items-center justify-center gap-3 w-full">
          <Loader />
        </div>
      )}
      {!data && error && !isLoading && (
        <div className="flex flex-col items-center justify-center gap-3">
          <ErrorMessage message="Oops! Error fetching roles" />
          <Button title="Refetch" onClick={refetch} />
        </div>
      )}
    </div>
  );
};

export default ViewRole;
