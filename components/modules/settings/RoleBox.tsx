import React, { FC } from "react";

import Checkbox from "react-custom-checkbox";

interface Props {
  title: string;
}

const RoleBox: FC<Props> = ({ title }) => {
  return (
    <div className="bg-[#F8F8F8] rounded-lg w-[150px] p-3">
      <div className="pb-2 border-b border-b-gray-400 flex items-center gap-3">
        <Checkbox
          borderColor="#000000"
          borderRadius={3}
          icon={
            <div className="w-[10px] h-[10px] bg-[#000000] rounded-sm"></div>
          }
          className={"cursor-pointer"}
        />
        <p className="text-base font-semibold">{title}</p>
      </div>

      <div className="mt-3">
        <div className="pb-2 flex items-center gap-3">
          <Checkbox
            borderColor="#000000"
            borderRadius={100}
            icon={
              <div className="w-[10px] h-[10px] bg-[#000000] rounded-full"></div>
            }
            className={"cursor-pointer"}
          />
          <p className="text-xs font-semibold">Read</p>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox
            borderColor="#000000"
            borderRadius={100}
            icon={
              <div className="w-[10px] h-[10px] bg-[#000000] rounded-full"></div>
            }
            className={"cursor-pointer"}
          />
          <p className="text-xs font-semibold">Read + Write</p>
        </div>
      </div>
    </div>
  );
};

export default RoleBox;
