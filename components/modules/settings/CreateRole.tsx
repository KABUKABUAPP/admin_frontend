import React, { FC, useState, useEffect } from "react";

import RoleBox from "./RoleBox";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import { rolesOptionsArr } from "@/constants";
import { useFormik, FormikProvider, Form } from "formik";
import { CreateRoleValidationSchema } from "@/validationschemas/CreateRoleSchema";
import { useCreateRoleMutation } from "@/api-services/settingsService";
import { CreateRolePayload } from "@/models/Settings";
import { toast } from "react-toastify";
import ChevronLeft from "@/components/icons/ChevronLeft";

interface Props {
  handleBack: () => void;
}

const initialValues = {
  title: "",
};

const CreateRole: FC<Props> = ({ handleBack }) => {
  const [roleOptions, setRoleOptions] = useState([...rolesOptionsArr]);
  const [createRole, { isSuccess, error, isLoading }] = useCreateRoleMutation();
  const [roles, setRoles] = useState(roleOptions.map((r) => r.label));

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

  const formik = useFormik({
    initialValues,
    validationSchema: CreateRoleValidationSchema,
    onSubmit: (values) => {
      const payload = generatePayload({ level: 4, name: values.title });
      createRole(payload);
    },
  });

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
        else if (key === "read") return { ...role, read: checked, write: false };
        else if (key === "write") return { ...role, write: checked, read: false };
        return role;
      }
      return role;
    });

    setRoleOptions(mapped);
  };

  useEffect(() => {
    // reset roles
    const reset = roleOptions.map((item) => ({
      ...item,
      read: false,
      write: false,
    }));
    setRoleOptions(reset);
  }, []);

  useEffect(() => {
    if (error && "data" in error) {
      const { message }: any = error.data;
      toast.error(message);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Role Successfully Created");
      handleBack();
    }
  }, [isSuccess]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <div>
          <Button
            title="Back to roles"
            variant="text"
            startIcon={<ChevronLeft />}
            onClick={handleBack}
          />
          <div className="pt-10 pb-5 mb-6 border-b border-b-[#E6E6E6]">
            <p className="text-xl mb-3">Role Title</p>
            <div>
              <TextField
                placeholder="Title here"
                {...formik.getFieldProps("title")}
                error={formik.touched.title ? formik.errors.title : undefined}
              />
            </div>
          </div>
          <div className="mt-6 mb-4 grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:flex max-sm:flex-col max-sm:items-center">
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
          </div>

          <div className="flex justify-end">
            <Button
              title="Create role"
              type="submit"
              loading={isLoading}
              disabled={isLoading}
            />
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default CreateRole;
