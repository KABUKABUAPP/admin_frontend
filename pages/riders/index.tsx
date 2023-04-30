import { NextPage } from "next";
import React, { useState } from "react";
import CountHeader from "@/components/common/CountHeader";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import RidersTable from "@/components/modules/riders/RidersTable";
import { useGetAllRidesQuery } from "@/api-services/ridersService";

import AppLayout from "@/layouts/AppLayout";
import Pagination from "@/components/common/Pagination";

const Riders: NextPage = () => {
  const [isFIlteringByBlockedRiders, setIsFilteringByBlockedRiders] =
    useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const { data, isLoading, isError, refetch } = useGetAllRidesQuery(
    { limit: pageSize, page: currentPage },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  return (
    <AppLayout>
      <CountHeader title="Riders" count={data?.totalCount} />
      <SearchFilterBar />
      <RidersTable
        headBg={isFIlteringByBlockedRiders ? "#FEE2E9" : ""}
        ridersData={data?.data}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
      />
      {data && (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data.totalCount}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
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
