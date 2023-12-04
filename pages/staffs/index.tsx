import { NextPage } from "next";
import React, { useState, useEffect } from "react";

import AppLayout from "@/layouts/AppLayout";
import StaffTable from "@/components/modules/staff/StaffTable";
import StaffSearchFilterBar from "@/components/modules/staff/StaffSearchFilterBar";
import { useGetAllStaffQuery } from "@/api-services/staffService";
import Pagination from "@/components/common/Pagination";
import AppHead from "@/components/common/AppHead";
import { useRouter } from "next/router";

const Staffs: NextPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(router.query.currentPage ? parseInt(router.query.currentPage as string) : 1);
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
    search: search,
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
          currentPage={currentPage}
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
