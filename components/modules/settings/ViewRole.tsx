import React, { FC } from "react";
import { useRouter } from "next/router";

import Button from "@/components/ui/Button/Button";
import ChevronLeft from "@/components/icons/ChevronLeft";
import RoleBox from "./RoleBox";
import { useViewRoleQuery } from "@/api-services/settingsService";

interface Props {
  handleBack: () => void;
}

const ViewRole: FC<Props> = ({ handleBack }) => {
  const router = useRouter();

  const { roleId } = router.query;

  const { data, isLoading, error, refetch } = useViewRoleQuery(
    { roleId: String(roleId) },
    { skip: !roleId, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  console.log(data)

  return (
    <div>
      <Button
        title="Back to roles"
        variant="text"
        startIcon={<ChevronLeft />}
        onClick={handleBack}
      />

      <div className="pt-10 pb-3 border-b border-b-[#E6E6E6] flex justify-between items-center">
        <div>
          <p className="text-xl font-semibold mb-4">Dispute Resolutor</p>
          <p className="text-base">35 permissions</p>
        </div>

        <div>
          <Button title="Save changes" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {data && (
          <>
            {/* <RoleBox title="Dasboard"/> */}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewRole;
