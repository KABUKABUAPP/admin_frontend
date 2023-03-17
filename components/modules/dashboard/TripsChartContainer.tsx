import ChevronDown from "@/components/icons/ChevronDown";
import React, { FC, PropsWithChildren } from "react";
import TripsChart from "./TripsChart";

const TripsChartContainer: FC = () => {
  return (
    <div>
      <div
        className={`
    bg-[#FFF5D8] flex justify-between 
    items-center rounded-tr-lg rounded-tl-lg
    px-3 py-4
    `}
      >
        <p className="font-bold text-xs">Trips Chart</p>
        <p className="font-bold text-xs flex items-center gap-2 cursor-pointer">
          Past 12 Months <ChevronDown />
        </p>
      </div>
      <div className="h-[300px] bg-[#FFFFFF] p-6">
        <TripsChart />
      </div>
    </div>
  );
};

export default TripsChartContainer;
