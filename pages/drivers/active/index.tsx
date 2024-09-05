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
import DropDown from "@/components/ui/DropDown";
import AppHead from "@/components/common/AppHead";
import { useDashboardState } from "@/contexts/StateSegmentationContext";

const Drivers: NextPage = () => {
  const router = useRouter();
  const online_status = router.query.online_status;

  const [driverOptions, setDriverOptions] = useState(driverOptionBarData);
  const [driverTypeOptions, setDriverTypeOptions] = useState(
    driverTypeFilterOptionsData
  );
  const [carOwner, setCarOwner] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState(5);
  const [searchDriver, setSearchDriver] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(router.query.currentPage ? parseInt(router.query.currentPage as string) : 1);
  const { dashboardState, setDashboardState } = useDashboardState();

  const filterOptions = [
    { label: "Newest First", value: "newest_first", default: true },
    { label: "Oldest First", value: "oldest_first", default: false },
    // { label: "A-Z", value: "", default: false },
    // { label: "Z-A", value: "", default: false },
  ];

  const statusFilterOptions = [
    { label: "Active", value: "active", default: true },
    { label: "Blocked", value: "blocked", default: false },
  ];

  const onlineStatusOptions = [
    { label: "All", value: "", default: String(online_status) !== 'offline' && String(online_status) !== 'online' ? true : false },
    { label: "Offline", value: "offline", default: String(online_status) === 'offline' ? true : false },
    { label: "Online", value: "online", default: String(online_status) === 'online' ? true : false }
  ];

  const [statusFilter, setStatusFilter] = useState<string>(
    statusFilterOptions.find((opt) => opt.default === true)?.value || "active"
  );

  const [onlineStatusOption, setOnlineStatusOption] = useState<string>(
    onlineStatusOptions.find((opt) => opt.default == true)?.value || ""
  );

  const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
    filterOptions.find((opt) => opt.default === true)?.value || "newest_first"
  );

  const {
    data: drivers,
    isLoading: driversLoading,
    isError: driversError,
    refetch: reloadDrivers,
    error,
  } = useGetAllDriversQuery(
    {
      carOwner: carOwner,
      driverStatus: "active",
      limit: pageSize,
      page: currentPage,
      search: searchDriver,
      order: selectedFilterOption,
      status: statusFilter,
      onlineStatus: onlineStatusOption,
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
    handleActiveDriverOption("active");
  }, []);

  const handleDriverTypeOption = (keyVal: string) => {
    const mutatedOptions = driverTypeOptions.map((option) => {
      if (option.keyVal === keyVal) return { ...option, isActive: true };
      return { ...option, isActive: false };
    });

    setDriverTypeOptions(() => mutatedOptions);
  };

  const carOwnerObj: { [key: string]: any } = {
    "all-drivers": null,
    "sharp-drivers": false,
    "regular-drivers": true,
  };

  useEffect(() => {
    const activeOption = driverTypeOptions.find(
      (item) => item.isActive === true
    )?.keyVal;
    if (activeOption) setCarOwner(carOwnerObj[activeOption]);
  }, [JSON.stringify(driverTypeOptions)]);

  useEffect(() => {
    if (router.query.online_status && router.query.online_status === 'online') setOnlineStatusOption('online')
    if (router.query.online_status && router.query.online_status === 'offline') setOnlineStatusOption('offline')
    if (router.query.online_status && router.query.online_status === '') setOnlineStatusOption('')
  }, [])

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
          <div className="flex items-center max-sm:flex-col gap-3 justify-between">
            <DriverTypeFilterBox
              options={driverTypeOptions}
              handleClickOption={(keyVal) => handleDriverTypeOption(keyVal)}
            />
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
            <div className="text-xs flex gap-3 items-center cursor-pointer border-r border-r-black justify-end pr-3 mr-3 max-sm:pr-0 max-sm:mr-0 max-sm:border-r-0">
              <span>Online Status:</span>
              <DropDown
                placeholder="Online Status"
                options={onlineStatusOptions}
                value={onlineStatusOption}
                handleChange={(val) => {
                  setOnlineStatusOption(String(val));
                  router.push(`${router.pathname}?online_status=${String(val)}`);
                }}
              />
            </div>
          </div>
        </SearchFilterBar>
        <div className="mt-5">
          <DriversTable
            tableData={drivers?.data}
            isError={driversError}
            isLoading={driversLoading}
            refetch={reloadDrivers}
            subPath="active"
            headBg={statusFilter === "blocked" ? "#FEE2E9" : ""}
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
