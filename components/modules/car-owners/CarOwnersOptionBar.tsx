import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

import CarOwnersOptionItem from "./CarOwnersOptionItem";
import Button from "@/components/ui/Button/Button";
import AddIcon from "@/components/icons/AddIcon";

interface Props {
  options: { title: string; isActive: boolean; keyVal: string }[];
  handleClickOption: (key: string) => void;
}

const CarOwnersOptionBar: FC<Props> = ({ handleClickOption, options }) => {
  
  const router = useRouter();

  return (
    <div className="bg-[#FFFFFF] w-full px-2 py-6 flex max-sm:flex-col rounded-lg justify-between items-center gap-3">
      <div className="flex max-sm:flex-col">
        {options.map((item, idx) => {
          return (
            <CarOwnersOptionItem
              {...item}
              key={idx}
              handleClick={(key) => handleClickOption(key)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CarOwnersOptionBar;
