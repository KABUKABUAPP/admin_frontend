import { NextPage } from "next";
import React from "react";

import AppLayout from "@/layouts/AppLayout";
import AppHead from "@/components/common/AppHead";
import ActiveTripsTable from "@/components/modules/dashboard/ActiveTripsTable";
import PendingApplicationContainer from "@/components/modules/dashboard/PendingApplicationContainer";
import WelcomeMessage from "@/components/modules/dashboard/WelcomeMessage";
import SummaryCardContainer from "@/components/modules/dashboard/SummaryCardContainer";
import TripsIcon from "@/components/icons/TripsIcon";
import SosIcon from "@/components/icons/SosIcon";
import WithdrawalIcon from "@/components/icons/WithdrawalIcon";
import TripsChartContainer from "@/components/modules/dashboard/TripsChartContainer";
import { useGetAllTripsQuery } from "@/api-services/tripsService";
import useToken from "@/hooks/useToken";

const mockPendingApplications = [
  {
    fullName: "Mark Anthony",
    location: "Lagos, Nigeria",
    image: "/testUser.jpg",
  },
  {
    fullName: "Mark Anthony",
    location: "Lagos, Nigeria",
    image: "/testUser.jpg",
  },
  {
    fullName: "Mark Anthony",
    location: "Lagos, Nigeria",
    image: "/testUser.jpg",
  },
];

const mockSummaryCardData = [
  {
    title: "Total trips",
    value: "30",
    icon: <TripsIcon />,
    iconBg: "#FFBF00",
  },
  {
    title: "Active trips",
    value: "30",
    icon: (
      <span style={{ color: "#fff" }}>
        <TripsIcon />
      </span>
    ),
    iconBg: "#2C3FEF",
  },
  {
    title: "SOS",
    value: "5",
    icon: (
      <span style={{ color: "#ffffff" }}>
        <SosIcon />
      </span>
    ),
    iconBg: "#EF2C5B",
  },
  {
    title: "Pending trips",
    value: "30",
    icon: <TripsIcon />,
    iconBg: "#FFBF00",
  },
  {
    title: "Total Earnings",
    value: "N500,000",
    icon: <WithdrawalIcon />,
    iconBg: "#FFBF00",
  },
];

const Dashboard: NextPage = () => {
  const { token } = useToken();
  const { data } = useGetAllTripsQuery(
    { limit: 10, page: 1, token: `${token}` },
    { skip: !token }
  );

  return (
    <>
      <AppHead title="Kabukabu | Dashboard" />
      <AppLayout>
        <WelcomeMessage name="Samson" />

        <div className="pt-12 flex max-md:flex-col gap-7">
          <div className="w-[72%] max-md:w-full flex flex-col gap-12">
            <SummaryCardContainer data={mockSummaryCardData} />
            <ActiveTripsTable />
          </div>

          <div
            className="w-[28%] 
          flex flex-col gap-10 max-sm:items-center
          max-md:w-full max-md:flex-row
          max-sm:flex-col
          "
          >
            <PendingApplicationContainer
              data={mockPendingApplications}
              title="Pending Drivers Applications"
            />
            <PendingApplicationContainer
              data={mockPendingApplications}
              title="Pending SHARP Applications"
            />
          </div>
        </div>

        <div className="mt-10">
          <TripsChartContainer />
        </div>
      </AppLayout>
    </>
  );
};

export default Dashboard;
