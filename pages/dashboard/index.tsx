import { NextPage } from "next";
import React from "react";

import AppLayout from "@/layouts/AppLayout";
import AppHead from "@/components/common/AppHead";
import ActiveTripsTable from "@/components/modules/dashboard/ActiveTripsTable";
import PendingApplicationContainer from "@/components/modules/dashboard/PendingApplicationContainer";

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

const Dashboard: NextPage = () => {
  return (
    <>
      <AppHead title="Kabukabu | Dashboard" />
      <AppLayout>
        <ActiveTripsTable />
        <PendingApplicationContainer
          title="Pending Drivers Applications"
          data={mockPendingApplications}
        />
      </AppLayout>
    </>
  );
};

export default Dashboard;
