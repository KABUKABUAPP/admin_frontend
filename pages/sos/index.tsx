import { NextPage } from "next";
import React, { useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import CountHeader from "@/components/common/CountHeader";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import SosTable from "@/components/modules/Sos/SosTable";
import { useGetAllSosQuery } from "@/api-services/sosService";
import Pagination from "@/components/common/Pagination";
import DropDown from "@/components/ui/DropDown";

const SOS: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, isError, refetch } = useGetAllSosQuery(
    { limit: pageSize, page: currentPage, date: "this_week", search: search },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const timeFilterOptions = [
    { label: "Newest First", value: "", default: true },
    { label: "Oldest First", value: "", default: false },
  ];
  const sortDirectionFilterOptions = [
    { label: "Today", value: "today", default: true },
    { label: "Yesterday", value: "yesterday", default: false },
    { label: "This Week", value: "this_week", default: false },
  ];

  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>(
    timeFilterOptions.find((opt) => opt.default === true)?.value || ""
  );

  const [selectedSortFilter, setSelectedSortFilter] = useState<string>(
    sortDirectionFilterOptions.find((opt) => opt.default === true)?.value || ""
  );

  return (
    <AppLayout>
      <CountHeader title="SOS Today" count={data?.totalCount} />
      <SearchFilterBar
        searchValue={search}
        handleSearch={(val) => setSearch(val)}
        filterOptions={sortDirectionFilterOptions}
        handleDropDown={(val) => setSelectedSortFilter(String(val))}
        dropDownOptionSelected={selectedSortFilter}
      >
        <div className="text-xs flex gap-3 items-center cursor-pointer border-r border-r-black justify-end pr-3 mr-3 max-sm:pr-0 max-sm:mr-0 max-sm:border-r-0">
          <span>Show:</span>
          <DropDown
            placeholder="Filter"
            options={timeFilterOptions}
            value={selectedTimeFilter}
            handleChange={(val) => {
              setSelectedTimeFilter(String(val));
            }}
          />
        </div>
      </SearchFilterBar>
      <SosTable
        data={data?.data}
        isError={isError}
        isLoading={isLoading}
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

export default SOS;
