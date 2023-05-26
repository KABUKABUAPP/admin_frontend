import { NextPage } from "next";
import React, { useState } from "react";
import CountHeader from "@/components/common/CountHeader";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import RidersTable from "@/components/modules/riders/RidersTable";
import { useGetAllRidesQuery } from "@/api-services/ridersService";

import AppLayout from "@/layouts/AppLayout";
import Pagination from "@/components/common/Pagination";
import DropDown from "@/components/ui/DropDown";

const Riders: NextPage = () => {
  const [isFIlteringByBlockedRiders, setIsFilteringByBlockedRiders] =
    useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchRider, setSearchRider] = useState<string>("");

  const { data, isLoading, isError, refetch } = useGetAllRidesQuery(
    { limit: pageSize, page: currentPage, search: searchRider },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const timeFilterOptions = [
    { label: "Newest First", value: "", default: true },
    { label: "Oldest First", value: "", default: false },
  ];
  const statusFilterOptions = [
    { label: "Active", value: "active", default: true },
    { label: "Blocked", value: "blocked", default: false },
  ];

  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>(
    timeFilterOptions.find((opt) => opt.default === true)?.value || ""
  );

  const [statusFilter, setStatusFilter] = useState<string>(
    statusFilterOptions.find((opt) => opt.default === true)?.value || ""
  );

  return (
    <AppLayout>
      <CountHeader title="Riders" count={data?.totalCount} />
      <SearchFilterBar
        searchValue={searchRider}
        handleSearch={(value) => {
          setSearchRider(value);
        }}
        filterOptions={timeFilterOptions}
        handleDropDown={(val)=>setSelectedTimeFilter(String(val))}
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
      <RidersTable
        headBg={statusFilter === 'blocked' ? "#FEE2E9" : ""}
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
