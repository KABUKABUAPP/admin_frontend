import { NextPage } from "next";
import React, { useEffect, useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import DriversTable from "@/components/modules/drivers/DriversTable";
import CountHeader from "@/components/common/CountHeader";
import DriverOptionBar from "@/components/modules/drivers/DriverOptionBar";
import { driverOptionBarData, driverTypeFilterOptionsData } from "@/constants";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import DriverTypeFilterBox from "@/components/modules/drivers/DriverTypeFilterBox";
import { useRouter } from "next/router";
import { useGetAllDriversQuery } from "@/api-services/driversService";
import Pagination from "@/components/common/Pagination";
import AppHead from "@/components/common/AppHead";
import { useDashboardState } from "@/contexts/StateSegmentationContext";

const Drivers: NextPage = () => {
  const router = useRouter();
  const [driverOptions, setDriverOptions] = useState(driverOptionBarData);
  const { dashboardState, setDashboardState } = useDashboardState();
  const [driverTypeOptions, setDriverTypeOptions] = useState(
    driverTypeFilterOptionsData
  );
  const [carOwner, setCarOwner] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState(5);
  const [searchDriver, setSearchDriver] = useState<string>("");
   
  const [currentPage, setCurrentPage] = useState(router.query.currentPage ? parseInt(router.query.currentPage as string) : 1);

  const filterOptions = [
    { label: "Newest First", value: "newest_first", default: true },
    { label: "Oldest First", value: "oldest_first", default: false },
    // { label: "A-Z", value: "", default: false },
    // { label: "Z-A", value: "", default: false },
  ];

  const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
    filterOptions.find((opt) => opt.default === true)?.value || "newest_first"
  );

  const {
    data: drivers,
    isLoading: driversLoading,
    isError: driversError,
    refetch: reloadDrivers,
  } = useGetAllDriversQuery(
    {
      carOwner: carOwner,
      driverStatus: "declined",
      limit: pageSize,
      page: currentPage,
      search: searchDriver,
      order: selectedFilterOption,
      dashboard_state: dashboardState
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const handleActiveDriverOption = (keyVal: string) => {
    const mutatedOptions = driverOptions.map((option) => {
      if (option.keyVal === keyVal) return { ...option, isActive: true };
      return { ...option, isActive: false };
    });

    setDriverOptions(() => mutatedOptions);
  };

  useEffect(() => {
    handleActiveDriverOption("declined");
  }, []);

  const carOwnerObj: { [key: string]: boolean } = {
    "all-drivers": true,
    "sharp-drivers": false,
    "regular-drivers": true,
  };

  useEffect(() => {
    const activeOption = driverTypeOptions.find(
      (item) => item.isActive === true
    )?.keyVal;
    if (activeOption) setCarOwner(carOwnerObj[activeOption]);
  }, [JSON.stringify(driverTypeOptions)]);

  const handleDriverTypeOption = (keyVal: string) => {
    const mutatedOptions = driverTypeOptions.map((option) => {
      if (option.keyVal === keyVal) return { ...option, isActive: true };
      return { ...option, isActive: false };
    });

    setDriverTypeOptions(() => mutatedOptions);
  };

  return (
    <>
      <AppHead title="Kabukabu | Drivers" />
      <AppLayout>
        <CountHeader count={drivers?.totalCount} title="Drivers" />
        <DriverOptionBar
          options={driverOptions}
          handleClickOption={(keyVal) => {
            router.push(`/drivers/${keyVal}`);
          }}
        />
        <SearchFilterBar
          searchValue={searchDriver}
          handleSearch={(value) => {
            setSearchDriver(value);
          }}
          filterOptions={filterOptions}
          dropDownOptionSelected={selectedFilterOption}
          handleDropDown={(val) => setSelectedFilterOption(String(val))}
        >
          <DriverTypeFilterBox
            options={driverTypeOptions}
            handleClickOption={(keyVal) => handleDriverTypeOption(keyVal)}
          />
        </SearchFilterBar>
        <div className="mt-5">
          <DriversTable
            tableData={drivers?.data}
            isError={driversError}
            isLoading={driversLoading}
            refetch={reloadDrivers}
            subPath="declined"
            headBg="#FEE2E9"
            currentPage={currentPage}
          />
          {drivers && (
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={drivers.totalCount}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      </AppLayout>
    </>
  );
};

export default Drivers;
