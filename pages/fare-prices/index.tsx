import { NextPage } from "next";
import React, { useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import Button from "@/components/ui/Button/Button";
import AddIcon from "@/components/icons/AddIcon";
import FarePricesTable from "@/components/modules/fare-prices/FarePricesTable";
import { useGetAllFarePricesQuery } from "@/api-services/farePricesService";
import { useRouter } from "next/router";

const FarePrices: NextPage = () => {
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

  const {
    data: farePrices,
    isLoading: farePricesLoading,
    isError: farePricesError,
    refetch: reloadFarePrices,
  } = useGetAllFarePricesQuery(
    { search, order: selectedFilterOption },
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const router = useRouter();

  

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
            title="Add New Fare Profile"
            startIcon={<AddIcon />}
            onClick={() => {
              router.push("/fare-prices/new-fare-price");
            }}
          />
        </div>
      </SearchFilterBar>

      <FarePricesTable
        data={farePrices?.data}
        isError={farePricesError}
        isLoading={farePricesLoading}
        refetch={reloadFarePrices}
      />
    </AppLayout>
  );
};

export default FarePrices;
