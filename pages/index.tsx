import { NextPage } from "next";
import React from "react";

import AppLayout from "@/layouts/AppLayout";
import AppHead from "@/components/common/AppHead";
import ActiveTripsTable from "@/components/modules/dashboard/ActiveTripsTable";
import PendingApplicationContainer from "@/components/modules/dashboard/PendingApplicationContainer";
import Button from "@/components/ui/Button/Button";

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
        <Button title="Simi" variant="contained" color="secondary" />
      </AppLayout>
    </>
  );
};

export default Dashboard;
