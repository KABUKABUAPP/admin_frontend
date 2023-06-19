import { NextPage } from "next";
import React, { useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import StaffTable from "@/components/modules/staff/StaffTable";
import StaffSearchFilterBar from "@/components/modules/staff/StaffSearchFilterBar";
import { useGetAllStaffQuery } from "@/api-services/staffService";
import Pagination from "@/components/common/Pagination";

const Staffs: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("active");
  const [selectedSortFilter, setSelectedSortFilter] =
    useState<string>("newest_first");

  const { data, isLoading, error, refetch, isError } = useGetAllStaffQuery({
    limit: pageSize,
    page: currentPage,
    order: selectedSortFilter,
    status: selectedStatus,
  });

  return (
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
  );
};

export default Staffs;
