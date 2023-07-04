import React, { FC, ReactNode } from "react";

import SummaryCard from "./SummaryCard";
import { useGetInsightsQuery } from "@/api-services/dashboardService";
import TripsIcon from "@/components/icons/TripsIcon";
import SosIcon from "@/components/icons/SosIcon";
import WithdrawalIcon from "@/components/icons/WithdrawalIcon";
import Button from "@/components/ui/Button/Button";
import useUserPermissions from "@/hooks/useUserPermissions";

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

  const { userPermissions } = useUserPermissions();

  const permissionKeyMap: Record<string, ('trips_permissions' | 'sos_permisions')> = {
    trips: "trips_permissions",
    sos: "sos_permisions",
  } ;

  return (
    <div className="flex flex-wrap gap-6 max-sm:justify-center">
      {viewState &&
        tripsInsight.map((item, idx) => {
          return userPermissions &&item.permissionKey &&
            (userPermissions[`${permissionKeyMap[item.permissionKey]}`].read ||
              userPermissions[`${permissionKeyMap[item.permissionKey]}`]
                .write) ? (
            <SummaryCard {...item} icon={icons[item.title]} key={idx} />
          ) : null;
        })}
      {loadingState &&
        [
          "Total trips",
          "Active trips",
          "SOS",
          "Pending trips",
          "Total Earnings",
        ].map((item, idx) => (
          <SummaryCard loading={loadingState} title={item} key={idx} />
        ))}
      {errorState && (
        <div>
          <p className="text-sm text-rose-600 mb-2">
            Oops! Error getting insights
          </p>
          <Button title="Reload Insights" onClick={reloadTrips} />
        </div>
      )}
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
};
