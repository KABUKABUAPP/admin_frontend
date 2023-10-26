import { NextPage } from "next";
import React, { useState, useEffect } from "react";

import AppLayout from "@/layouts/AppLayout";
import StaffTable from "@/components/modules/teams/StaffTable";
import StaffSearchFilterBar from "@/components/modules/teams/StaffSearchFilterBar";
import { useGetAllTeamQuery } from "@/api-services/teamService";
import Pagination from "@/components/common/Pagination";
import AppHead from "@/components/common/AppHead";

const Staffs: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedSortFilter, setSelectedSortFilter] =
    useState<string>("newest_first");

  const { data, isLoading, error, refetch, isError } = useGetAllTeamQuery({
    limit: pageSize,
    page: currentPage,
    order: selectedSortFilter,
    audience: selectedStatus,
    search: search
  });

  return (
    <>
      <AppHead title="Kabukabu | Staff" />
      <AppLayout>
        <StaffSearchFilterBar
          searchValue={search}
          handleSearch={(value) => setSearch(value)}
          handleSortFilter={(value) => setSelectedSortFilter(value)}
          sortFilterValue={selectedSortFilter}
          handleStatusFilter={(value) => {
            setSelectedStatus(value);
          }}
          statusFilter={selectedStatus}
        />
        <StaffTable
          data={data?.data}
          isError={isError}
          isLoading={isLoading}
          refetch={refetch}
          headBg={selectedStatus === "blocked" ? "#FEE2E9" : "#FFF5D8"}
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
    </>
  );
};

export default Staffs;
