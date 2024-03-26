import ChevronDown from "@/components/icons/ChevronDown";
import React, { FC } from "react";
import AreasDriversChart from "./AreasDriversChart";


const AreasDriversContainer: FC = () => {
  return (
    <div className="w-full gap-5 rounded-lg items-center">
      <div className={`bg-[#FFF5D8] flex justify-between items-center rounded-tr-lg rounded-tl-lg px-3 py-4`}>
        <p className="font-bold text-xs">Areas With Most Drivers</p>
      </div>
      <div className="h-[300px] bg-[#FFFFFF] p-6">
        <AreasDriversChart />
      </div>
    </div>
  );
};

export default AreasDriversContainer;
