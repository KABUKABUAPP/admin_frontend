import { NextPage } from "next";
import React, { useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import InspectorsTable from "@/components/modules/inspectors/InspectorsTable";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import Button from "@/components/ui/Button/Button";
import AddIcon from "@/components/icons/AddIcon";
import { useGetAllInspectorsQuery } from "@/api-services/inspectorsService";
import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/router";

const Inspectors: NextPage = () => {
  const [carOwner, setCarOwner] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState<string>("");
  const {
    data: inspectors,
    isLoading: inspectorsLoading,
    isError: inspectorsError,
    error: inspectorErrorObj,
    refetch: reloadInspectors,
  } = useGetAllInspectorsQuery(
    { limit: pageSize, page: currentPage, search: search },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );
  const router = useRouter();

  const filterOptions = [
    { label: "Newest First", value: "", default: true },
    { label: "Oldest First", value: "", default: false },
    { label: "A-Z", value: "", default: false },
    { label: "Z-A", value: "", default: false },
  ];

  const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
    filterOptions.find((opt) => opt.default === true)?.value || ""
  );

  return (
    <AppLayout>
      <SearchFilterBar
        searchValue={search}
        handleSearch={(val) => setSearch(val)}
        filterOptions={filterOptions}
        dropDownOptionSelected={selectedFilterOption}
        handleDropDown={(val) => setSelectedFilterOption(String(val))}
      >
        <div className="flex justify-end mr-3">
          <Button
            title="Add Inspector"
            startIcon={<AddIcon />}
            onClick={() => {
              router.push("inspectors/add-inspector");
            }}
          />
        </div>
      </SearchFilterBar>
      <InspectorsTable
        data={inspectors?.data}
        isLoading={inspectorsLoading}
        isError={inspectorsError}
        refetch={reloadInspectors}
      />
      {inspectors && (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={inspectors.totalCount}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </AppLayout>
  );
};

export default Inspectors;
