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
import TextFieldTwo from "@/components/ui/Input/TextFieldTwo/TextFieldTwo";
import Card from "@/components/common/Card";
import { useFetchRewardedUsersQuery } from "@/api-services/monitorService";
import RewardedUsersTable from "@/components/modules/drivers/RewardedUsersTable"

function getYesterdaysDate() {
    // Get today's date
    const today = new Date();

    // Subtract one day (in milliseconds)
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    // Get the day, month, and year
    const day = today.getDate();
    const month = today.getMonth() + 1; // Months are zero-based
    const year = today.getFullYear();

    // Format day and month to always have two digits
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    // Return the formatted date string
    return `${formattedMonth}-${formattedDay}-${year}`;
}

function convertDateFormat(dateString: string): string {
    // Split the input date string by the hyphen
    const [year, month, day] = dateString.split('-');
  
    // Return the date in the desired format
    return `${month}-${day}-${year}`;
}

const RewardedUsers: NextPage = () => {
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
  const [beneficiaryOptionsSelected, setBeneficiaryOptionsSelected] = useState<any>('');
  const [dateStart, setDateStart] = useState<any>('');
  const [dateEnd, setDateEnd] = useState<any>('');

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
    data,
    isLoading,
    isError,
    refetch,
    error,
  } = useFetchRewardedUsersQuery(
    {
        limit: pageSize, page: currentPage, dateStart, dateEnd, beneficiary: beneficiaryOptionsSelected
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
    handleActiveDriverOption("rewarded-users");
  }, []);

  const beneficiaryOptions = [
    { label: "New User", value: "NEW_USER", default: false },
    { label: "Exisiting User", value: "EXISTING_USER", default: false }
  ];

  const handleDriverTypeOption = (keyVal: string) => {
    const mutatedOptions = driverTypeOptions.map((option) => {
      if (option.keyVal === keyVal) return { ...option, isActive: true };
      return { ...option, isActive: false };
    });

    setDriverTypeOptions(() => mutatedOptions);
  };

  useEffect(() => {
    if (data) console.log({data})
  }, [data])


  return (
    <>
      <AppHead title="Kabukabu | Drivers" />
      <AppLayout>
        <CountHeader count={0} title="Rewarded Users" />
        <DriverOptionBar
          options={driverOptions}
          handleClickOption={(keyVal) => {
            router.push(`/drivers/${keyVal}`);
          }}
        />
        <div className="my-4">
            <Card bg="#F1F1F1">
                <div className="flex items-center max-sm:flex-col gap-3 justify-between">
                    <div className="flex flex-col sm:flex-row items-center w-full gap-4 justify-end">
                      <div className="text-xs flex gap-3 items-center cursor-pointer">
                          <TextFieldTwo
                              label="Start Date"
                              placeholder="Start Date Here"
                              onChange={(e) => {
                                setDateStart(convertDateFormat(e?.target?.value));
                              }}
                              type="date"
                          />
                      </div>
                      <div className="text-xs flex gap-3 items-center cursor-pointer">
                          <TextFieldTwo
                              label="End Date"
                              placeholder="End Date Here"
                              onChange={(e) => {
                                setDateEnd(convertDateFormat(e?.target?.value))
                              }}
                              type="date"
                          />
                      </div>
                      <div className="text-xs flex flex-col gap-3 items-center cursor-pointer">
                        <p>Beneficiary</p>
                        <DropDown
                          placeholder="Select Beneficiary"
                          options={beneficiaryOptions}
                          value={beneficiaryOptionsSelected}
                          handleChange={(val) => {
                            setBeneficiaryOptionsSelected(val);
                          }}
                        />
                      </div>
                    </div>
                    {/*<div className="text-xs flex gap-3 items-center cursor-pointer justify-end pr-3 mr-3 max-sm:pr-0 max-sm:mr-0">
                      <Button
                        title="Export as CSV"
                        size="medium"
                        color="primary"
                        onClick={() => {
                          const theTotalCount = monitorData?.data?.pagination?.totalCount;
                          setPageSize(theTotalCount);
                          setDownloadReport(true);
                        }}
                        startIcon={<FileIcon />}
                        className="min-w-[15vw]"
                        loading={downloadReport}
                      />
                    </div>*/}
                </div>
            </Card>
        </div>
        <div className="mt-5">
            <RewardedUsersTable
                tableData={data?.data?.data}
                isError={isError}
                isLoading={isLoading}
                refetch={refetch}
                subPath="active"
                headBg={statusFilter === "blocked" ? "#FEE2E9" : ""}
                currentPage={currentPage}
            />
            {data && (
                <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={data?.data?.pagination?.totalCount}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
                />
            )}
        </div>
      </AppLayout>
    </>
  );
};

export default RewardedUsers;
