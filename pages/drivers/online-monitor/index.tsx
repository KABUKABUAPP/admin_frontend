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
import { useGetOnlineMonitorWithBenchmarkQuery } from "@/api-services/monitorService";
import MonitorTable from "@/components/modules/drivers/MonitorTable";

function getYesterdaysDate() {
    // Get today's date
    const today = new Date();

    // Subtract one day (in milliseconds)
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    // Get the day, month, and year
    const day = yesterday.getDate();
    const month = yesterday.getMonth() + 1; // Months are zero-based
    const year = yesterday.getFullYear();

    // Format day and month to always have two digits
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    // Return the formatted date string
    return `${formattedMonth}-${formattedDay}-${year}`;
}


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
  const [minHours, setMinHours] = useState(0);
  const [dateStart, setDateStart] = useState<any>(getYesterdaysDate());
  const [dateEnd, setDateEnd] = useState<any>(getYesterdaysDate());

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
    data: monitorData,
    isLoading: monitorLoading,
    isError: monitorIsError,
    refetch: monitorRefetch,
    error: monitorError,
  } = useGetOnlineMonitorWithBenchmarkQuery(
    {
        min_hours: minHours, limit: pageSize, page: currentPage, dateStart, dateEnd
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
    handleActiveDriverOption("online-monitor");
  }, []);

  const handleDriverTypeOption = (keyVal: string) => {
    const mutatedOptions = driverTypeOptions.map((option) => {
      if (option.keyVal === keyVal) return { ...option, isActive: true };
      return { ...option, isActive: false };
    });

    setDriverTypeOptions(() => mutatedOptions);
  };

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

  useEffect(() => {
    if (monitorData) console.log({monitorData})
  }, [monitorData])

  return (
    <>
      <AppHead title="Kabukabu | Drivers" />
      <AppLayout>
        {/*<CountHeader count={drivers?.totalCount} title="Online Monitor" />*/}
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
          <div className="flex items-center max-sm:flex-col gap-3 justify-end">
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
          </div>
        </SearchFilterBar>
        <div className="mt-5">
          <MonitorTable
            tableData={monitorData?.data?.data}
            isError={monitorIsError}
            isLoading={monitorLoading}
            refetch={monitorRefetch}
            subPath="active"
            headBg={statusFilter === "blocked" ? "#FEE2E9" : ""}
            currentPage={currentPage}
          />
          {monitorData && (
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={monitorData?.data?.pagination?.totalCount}
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
