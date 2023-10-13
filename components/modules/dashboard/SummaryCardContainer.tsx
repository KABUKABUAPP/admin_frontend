import React, { FC, ReactNode } from "react";

import SummaryCard from "./SummaryCard";
import { useGetInsightsQuery } from "@/api-services/dashboardService";
import TripsIcon from "@/components/icons/TripsIcon";
import SosIcon from "@/components/icons/SosIcon";
import WithdrawalIcon from "@/components/icons/WithdrawalIcon";
import Button from "@/components/ui/Button/Button";
import UserIcon from "@/components/icons/UserIcon";
import UserSquareIcon from "@/components/icons/UserSquareIcon";
import Skeleton from "react-loading-skeleton";

const SummaryCardContainer: FC = () => {
  const {
    data: tripsInsight,
    isLoading: tripsInsightsLoading,
    isError: tripsInsightError,
    refetch: reloadTrips,
  } = useGetInsightsQuery("", { refetchOnReconnect: true });

  const loadingState =
    !tripsInsight && !tripsInsightError && tripsInsightsLoading;
  const errorState =
    !tripsInsight && !tripsInsightsLoading && tripsInsightError;
  const viewState = !tripsInsightError && !tripsInsightsLoading && tripsInsight;

  return (
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
