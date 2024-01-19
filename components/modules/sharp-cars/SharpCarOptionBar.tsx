import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

import SharpCarOptionItem from "./SharpCarOptionItem";
import Button from "@/components/ui/Button/Button";
import AddIcon from "@/components/icons/AddIcon";

interface Props {
  options: { title: string; isActive: boolean; keyVal: string }[];
  handleClickOption: (key: string) => void;
}

const SharpCarOptionBar: FC<Props> = ({ handleClickOption, options }) => {
  
  const router = useRouter();

  return (
    <div className="bg-[#FFFFFF] w-full px-2 py-6 flex max-sm:flex-col rounded-lg justify-between items-center gap-3">
      <div className="flex max-sm:flex-col">
        {options.map((item, idx) => {
          return (
            <SharpCarOptionItem
              {...item}
              key={idx}
              handleClick={(key) => handleClickOption(key)}
            />
          );
        })}
      </div>

      <div>
        <Button title="Add New Car" startIcon={<AddIcon />} onClick={()=>router.push('/sharp-cars/add-new')}/>
      </div>
    </div>
  );
};

export default SharpCarOptionBar;
