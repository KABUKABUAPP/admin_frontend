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
  const { dashboardState, setDashboardState } = useDashboardState();
  const [driverOptions, setDriverOptions] = useState(driverOptionBarData);
  const [driverTypeOptions, setDriverTypeOptions] = useState(
    driverTypeFilterOptionsData
  );
  const [carOwner, setCarOwner] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(router.query.currentPage ? parseInt(router.query.currentPage as string) : 1);
  
  const [pageSize, setPageSize] = useState(5);
  const [searchDriver, setSearchDriver] = useState<string>("");

  const filterOptions = [
    { label: "Newest First", value: "newest_first", default: true },
    { label: "Oldest First", value: "oldest_first", default: false },
    // { label: "A-Z", value: "", default: false },
    // { label: "Z-A", value: "", default: false },
  ];

  const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
    filterOptions.find((opt) => opt.default === true)?.value || "newest_first"
  );

  const statusRemarkOptions = [
    { label: "All Status", value: "", default: true },
    { label: "Pending Approval", value: "pending approval", default: false },
    {
      label: "Pending Confirmation",
      value: "pending confirmation",
      default: false,
    },
    {
      label: "Pending Inspection",
      value: "pending inspection",
      default: false,
    },
    { label: "Approved", value: "approved", default: false },
    { label: "Declined", value: "declined", default: false },
  ];

  const [onboardStatusOptions, setOnboardStatusOptions] = useState([
    { label: "Ongoing", value: "ongoing", default: false },
    { label: "Complete", value: "complete", default: false },
    { label: "All", value: "", default: true },
  ])

  const [selectedStatusRemark, setSelectedStatusRemark] = useState<string>(
    statusRemarkOptions.find((opt) => opt.default === true)?.value || ""
  );

  const [onboardStatusRemark, setOnboardStatusRemark] = useState<string>(router.query.onboardStatus ? String(router.query.onboardStatus) :  onboardStatusOptions.find((opt) => opt.default === true)?.value || "");

  const {
    data: drivers,
    isLoading: driversLoading,
    isError: driversError,
    refetch: reloadDrivers,
  } = useGetAllDriversQuery(
    {
      carOwner: carOwner,
      driverStatus: "pending",
      limit: pageSize,
      page: currentPage,
      search: searchDriver,
      order: selectedFilterOption,
      statusRemark: selectedStatusRemark,
      onboardStatus: onboardStatusRemark,
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
    handleActiveDriverOption("pending");
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
          title="Show:"
          handleSearch={(value) => {
            setSearchDriver(value);
          }}
          filterOptions={statusRemarkOptions}
          dropDownOptionSelected={selectedStatusRemark}
          handleDropDown={(val) => setSelectedStatusRemark(String(val))}
        >
          <div className="flex items-center max-sm:flex-col gap-3 justify-between">
            <DriverTypeFilterBox
              options={driverTypeOptions}
              handleClickOption={(keyVal) => handleDriverTypeOption(keyVal)}
            />
            <div className="text-xs flex gap-3 items-center cursor-pointer border-r border-r-black justify-end pr-3 mr-3 max-sm:pr-0 max-sm:mr-0 max-sm:border-r-0">
              <span>Sort:</span>
              <DropDown
                placeholder="Filter"
                options={filterOptions}
                value={selectedFilterOption}
                handleChange={(val) => {
                  setSelectedFilterOption(String(val));
                }}
              />
            </div>
            <div className="text-xs flex gap-3 items-center cursor-pointer border-r border-r-black justify-end pr-3 mr-3 max-sm:pr-0 max-sm:mr-0 max-sm:border-r-0">
              <span>Onboard Status:</span>
              <DropDown
                placeholder="Filter"
                options={onboardStatusOptions}
                value={onboardStatusRemark}
                handleChange={(val) => {
                  setOnboardStatusRemark(String(val));
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
            subPath="pending"
            currentPage={currentPage}
            onboardStatus={onboardStatusRemark}
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
