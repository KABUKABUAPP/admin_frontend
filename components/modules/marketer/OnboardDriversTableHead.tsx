import React, { FC } from "react";
import Link from "next/link";

import ArrowUpRight from "@/components/icons/ArrowUpRight";

const OnboardDriversTableHead: FC = () => {

  return (
    <div
      className={`
    bg-[#FFF5D8] flex justify-between 
    items-center rounded-tr-lg rounded-tl-lg
    px-3 py-4
    `}
    >
      <p className="font-bold text-xs">Drivers Onboarded</p>
    </div>
  );
};

export default OnboardDriversTableHead;
