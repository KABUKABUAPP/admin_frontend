import React, { FC, useState } from "react";
import OptionBarItem from "./OptionBarItem";

interface Props {
  options: { title: string; isActive: boolean, keyVal: string }[];
  handleClickOption: (key: string) => void;
}

const OptionBar: FC<Props> = ({ options, handleClickOption }) => {
  return (
    <div className="bg-[#FFFFFF] w-full px-2 py-6 flex max-sm:flex-col rounded-lg">
      {options.map((item, idx) => {
        return (
          <OptionBarItem
            {...item}
            key={idx}
            handleClick={(key) => handleClickOption(key)}
          />
        );
      })}
    </div>
  );
};

export default OptionBar;
