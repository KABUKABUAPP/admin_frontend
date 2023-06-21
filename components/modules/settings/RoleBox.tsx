import React, { FC } from "react";

import Checkbox from "react-custom-checkbox";

interface Props {
  title: string;
  isChecked: boolean;
  readChecked: boolean;
  writeChecked: boolean;
  handleChecked: (checked: boolean) => void;
  handleRead: (checked: boolean) => void;
  handleWrite: (checked: boolean) => void;
}

const RoleBox: FC<Props> = ({
  title,
  isChecked,
  readChecked,
  writeChecked,
  handleChecked,
  handleRead,
  handleWrite
}) => {
  return (
    <div className="bg-[#F8F8F8] rounded-lg w-[150px] p-3">
      <div className="pb-2 border-b border-b-gray-400 flex items-center gap-3">
        <Checkbox
          borderColor="#000000"
          checked={true}
          borderRadius={3}
          icon={
            <div className="w-[10px] h-[10px] bg-[#000000] rounded-sm"></div>
          }
          className={"cursor-pointer"}
          onChange={(checked:boolean)=>{
            handleChecked(checked)
          }}
        />
        <p className="text-base font-semibold">{title}</p>
      </div>

      <div className="mt-3">
        <div className="pb-2 flex items-center gap-3">
          <Checkbox
            borderColor="#000000"
            borderRadius={100}
            checked={readChecked}
            icon={
              <div className="w-[10px] h-[10px] bg-[#000000] rounded-full"></div>
            }
            onChange={(checked:boolean)=>{
              handleRead(checked)
            }}
            className={"cursor-pointer"}
          />
          <p className="text-xs font-semibold">Read</p>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox
            borderColor="#000000"
            borderRadius={100}
            checked={writeChecked}
            icon={
              <div className="w-[10px] h-[10px] bg-[#000000] rounded-full"></div>
            }
            onChange={(checked:boolean)=>{
              handleWrite(checked)
            }}
            className={"cursor-pointer"}
          />
          <p className="text-xs font-semibold">Read + Write</p>
        </div>
      </div>
    </div>
  );
};

export default RoleBox;
