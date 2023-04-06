import { NextPage } from "next";
import React, { useState } from "react";
import CountHeader from "@/components/common/CountHeader";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import RidersTable from "@/components/modules/riders/RidersTable";

import AppLayout from "@/layouts/AppLayout";

const Riders: NextPage = () => {
  const [isFIlteringByBlockedRiders, setIsFilteringByBlockedRiders] =
    useState(true);

  return (
    <AppLayout>
      <CountHeader title="Riders" count={2000} />
      <SearchFilterBar />
      <RidersTable
        headBg={isFIlteringByBlockedRiders ? "#FEE2E9" : ""}
        ridersData={mockData}
      />
    </AppLayout>
  );
};

export default Riders;

const mockData = [
  {
    riderId: "1234",
    fullName: "John Doe",
    location: "Lagos, Nigeria",
    totalTrips: 300,
    walletBalance: 5000,
    status: "Active",
    imageUrl: "/testUser.jpg",
  },
  {
    riderId: "1234",
    fullName: "John Doe",
    location: "Lagos, Nigeria",
    totalTrips: 300,
    walletBalance: 5000,
    status: "Active",
    imageUrl: "",
  },
  {
    riderId: "1234",
    fullName: "John Doe",
    location: "Lagos, Nigeria",
    totalTrips: 300,
    walletBalance: 5000,
    status: "Active",
    imageUrl: "/testUser.jpg",
  },
  {
    riderId: "1234",
    fullName: "John Doe",
    location: "Lagos, Nigeria",
    totalTrips: 300,
    walletBalance: 5000,
    status: "Active",
    imageUrl: "",
  },
  {
    riderId: "1234",
    fullName: "John Doe",
    location: "Lagos, Nigeria",
    totalTrips: 300,
    walletBalance: 5000,
    status: "Active",
    imageUrl: "/testUser.jpg",
  },
  {
    riderId: "1234",
    fullName: "John Doe",
    location: "Lagos, Nigeria",
    totalTrips: 300,
    walletBalance: 5000,
    status: "Active",
    imageUrl: "",
  },
];
