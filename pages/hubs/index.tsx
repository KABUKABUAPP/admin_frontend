import { NextPage } from "next";
import React, { useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import Button from "@/components/ui/Button/Button";
import AddIcon from "@/components/icons/AddIcon";
import HubsTable from "@/components/modules/hubs/HubsTable";
import { useGetAllHubsQuery } from "@/api-services/hubService";
import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/router";
import useUserPermissions from "@/hooks/useUserPermissions";
import AppHead from "@/components/common/AppHead";

const Hubs: NextPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(router.query.currentPage ? parseInt(router.query.currentPage as string) : 1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState<string>("");

  const filterOptions = [
    { label: "Newest First", value: "newest_first", default: true },
    { label: "Oldest First", value: "oldest_first", default: false },
    { label: "A-Z", value: "a-z", default: false },
    { label: "Z-A", value: "z-a", default: false },
  ];

  const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
    filterOptions.find((opt) => opt.default === true)?.value || "newest_first"
  );

  const { data, isLoading, isError, refetch, error } = useGetAllHubsQuery(
    { limit: pageSize, page: currentPage, order: selectedFilterOption, search },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const { userPermissions } = useUserPermissions();

  return (
    <>
      <AppHead title="Kabukabu | Hubs" />
      <AppLayout>
        <SearchFilterBar
          searchValue={search}
          handleSearch={(val) => setSearch(val)}
          filterOptions={filterOptions}
          dropDownOptionSelected={selectedFilterOption}
          handleDropDown={(val) => setSelectedFilterOption(String(val))}
        >
          <div className="flex justify-end mr-3">
            {userPermissions && userPermissions.hubs_permissions.write && (
              <Button
                title="Add New Hub"
                startIcon={<AddIcon />}
                onClick={() => {
                  router.push("/hubs/add-hub");
                }}
              />
            )}
          </div>
        </SearchFilterBar>

        <HubsTable
          data={data?.data}
          isLoading={isLoading}
          isError={isError}
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

export default Hubs;
