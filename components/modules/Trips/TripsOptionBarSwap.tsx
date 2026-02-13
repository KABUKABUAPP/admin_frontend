import React, { FC } from "react";
import TripOptionItemSwap from "./TripOptionItemSwap";

interface Props {
  options: { title: string; isActive: boolean; keyVal: string }[];
  handleClickOption: (key: string) => void;
}

const TripsOptionBarSwap: FC<Props> = ({ options, handleClickOption }) => {
  return (
    <div className="w-full py-3 flex max-sm:flex-col rounded-lg overflow-x-auto">
      {options.map((item, idx) => {
        return (
          <TripOptionItemSwap
            {...item}
            key={idx}
            handleClick={(key) => handleClickOption(key)}
          />
        );
      })}
    </div>
  );
};

export default TripsOptionBarSwap;
