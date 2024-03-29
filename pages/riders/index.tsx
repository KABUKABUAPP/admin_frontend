import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import CountHeader from "@/components/common/CountHeader";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import RidersTable from "@/components/modules/riders/RidersTable";
import { useGetAllRidesQuery } from "@/api-services/ridersService";

import AppLayout from "@/layouts/AppLayout";
import Pagination from "@/components/common/Pagination";
import DropDown from "@/components/ui/DropDown";
import AppHead from "@/components/common/AppHead";
import DeletedRidersTable from "@/components/modules/riders/DeletedRidersTable";
import { useRouter } from "next/router";

const Riders: NextPage = () => {
  const router = useRouter();
  const [isFIlteringByBlockedRiders, setIsFilteringByBlockedRiders] =
    useState(false);
    const [currentPage, setCurrentPage] = useState(router.query.currentPage ? parseInt(router.query.currentPage as string) : 1);
  const [pageSize, setPageSize] = useState(5);
  const [searchRider, setSearchRider] = useState<string>("");
  const timeFilterOptions = [
    { label: "Newest First", value: "newest_first", default: true },
    { label: "Oldest First", value: "oldest_first", default: false },
    { label: "A-Z", value: "a-z", default: false },
    { label: "Z-A", value: "z-a", default: false },
  ];
  const statusFilterOptions = [
    { label: "Active", value: "no", default: true },
    { label: "Blocked", value: "yes", default: false },
    { label: "Deleted", value: "deleted", default: false },
  ];

  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>(
    timeFilterOptions.find((opt) => opt.default === true)?.value ||
      "newest_first"
  );

  const [statusFilter, setStatusFilter] = useState<string>(
    statusFilterOptions.find((opt) => opt.default === true)?.value || "active"
  );

  const { data, isLoading, isError, refetch } = useGetAllRidesQuery(
    {
      limit: pageSize,
      page: currentPage,
      search: searchRider,
      order: selectedTimeFilter,
      status: statusFilter,
      onlineStatus: ''
    },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  return (
    <>
      <AppHead title="Kabukabu | Riders" />
      <AppLayout>
        <CountHeader title="Riders" count={data?.totalCount} />
        <SearchFilterBar
          searchValue={searchRider}
          handleSearch={(value) => {
            setSearchRider(value);
          }}
          filterOptions={timeFilterOptions}
          handleDropDown={(val) => setSelectedTimeFilter(String(val))}
          dropDownOptionSelected={selectedTimeFilter}
        >
          <div className="text-xs flex gap-3 items-center cursor-pointer border-r border-r-black justify-end pr-3 mr-3 max-sm:pr-0 max-sm:mr-0 max-sm:border-r-0">
            <span>Show:</span>
            <DropDown
              placeholder="Filter"
              options={statusFilterOptions}
              value={statusFilter}
              handleChange={(val) => {
                setStatusFilter(String(val));
              }}
            />
          </div>
        </SearchFilterBar>
        {statusFilter === "deleted" ? (
          <DeletedRidersTable
            headBg=""
            ridersData={data?.data}
            isLoading={isLoading}
            isError={isError}
            refetch={refetch}
          />
        ) : (
          <RidersTable
            headBg={statusFilter === "yes" ? "#FEE2E9" : ""}
            ridersData={data?.data}
            isLoading={isLoading}
            isError={isError}
            refetch={refetch}
            currentPage={currentPage}
          />
        )}
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

export default Riders;
