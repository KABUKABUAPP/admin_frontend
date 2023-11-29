import React, { FC, ReactNode, useState } from "react";

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

const SummaryCardContainer: FC = () => {
  const [periodFilter, setPeriodFilter] = useState('today')
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
          tripsInsight.map((item, idx) => {
            return <SummaryCard {...item} icon={icons[item.title]} key={idx} />;
          })}
        {loadingState &&
          [
            "Total trips",
            "Active trips",
            "SOS",
            "Pending trips",
            "Total Earnings",
            "Total Riders",
            "Total Drivers"
          ].map((item, idx) => (
            <SummaryCard loading={loadingState} title={item} key={idx} />
          ))}
        {errorState && 
        <div>
          <p className="text-sm text-rose-600 mb-2">Oops! Error getting insights</p>
          <Button title="Reload Insights" onClick={reloadTrips} />
          </div>}
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
