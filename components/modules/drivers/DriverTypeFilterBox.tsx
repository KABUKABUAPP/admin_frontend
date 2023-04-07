import React, { FC } from "react";
import DriverOptionItem from "./DriverOptionItem";

interface Props {
  options: { title: string; isActive: boolean; keyVal: string }[];
  handleClickOption: (key: string) => void;
}

const DriverTypeFilterBox: FC<Props> = ({ options, handleClickOption }) => {
  return (
    <div className="flex max-sm:flex-col w-full">
      {options.map((option, idx) => (
        <DriverOptionItem
          {...option}
          handleClick={(key) => handleClickOption(key)}
          key={idx}
        />
      ))}
    </div>
  );
};

export default DriverTypeFilterBox;
