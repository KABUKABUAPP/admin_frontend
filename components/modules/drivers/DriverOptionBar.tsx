import React, { FC } from "react";
import DriverOptionItem from "./DriverOptionItem";

interface Props {
  options: { title: string; isActive: boolean; keyVal: string }[];
  handleClickOption: (key: string) => void;
}

const DriverOptionBar: FC<Props> = ({ handleClickOption, options }) => {
  return (
    <div className="bg-[#FFFFFF] w-full px-2 py-6 flex max-sm:flex-col rounded-lg">
      {options.map((item, idx) => {
        return (
          <DriverOptionItem
            {...item}
            key={idx}
            handleClick={(key) => handleClickOption(key)}
          />
        );
      })}
    </div>
  );
};

export default DriverOptionBar;
