import { NextPage } from "next";
import React, { useEffect, useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import Button from "@/components/ui/Button/Button";
import AddIcon from "@/components/icons/AddIcon";
import FarePricesTable from "@/components/modules/fare-prices/FarePricesTable";
import { useGetAllFarePricesQuery } from "@/api-services/farePricesService";
import { useRouter } from "next/router";
import useUserPermissions from "@/hooks/useUserPermissions";
import AppHead from "@/components/common/AppHead";

const FarePrices: NextPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [vehicleType, setVehicleType] = useState(router.query.tab ? String(router.query.tab).toUpperCase() : 'REGULAR_RIDE');
  const [vehicleTypeText, setVehicleTypeText] = useState('Car');
  const [summaryView, setSummaryView] = useState(true)
  const carBold = vehicleType === 'REGULAR_RIDE' ? 'font-bold' : '';
  const kekeBold = vehicleType === 'TRICYCLE_RIDE' ? 'font-bold' : '';

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
    { search, order: selectedFilterOption, vehicleType },
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const { userPermissions } = useUserPermissions();

  useEffect(() => {
    if (router.query.tab) setVehicleType(`${String(router.query.tab).toUpperCase()}`)
  }, [router.query.tab])

  return (
    <>
      <AppHead title="Kabukabu | Fare Prices" />
      <AppLayout>
        <SearchFilterBar
          searchValue={search}
          handleSearch={(val) => setSearch(val)}
          filterOptions={filterOptions}
          dropDownOptionSelected={selectedFilterOption}
          handleDropDown={(val) => setSelectedFilterOption(String(val))}
        >
          <div className="flex justify-end mr-3">
            {userPermissions &&
              userPermissions.fare_prices_permissions.write && (
                <Button
                  title="Add New Fare Profile"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    router.push(`/fare-prices/new-fare-price?current_tab=${vehicleType.toLowerCase()}`);
                  }}
                />
              )}
          </div>
        </SearchFilterBar>

        <div className="text-md flex my-5">
            <p className={`cursor-pointer mx-5 ${carBold}`} onClick={() => {
                setSummaryView(true);
                setVehicleTypeText('Car')
                setVehicleType('REGULAR_RIDE')
                router.push(`${router.pathname}?tab=${('REGULAR_RIDE').toLowerCase()}`);
            }}>Car</p>
            <p>|</p>
            <p className={`cursor-pointer mx-5 ${kekeBold}`} onClick={() => {
                setSummaryView(false);
                setVehicleTypeText('Keke')
                setVehicleType('TRICYCLE_RIDE');
                router.push(`${router.pathname}?tab=${('TRICYCLE_RIDE').toLowerCase()}`);
            }}>Keke</p>
        </div>

        <FarePricesTable
          data={farePrices?.data}
          isError={farePricesError}
          isLoading={farePricesLoading}
          refetch={reloadFarePrices}
          currentTab={vehicleType.toLowerCase()}
        />
      </AppLayout>
    </>
  );
};

export default FarePrices;
