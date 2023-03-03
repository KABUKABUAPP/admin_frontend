import React, { FC } from "react";
import Link from "next/link";

import ArrowUpRight from "@/components/icons/ArrowUpRight";

const ActiveTripsTableHead: FC = () => {

  return (
    <div
      className={`
    bg-[#FFF5D8] flex justify-between 
    items-center rounded-tr-lg rounded-tl-lg
    px-3 py-4
    `}
    >
      <p className="font-bold text-xs">Active Trip</p>
      <Link href={"/trips"}>
        <p className="font-bold text-xs flex items-center gap-2 cursor-pointer">
          Go to Trips <ArrowUpRight />
        </p>
      </Link>
    </div>
  );
};

export default ActiveTripsTableHead;
