import React, { FC } from "react";
import Link from "next/link";

import ArrowUpRight from "@/components/icons/ArrowUpRight";

interface Props {
  type?: string;
}


const OnboardDriversTableHead: FC<Props> = ({ type }) => {

  return (
    <div
      className={`
    bg-[#FFF5D8] flex justify-between 
    items-center rounded-tr-lg rounded-tl-lg
    px-3 py-4
    `}
    >
      <p className="font-bold text-xs">{type} Onboarded</p>
    </div>
  );
};

export default OnboardDriversTableHead;
