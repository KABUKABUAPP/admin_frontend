import ChevronDown from "@/components/icons/ChevronDown";
import React, { FC } from "react";
import PerformanceChart from "./PerformanceChart";
import { getComponentStates } from "@/utils";
import Loader from "@/components/ui/Loader/Loader";
import Button from "@/components/ui/Button/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import DropDown from "@/components/ui/DropDown";
import { formatChartLabels } from "@/utils";

interface Props {
  chartData?: { day?: string; trips: number; month?: string }[];
  loading: boolean;
  error: boolean;
  refetch: () => void;
  filterOptions?: {
    label: string | number;
    value: string | number;
    default?: boolean;
  }[];
  dropDownOptionSelected?: string;
  handleDropDown: (val: string | number) => void;
}

const PerformanceChartContainer: FC<Props> = ({
  chartData,
  loading,
  error,
  refetch,
  filterOptions,
  dropDownOptionSelected,
  handleDropDown,
}) => {
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
        <p className="font-bold text-xs">Performance Chart</p>
      </div>
      <div className="h-[300px] bg-[#FFFFFF] p-6">
        {viewState && chartData && (
          <PerformanceChart
            chartData={chartData.map((item) => item.trips)}
            labels={formatChartLabels({
              query: dropDownOptionSelected,
              data: chartData.map((item) => item.day || ""),
            })}
          />
        )}
        {loadingState && (
          <div className="flex justify-center items-center">
            <Loader size="medium" />
          </div>
        )}
        {errorState && (
          <div className="py-2 flex flex-col items-center justify-center">
            <ErrorMessage message="Error Fetching Chart Data" />
            <Button title="Reload Chart Data" onClick={refetch} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceChartContainer;
