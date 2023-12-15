import ChevronDown from "@/components/icons/ChevronDown";
import React, { FC, useEffect, useState } from "react";
import TripsChart from "./TripsChart";
import { getComponentStates } from "@/utils";
import Loader from "@/components/ui/Loader/Loader";
import Button from "@/components/ui/Button/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import DropDown from "@/components/ui/DropDown";
import { formatChartLabels } from "@/utils";
import OnboardingChart from "./OnboardingChart";
import { useGetOnboardDataQuery } from "@/api-services/dashboardService";


const DriverOnboardingContainer: FC = () => {
  const [dropDownOptionSelected, setDropDownOptionSelected] = useState('7_days');

  const {
      data: chartDataDrivers,
      isLoading: chartDataLoading,
      isError: chartDataError,
      refetch: chartDataRefetch,
  } = useGetOnboardDataQuery({range: dropDownOptionSelected, type: 'driver'}, { refetchOnReconnect: true });

  const filterOptions = [
    { label: "7 days", value: "7_days", default: true },
    { label: "6 months", value: "6_months" },
    { label: "12 months", value: "12_months" }
  ]

  const handleDropDown = (val: any) => {
    setDropDownOptionSelected(val)
  }

  return (
    <div className="w-full gap-5 rounded-lg items-center">
      <div className={`bg-[#FFF5D8] flex justify-between items-center rounded-tr-lg rounded-tl-lg px-3 py-4`}>
        <p className="font-bold text-xs">Driver Onboarding</p>
        
        <DropDown
          placeholder="Filter"
          options={filterOptions}
          value={dropDownOptionSelected}
          handleChange={(val) => handleDropDown(val)}
        />
      </div>
      <div className="h-[300px] bg-[#FFFFFF] p-6">
        <OnboardingChart chartDataLoading={chartDataLoading} chartData={chartDataDrivers} type={'Drivers'} />
      </div>
    </div>
  );
};

export default DriverOnboardingContainer;
