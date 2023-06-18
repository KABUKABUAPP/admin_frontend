import React, { FC, useState } from "react";
import RoleBox from "./RoleBox";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import { rolesArr } from "@/constants";

const CreateRole: FC = () => {
  const [roleOptions, setRoleOptions] = useState(rolesArr);

  return (
    <div>
      <div className="pb-5 mb-6 border-b border-b-[#E6E6E6]">
        <p className="text-xs mb-3">Role Title</p>
        <div>
          <TextField placeholder="Title here" />
        </div>
      </div>
      <div className="mt-6 mb-4 grid grid-cols-3 gap-4">
        {roleOptions.map((role) => {
          return <RoleBox title={role.title} />;
        })}
      </div>

      <div className="flex justify-end">
        <Button title="Create role" />
      </div>
    </div>
  );
};

export default CreateRole;
