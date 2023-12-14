import ChevronDown from "@/components/icons/ChevronDown";
import React, { FC } from "react";
import TripsChart from "./TripsChart";
import { getComponentStates } from "@/utils";
import Loader from "@/components/ui/Loader/Loader";
import Button from "@/components/ui/Button/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import DropDown from "@/components/ui/DropDown";
import { formatChartLabels } from "@/utils";
import AreasDriversChart from "./AreasDriversChart";


const AreasDriversContainer: FC = () => {
  return (
    <div>
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
