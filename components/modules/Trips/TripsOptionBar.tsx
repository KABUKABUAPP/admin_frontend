import React, { FC, useState } from "react";
import TripOptionItem from "./TripOptionItem";

interface Props {
  options: { title: string; isActive: boolean, keyVal: string }[];
  handleClickOption: (key: string) => void;
}

const TripsOptionBar: FC<Props> = ({ options, handleClickOption }) => {
  return (
    <div className="bg-[#FFFFFF] w-full px-2 py-6 flex max-sm:flex-col rounded-lg">
      {options.map((item, idx) => {
        return (
          <TripOptionItem
            {...item}
            key={idx}
            handleClick={(key) => handleClickOption(key)}
          />
        );
      })}
    </div>
  );
};

export default TripsOptionBar;
