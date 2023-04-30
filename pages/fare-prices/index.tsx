import { NextPage } from "next";
import React from "react";

import AppLayout from "@/layouts/AppLayout";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import Button from "@/components/ui/Button/Button";
import AddIcon from "@/components/icons/AddIcon";
import FarePricesTable from "@/components/modules/fare-prices/FarePricesTable";
import { useGetAllFarePricesQuery } from "@/api-services/farePricesService";

const FarePrices: NextPage = () => {
  const {
    data: farePrices,
    isLoading: farePricesLoading,
    isError: farePricesError,
    refetch: reloadFarePrices,
  } = useGetAllFarePricesQuery("", {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });
  

  return (
    <AppLayout>
      <SearchFilterBar>
        <div className="flex justify-end mr-3">
          <Button title="Add New Fare Profile" startIcon={<AddIcon />} />
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
