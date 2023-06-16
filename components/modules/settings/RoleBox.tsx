import React, { FC } from "react";
import { Checkbox, Radio, Switch } from "pretty-checkbox-react";

const RoleBox: FC = () => {
  return (
    <div className="bg-[#F8F8F8] rounded-lg w-[150px] p-2">
      <div className="pb-2 border-b border-b-gray-400">
        <Checkbox className="p8 text-xl" bigger>Trips</Checkbox>
      </div>
    </div>
  );
};

export default RoleBox;
