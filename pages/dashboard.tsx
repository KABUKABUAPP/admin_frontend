import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import AppLayout from "@/layouts/AppLayout";
import AppHead from "@/components/common/AppHead";
import ActiveTripsTable from "@/components/modules/dashboard/ActiveTripsTable";
import PendingApplicationContainer from "@/components/modules/dashboard/PendingApplicationContainer";
import WelcomeMessage from "@/components/modules/dashboard/WelcomeMessage";
import SummaryCardContainer from "@/components/modules/dashboard/SummaryCardContainer";
import TripsChartContainer from "@/components/modules/dashboard/TripsChartContainer";
import { useUserContext } from "@/contexts/UserContext";
import { capitalizeAllFirstLetters } from "@/utils";
import {
  useGetPendingDriverApplicationsQuery,
  useGetPendingSharpApplicationsQuery,
  useGetTripChartDataQuery,
} from "@/api-services/dashboardService";
import useUserPermissions from "@/hooks/useUserPermissions";
import TopMarketerContainer from "@/components/modules/dashboard/TopMarketerContainer";
import { useDashboardState } from "@/contexts/StateSegmentationContext";

const Dashboard: NextPage = () => {
  const { user } = useUserContext();
  const [chartFilterVal, setChartFilterVal] = useState<string>("7_days");
  const { dashboardState, setDashboardState } = useDashboardState();
  const handleFilterChart = (val: string | Number) => {
    setChartFilterVal(val.toString());
  };
  const router = useRouter();

  const {
    data: pendingDriverApplications,
    isLoading: pendingDriverApplicationsLoading,
    isError: pendingDriverApplicationsError,
    refetch: reloadPendingDriverApplications,
  } = useGetPendingDriverApplicationsQuery(
    { page: 1, limit: 10, dashboard_state: dashboardState },
    { refetchOnReconnect: true }
  );

  const chartFilterOptions = [
    { value: "7_days", label: "Past Week", default: true },
    { value: "6_months", label: "Past 6 Months" },
    { value: "12_months", label: "Past 12 Months" },
  ];

  const {
    data: pendingSharpApplications,
    isLoading: pendingSharpApplicationsLoading,
    isError: pendingSharpApplicationsError,
    refetch: reloadPendingSharpApplications,
  } = useGetPendingSharpApplicationsQuery(
    { page: 1, limit: 10 },
    { refetchOnReconnect: true }
  );

  const {
    data: chartData,
    isLoading: chartLoading,
    isError: chartError,
    refetch: reloadChart,
  } = useGetTripChartDataQuery(
    { range: chartFilterVal, dashboard_state: dashboardState },
    { refetchOnReconnect: true, refetchOnMountOrArgChange: true }
  );

  const { userPermissions } = useUserPermissions();

  return (
    <>
      <AppHead title="Kabukabu | Dashboard" />
      <AppLayout>
        <WelcomeMessage
          name={user ? capitalizeAllFirstLetters(user.full_name) : ""}
        />

        <div className="flex max-md:flex-col gap-7">
          <div className="w-[72%] max-md:w-full flex flex-col gap-12">
            <SummaryCardContainer />
            {userPermissions &&
              (userPermissions.trips_permissions.read ||
                userPermissions.trips_permissions.write) && (
                <ActiveTripsTable />
              )}
          </div>

          <div
            className="w-[28%] 
          flex flex-col gap-10 max-sm:items-center
          max-md:w-full max-md:flex-row
          max-sm:flex-col
          "
          >
            {userPermissions &&
              (userPermissions.drivers_permissions.read ||
                userPermissions.drivers_permissions.write) && (
                <PendingApplicationContainer
                  data={pendingDriverApplications}
                  title="Pending Drivers Applications"
                  loading={pendingDriverApplicationsLoading}
                  error={pendingDriverApplicationsError}
                  refetch={reloadPendingDriverApplications}
                  route={"/drivers/pending"}
                  handleViewAll={()=>{
                    router.push('/drivers/pending')
                  }}
                />
            )}
            {userPermissions &&
              (userPermissions.sharp_program_permissions.read ||
                userPermissions.sharp_program_permissions.write) && (
                <PendingApplicationContainer
                  data={pendingSharpApplications}
                  title="Pending SHARP Applications"
                  loading={pendingSharpApplicationsLoading}
                  error={pendingSharpApplicationsError}
                  refetch={reloadPendingSharpApplications}
                  route={"/sharp-cars"}
                />
            )}
            {/*<TopMarketerContainer
              data={pendingDriverApplications}
              title="Top Marketers"
              loading={pendingDriverApplicationsLoading}
              error={pendingDriverApplicationsError}
              refetch={reloadPendingDriverApplications}
              route={"/drivers/pending"}
              handleViewAll={()=>{
                router.push('/staffs')
              }}
            />*/}
          </div>
        </div>

        {userPermissions &&
          (userPermissions.trips_permissions.read ||
            userPermissions.trips_permissions.write) && (
            <div className="mt-10">
              <TripsChartContainer
                chartData={chartData}
                loading={chartLoading}
                error={chartError}
                refetch={reloadChart}
                filterOptions={chartFilterOptions}
                handleDropDown={(val) => handleFilterChart(val)}
                dropDownOptionSelected={chartFilterVal}
              />
            </div>
          )}
      </AppLayout>
    </>
  );
};

export default Dashboard;
