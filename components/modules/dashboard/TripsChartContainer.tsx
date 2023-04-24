import ChevronDown from "@/components/icons/ChevronDown";
import React, { FC } from "react";
import TripsChart from "./TripsChart";
import { getComponentStates } from "@/utils";
import Loader from "@/components/ui/Loader/Loader";
import Button from "@/components/ui/Button/Button";
import ErrorMessage from "@/components/common/ErrorMessage";

interface Props {
  chartData?: { day: string; trips: number }[];
  loading: boolean;
  error: boolean;
  refetch: ()=>void
}

const TripsChartContainer: FC<Props> = ({ chartData, loading, error, refetch }) => {
  const { viewState, loadingState, errorState } = getComponentStates({
    data: chartData,
    loading,
    error,
  });

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
        {viewState && chartData && (
          <TripsChart
            chartData={chartData.map((item) => item.trips)}
            labels={chartData.map((item) => item.day)}
          />
        )}
        {loadingState && (
          <div className="flex justify-center items-center">
            <Loader size="medium" />
          </div>
        )}
        {errorState && (
          <div className="py-2 flex flex-col items-center justify-center">
            <ErrorMessage message="Error Fetching Chart Data"/>
            <Button title="Reload Chart Data" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TripsChartContainer;
