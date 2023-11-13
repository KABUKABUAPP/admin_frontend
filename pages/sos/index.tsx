import { NextPage } from "next";
import React, { useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import CountHeader from "@/components/common/CountHeader";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import SosTable from "@/components/modules/Sos/SosTable";
import { useGetAllSosQuery } from "@/api-services/sosService";
import Pagination from "@/components/common/Pagination";
import DropDown from "@/components/ui/DropDown";
import DateRangeFilter from "@/components/modules/Sos/DateRangeFilter";
import { useModalContext } from "@/contexts/ModalContext";
import AppHead from "@/components/common/AppHead";
import { useRouter } from "next/router";

const SOS: NextPage = () => {
  const router = useRouter();
  const { setModalContent } = useModalContext();
  const [currentPage, setCurrentPage] = useState(router.query.currentPage ? parseInt(router.query.currentPage as string) : 1);
  const [pageSize, setPageSize] = useState(2);
  const [search, setSearch] = useState<string>("");
  const timeFilterOptions = [
    { label: "Newest First", value: "newest_first", default: true },
    { label: "Oldest First", value: "oldest_first", default: false },
  ];
  const sortDirectionFilterOptions = [
    { label: "Today", value: "today", default: false },
    { label: "Yesterday", value: "yesterday", default: false },
    { label: "This Week", value: "this_week", default: true },
    { label: "Date Range", value: "date_range", default: true },
  ];
  const [directionFilterOptions, setDirectionFilterOptions] = useState(
    sortDirectionFilterOptions
  );
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>(
    timeFilterOptions.find((opt) => opt.default === true)?.value ||
      "newest_first"
  );

  const [selectedSortFilter, setSelectedSortFilter] = useState<string>(
    directionFilterOptions.find((opt) => opt.default === true)?.value ||
      "this_week"
  );

  const { data, isLoading, isError, refetch } = useGetAllSosQuery(
    {
      limit: pageSize,
      page: currentPage,
      date: selectedSortFilter,
      search: search,
      order: selectedTimeFilter,
      startDate,
      endDate,
    },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const handleSortDirectionFilter = (val: string) => {
    if (val === "date_range") {
      setModalContent(
        <DateRangeFilter
          handleSelectDate={({ startDate, endDate }) => {
            const pseudoLabel = `From ${startDate} to ${endDate}`;
            setDirectionFilterOptions(
              directionFilterOptions.map((item) => {
                if (item.value === "date_range")
                  return { ...item, pseudoLabel: pseudoLabel };
                else return item;
              })
            );
            setStartDate(startDate);
            setEndDate(endDate);
            setModalContent(null);
          }}
        />
      );
    } else {
      setDirectionFilterOptions(
        directionFilterOptions.map((item) => {
          if (item.value === "date_range") return { ...item, pseudoLabel: "" };
          else return item;
        })
      );
      setSelectedSortFilter(val);
    }
  };

  return (
    <>
      <AppHead title="Kabukabu | SOS" />
      <AppLayout>
        <CountHeader title="SOS Today" count={data?.totalCount} />
        <SearchFilterBar
          searchValue={search}
          handleSearch={(val) => setSearch(val)}
          filterOptions={directionFilterOptions}
          handleDropDown={(val) => handleSortDirectionFilter(String(val))}
          dropDownOptionSelected={selectedSortFilter}
          title="Show:"
        >
          <div className="text-xs flex gap-3 items-center cursor-pointer border-r border-r-black justify-end pr-3 mr-3 max-sm:pr-0 max-sm:mr-0 max-sm:border-r-0">
            <span>Sort:</span>
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

export default SOS;
