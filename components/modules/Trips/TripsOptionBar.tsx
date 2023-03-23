import React, { FC, useState } from "react";
import TripOptionItem from "./TripOptionItem";

interface Props {
  options: { title: string; isActive: boolean }[];
}

const TripsOptionBar: FC<Props> = ({ options }) => {
  const [optionsList, setOptionsList] = useState([...options]);

  const handleClick = (title: string) => {
    const mutatedOptions = optionsList.map((item) => {
      return item.title === title
        ? { ...item, isActive: true }
        : { ...item, isActive: false };
    });
    setOptionsList(mutatedOptions);
  };

  return (
    <div className="bg-[#FFFFFF] w-full px-2 py-6 flex max-sm:flex-col rounded-lg">
      {optionsList.map((item, idx) => {
        return (
          <TripOptionItem
            {...item}
            key={idx}
            handleClick={(title) => handleClick(title)}
          />
        );
      })}
    </div>
  );
};

export default TripsOptionBar;
