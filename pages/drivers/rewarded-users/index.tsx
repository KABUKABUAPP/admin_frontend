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
import { useGetDriverSettingsQuery } from "@/api-services/settingsService";
import ChevronLeft from "@/components/icons/ChevronLeft";
import Accordion from "@/components/common/Accordion";

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
  const [profileStart, setProfileStart] = useState<string>('0');
  const [profileStop, setProfileStop] = useState<string>('0');

  const [driverOptions, setDriverOptions] = useState(driverOptionBarData);
  const [driverTypeOptions, setDriverTypeOptions] = useState(
    driverTypeFilterOptionsData
  );
  const [carOwner, setCarOwner] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState(5);
  const [searchDriver, setSearchDriver] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(router.query.currentPage ? parseInt(router.query.currentPage as string) : 1);
  const { dashboardState, setDashboardState } = useDashboardState();
  const [beneficiaryOptionsSelected, setBeneficiaryOptionsSelected] = useState<any>('EXISTING_USER');
  const [showProfile, setShowProfile] = useState<boolean>(true);
  const [dateStart, setDateStart] = useState<any>('');
  const [dateEnd, setDateEnd] = useState<any>('');
  const [currentView, setCurrentView] = useState('existing-user');
  const [accordionItems, setAccordionItems] = useState<any>();

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
        limit: pageSize, page: currentPage, start: profileStart, stop: profileStop, beneficiary: beneficiaryOptionsSelected
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
    if (data) {
      const accordionData = data?.data?.map((pro: any) => {
        return {
          title: pro.date,
          content: 
          <div className="mt-5">
            <RewardedUsersTable
                tableData={pro?.data}
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
                totalCount={pro?.pagination?.totalCount}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
                />
            )}
          </div>
        }
      })

      setAccordionItems(accordionData)
    }
  }, [data])

  const {
    data: driversSettings,
    isLoading: settingsLoading,
    isError: settingsError,
    refetch: reloadSettings,
  } = useGetDriverSettingsQuery({})

  const getWeekDay = (a: number) => {
    if (a === 0) return 'Sunday';
    if (a === 1) return 'Monday';
    if (a === 2) return 'Tuesday';
    if (a === 3) return 'Wednesday';
    if (a === 4) return 'Thursday';
    if (a === 5) return 'Friday';
    if (a === 6) return 'Saturday';
  }

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
                      <div className="flex">
                          <div className="flex flex-col w-auto gap-3">
                              <p className={`cursor-pointer ${beneficiaryOptionsSelected === 'EXISTING_USER' ? `font-bold` : ''}`} onClick={() => {setBeneficiaryOptionsSelected('EXISTING_USER')}}>{'Existing User'}</p>
                          </div> 
                      </div>
                      <div className="hidden sm:flex font-bold">
                        |
                      </div>
                      <div className="flex">
                          <div className="flex flex-col w-auto gap-3">
                              <p className={`cursor-pointer ${beneficiaryOptionsSelected === 'NEW_USER' ? `font-bold` : ''}`} onClick={() => {setBeneficiaryOptionsSelected('NEW_USER')}}>{'New User'}</p>
                          </div> 
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
        {
          beneficiaryOptionsSelected === 'EXISTING_USER' &&
          <div className="mt-5">
            {
              <>
                    <div className="grid grid-cols grid-cols-1 sm:grid-cols-2 py-5">
                        {
                            driversSettings && showProfile && driversSettings.online_consistency_reward_control.profile.map((one: any) => (
                                <div className="bg-[#FFFFFF] p-4 w-[90%] mx-auto my-2 rounded-lg shadow-md">
                                    <div className="flex justify-end w-full">
                                      <p className="w-auto text-xs cursor-pointer text-[#9A9A9A]" onClick={() => {
                                        setShowProfile(false)
                                        setProfileStart(one.start)
                                        setProfileStop(one.stop)
                                      }}>Click Here To Reveal Rewarded Users For This Profile</p>
                                    </div>
                                    <div className="flex flex-col border-b border-b-[#E6E6E6] last:border-none py-3">
                                        {<p className="text-xs text-[#000000] font-semibold">{'Name'}</p>}
                                        {<p className="text-sm font-bold">{one.name}</p>}
                                    </div>
                                    <div className="flex flex-col border-b border-b-[#E6E6E6] last:border-none py-3">
                                        {<p className="text-xs text-[#000000] font-semibold">{'Amount'}</p>}
                                        {<p className="text-sm font-bold">{one.amount}</p>}
                                    </div>
                                    <div className="flex flex-col border-b border-b-[#E6E6E6] last:border-none py-3">
                                        {<p className="text-sm font-bold">{one.active === 1 ? 'Active' : 'Not Active'}</p>}
                                    </div>
                                    <div className="flex flex-col border-b border-b-[#E6E6E6] last:border-none py-3">
                                        {<p className="text-xs text-[#000000] font-semibold">{'Number of Trips'}</p>}
                                        {<p className="text-sm font-bold">{one.number_of_trips}</p>}
                                    </div>
                                    <div className="flex flex-col border-b border-b-[#E6E6E6] last:border-none py-3">
                                        {<p className="text-xs text-[#000000] font-semibold">{'Hours'}</p>}
                                        {<p className="text-sm font-bold">{one.hours}</p>}
                                    </div>
                                    <div className="flex flex-col border-b border-b-[#E6E6E6] last:border-none py-3">
                                        {<p className="text-xs text-[#000000] font-semibold">{'Start'}</p>}
                                        {<p className="text-sm font-bold">{getWeekDay(one.start)}</p>}
                                    </div>
                                    <div className="flex flex-col border-b border-b-[#E6E6E6] last:border-none py-3">
                                        {<p className="text-xs text-[#000000] font-semibold">{'Stop'}</p>}
                                        {<p className="text-sm font-bold">{getWeekDay(one.stop)}</p>}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {
                      !showProfile &&
                      <>
                        <p className="flex gap-3 cursor-pointer justify-start items-center" onClick={() => {setShowProfile(true)}}><ChevronLeft /> <span>Go Back To Profile</span></p>
                        {accordionItems && <Accordion items={accordionItems} />}
                      </>
                    }
                </>
            }
          </div>
        }
        {
          beneficiaryOptionsSelected === 'NEW_USER' &&
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
        }
      </AppLayout>
    </>
  );
};

export default RewardedUsers;
