import { NextPage } from "next";
import React, { useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import CountHeader from "@/components/common/CountHeader";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import SharpCarsTable from "@/components/modules/sharp-cars/SharpCarsTable";
import SharpCarOptionBar from "@/components/modules/sharp-cars/SharpCarOptionBar";
import { sharpCarsOptionsData } from "@/constants";
import { useGetAllSharpCarsQuery } from "@/api-services/sharpCarsService";
import Pagination from "@/components/common/Pagination";
import AppHead from "@/components/common/AppHead";

const SharpCars: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const { data, isLoading, isError, refetch } = useGetAllSharpCarsQuery(
    { limit: pageSize, page: currentPage },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const [options, setOptions] = useState(sharpCarsOptionsData);

  const handleClickOption = (key: string) => {
    const mutatedOptions = options.map((option) => {
      if (option.keyVal === key) return { ...option, isActive: true };
      return { ...option, isActive: false };
    });

    setOptions(mutatedOptions);
  };

  const filterOptions = [
    { label: "Newest First", value: "", default: true },
    { label: "Oldest First", value: "", default: false },
  ];

  const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
    filterOptions.find((opt) => opt.default === true)?.value || ""
  );

  return (
    <>
      <AppHead title="Kabukabu | Sharp Cars" />
      <AppLayout>
        <CountHeader title="Sharp Cars" count={5000} />
        <SharpCarOptionBar
          handleClickOption={(key) => handleClickOption(key)}
          options={options}
        />
        <SearchFilterBar
          filterOptions={filterOptions}
          dropDownOptionSelected={selectedFilterOption}
          handleDropDown={(val) => setSelectedFilterOption(String(val))}
        />
        <SharpCarsTable
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
    </>
  );
};

export default SharpCars;
