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
  chartData?: { month?: string; drivers: number; }[];
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

function extractMonthName(dateString: any) {
  // Create an array of full month names
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Split the input string by spaces
  const parts = dateString.split(' ');

  // Find the month abbreviation in the parts array
  const monthAbbreviation = parts[1];

  // Find the corresponding index of the month abbreviation in the months array
  const monthIndex = months.findIndex(month => monthAbbreviation.startsWith(month.substring(0, 3)));

  // If the month index is valid, return the full month name; otherwise, return null
  if (monthIndex >= 0 && monthIndex < months.length) {
    return months[monthIndex];
  } else {
    return null;
  }
}


const PerformanceChartContainer: FC<Props> = ({
  chartData,
  loading,
  error,
  refetch,
  dropDownOptionSelected
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
            chartData={chartData.map((item) => item.drivers)}
            labels={chartData.map((item) => extractMonthName(item?.month) || "")}
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
