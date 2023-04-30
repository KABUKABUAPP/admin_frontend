import { NextPage } from "next";
import React, { useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import Button from "@/components/ui/Button/Button";
import AddIcon from "@/components/icons/AddIcon";
import HubsTable from "@/components/modules/hubs/HubsTable";
import { useGetAllHubsQuery } from "@/api-services/hubService";
import Pagination from "@/components/common/Pagination";

const Hubs: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const { data, isLoading, isError, refetch } = useGetAllHubsQuery(
    { limit: pageSize, page: currentPage },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  return (
    <AppLayout>
      <SearchFilterBar>
        <div className="flex justify-end mr-3">
          <Button title="Add New Hub" startIcon={<AddIcon />} />
        </div>
      </SearchFilterBar>

      <HubsTable
        data={data?.data}
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

export default Hubs;

const mockData = [
  {
    hubId: "1234",
    hubName: "Ikorodu Inspection Center",
    stateCountry: "Lagos, Nigeria",
    inspector: "John Doe",
    totalCarsProcessed: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm",
  },
  {
    hubId: "1234",
    hubName: "Ikorodu Inspection Center",
    stateCountry: "Lagos, Nigeria",
    inspector: "John Doe",
    totalCarsProcessed: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm",
  },
  {
    hubId: "1234",
    hubName: "Ikorodu Inspection Center",
    stateCountry: "Lagos, Nigeria",
    inspector: "John Doe",
    totalCarsProcessed: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm",
  },
  {
    hubId: "1234",
    hubName: "Ikorodu Inspection Center",
    stateCountry: "Lagos, Nigeria",
    inspector: "John Doe",
    totalCarsProcessed: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm",
  },
  {
    hubId: "1234",
    hubName: "Ikorodu Inspection Center",
    stateCountry: "Lagos, Nigeria",
    inspector: "John Doe",
    totalCarsProcessed: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm",
  },
  {
    hubId: "1234",
    hubName: "Ikorodu Inspection Center",
    stateCountry: "Lagos, Nigeria",
    inspector: "John Doe",
    totalCarsProcessed: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm",
  },
  {
    hubId: "1234",
    hubName: "Ikorodu Inspection Center",
    stateCountry: "Lagos, Nigeria",
    inspector: "John Doe",
    totalCarsProcessed: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm",
  },
];
