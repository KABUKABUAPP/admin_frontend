import React, { FC, ReactNode, useState, useEffect } from "react";

import SummaryCard from "./SummaryCard";
import { useGetInsightsQuery } from "@/api-services/dashboardService";
import TripsIcon from "@/components/icons/TripsIcon";
import SosIcon from "@/components/icons/SosIcon";
import WithdrawalIcon from "@/components/icons/WithdrawalIcon";
import Button from "@/components/ui/Button/Button";
import UserIcon from "@/components/icons/UserIcon";
import UserSquareIcon from "@/components/icons/UserSquareIcon";
import Skeleton from "react-loading-skeleton";
import DropDownTwo from "@/components/ui/DropDownTwo";
import DriversChartCard from "./DriversChartCard";
import TripsChartCard from "./TripsChartCard";
import OnlineStatusChartCard from "./OnlineStatusChartCard";
import AreasDriversContainer from "./AreasDriversContainer";
import AreasOrdersContainer from "./AreasOrdersContainer";
import DriverOnboardingContainer from "./DriverOnboardingContainer";
import RiderOnboardingContainer from "./RiderOnboardingContainer";

const SummaryCardContainer: FC = () => {
  const [periodFilter, setPeriodFilter] = useState('today');
  const {
    data: tripsInsight,
    isLoading: tripsInsightsLoading,
    isError: tripsInsightError,
    refetch: reloadTrips,
  } = useGetInsightsQuery({filter: periodFilter}, { refetchOnReconnect: true });

  const loadingState =
    !tripsInsight && !tripsInsightError && tripsInsightsLoading;
  const errorState =
    !tripsInsight && !tripsInsightsLoading && tripsInsightError;
  const viewState = !tripsInsightError && !tripsInsightsLoading && tripsInsight;

  const periodFilterOptions = [
    { label: "Here's your insight for yesterday", value: "YESTERDAY"},
    { label: "Here's your insight for today", value: "TODAY", default: true  },
    { label: "Here's your insight for the last two weeks", value: "LAST_2_WEEKS" },
    { label: "Here's your insight for this month", value: "THIS_MONTH" },
    { label: "Here's your insight for last 3 months", value: "LAST_3_MONTHS" },
    { label: "Here's your insight for last 6 months", value: "LAST_6_MONTHS" },
    { label: "Here's your insight for this year", value: "THIS_YEAR" },
    { label: "Here's your insight for last year", value: "LAST_YEAR" },
    { label: "Here's your insight for all time", value: "ALL_TIME" }
  ];

  const handlePeriodFilter = (e: any) => {
    setPeriodFilter(e)
  }

  return (
    <>
      <div className="mt-2 inline-block max-w-full">
        <DropDownTwo  
          placeholder="Here's your insight for today"
          options={periodFilterOptions}
          value={periodFilter}
          handleChange={(val) => {
            handlePeriodFilter(String(val));
          }}
        />
      </div>
      <div className="flex flex-wrap gap-6 max-sm:justify-center">
        {viewState &&
          tripsInsight?.headerCard?.map((item: any, idx: any) => {
            return <SummaryCard {...item} icon={icons[item.title]} key={idx} />;
          })}
        {loadingState &&
          [
            "SOS",
            "Total Earnings",
            "Total Riders",
            /*"Total trips",
            "Active trips",
            "Pending trips",
            "Total Drivers"*/
          ].map((item, idx) => (
            <SummaryCard loading={loadingState} title={item} key={idx} />
          ))}
        {errorState && 
        <div>
          <p className="text-sm text-rose-600 mb-2">Oops! Error getting insights</p>
          <Button title="Reload Insights" onClick={reloadTrips} />
          </div>}
      </div>
      <div className="flex">
        <div className="w-1/3">
          <DriversChartCard title="Total Drivers" icon={icons["Total Drivers"]} periodFilter={periodFilter} driversChart={tripsInsight?.driversChart} />
        </div>
        <div className="w-1/3">
          <TripsChartCard title="Total Trips" icon={icons["Total trips"]} periodFilter={periodFilter} tripsChart={tripsInsight?.tripsChart} />
        </div>
        <div className="w-1/3">
          <OnlineStatusChartCard title="Drivers Online" icon={icons["Total Drivers"]} periodFilter={periodFilter} onlineStatusChart={tripsInsight?.onlineStatusChart} />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <AreasOrdersContainer />
        </div>
        <div className="w-1/2">
          <AreasDriversContainer />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <DriverOnboardingContainer />
        </div>
        <div className="w-1/2">
          <RiderOnboardingContainer />
        </div>
      </div>
      
    </>
  );
};

export default SummaryCardContainer;

const icons: { [key: string]: ReactNode } = {
  "Total trips": <TripsIcon />,

  "Active trips": (
    <span style={{ color: "#fff" }}>
      <TripsIcon />
    </span>
  ),

  SOS: (
    <span style={{ color: "#ffffff" }}>
      <SosIcon />
    </span>
  ),

  "Pending trips": <TripsIcon />,

  "Total Earnings": <WithdrawalIcon />,

  "Total Drivers": <UserSquareIcon />,

  "Total Riders": <UserIcon />,
};
