import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";

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
import Card from "@/components/common/Card";
import TextField from "@/components/ui/Input/TextField/TextField";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button/Button";
import Copy from "@/components/icons/Copy";
import FileIcon from "@/components/icons/FileIcon";
import WalletIcon from "@/components/icons/WalletIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import TextFieldTwo from "@/components/ui/Input/TextFieldTwo/TextFieldTwo";

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

function objectsToCSVDownload(objectsArray: any, filename = 'data.csv') {
    if (objectsArray.length === 0) {
        toast.error('Monitor data is empty for the chose time range.');
        return;
    }

    // Extract headers from the keys of the first object
    const headers = Object.keys(objectsArray[0]);

    // Convert the array of objects to CSV string
    const csvContent = [
        headers.join(','), // Join headers with commas
        ...objectsArray.map((obj: any) => headers.map(header => obj[header]).join(',')) // Map each object to a CSV row
    ].join('\n'); // Join all rows with newlines

    // Create a Blob from the CSV string
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a temporary link to download the Blob
    const link = document.createElement('a');
    if (link.download !== undefined) { // Feature detection
        // Create a URL for the Blob and set it as the href attribute of the link
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function convertDateFormat(dateString: string): string {
  // Split the input date string by the hyphen
  const [year, month, day] = dateString.split('-');

  // Return the date in the desired format
  return `${month}-${day}-${year}`;
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
  const [downloadReport, setDownloadReport] = useState<boolean>(false);

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
  
  interface Person {
    [key: string]: any; // This allows the object to have any number of properties
    profile_image?: string; // The profile_image field is optional
  }
  
  const removeProfileImageField = (arr: Person[]): Person[] => {
    return arr.map(({ profile_image, ...rest }) => rest);
  };

  useEffect(() => {
    if (monitorData) {
        console.log({monitorData})

        if ((monitorData?.data?.data.length === monitorData?.data?.pagination?.totalCount) && downloadReport) {
            console.log('full list', {monitorDataArr: monitorData?.data?.data})

            const withoutProfileImage = removeProfileImageField(monitorData?.data?.data)

            objectsToCSVDownload(withoutProfileImage, `Online monitor Data starting from ${dateStart} to ${dateEnd}, minimum of ${minHours} hours`);
            setPageSize(5);
            setDownloadReport(false);
        }
    }

    
  }, [monitorData])

  const startDateInputRef = useRef<HTMLInputElement>(null);
  const endDateInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <AppHead title="Kabukabu | Drivers" />
      <AppLayout>
        <CountHeader count={monitorData?.data?.pagination?.totalCount} title="Online Monitor" />
        <DriverOptionBar
          options={driverOptions}
          handleClickOption={(keyVal) => {
            router.push(`/drivers/${keyVal}`);
          }}
        />
        <div className="my-4">
            <Card bg="#F1F1F1">
                <div className="flex items-center max-sm:flex-col gap-3 justify-between">
                    <div className="flex flex-col sm:flex-row items-center w-full gap-4">
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
                      <div className="text-xs flex gap-3 items-center cursor-pointer">
                          <TextFieldTwo
                              label="Minimum Hours"
                              placeholder="Minimum Hours Here"
                              onChange={(e) => {
                                  setMinHours(parseInt(e?.target?.value))
                              }}
                              type="number"
                          />
                      </div>
                    </div>
                    <div className="text-xs flex gap-3 items-center cursor-pointer justify-end pr-3 mr-3 max-sm:pr-0 max-sm:mr-0">
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
                    </div>
                </div>
            </Card>
        </div>
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
