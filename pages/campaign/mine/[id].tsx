import { useCreateCampaignMutation, useGetMarketingStaffsQuery, useViewCampaignQuery } from "@/api-services/campaignService";
import ActionBar from "@/components/common/ActionBar";
import AppHead from "@/components/common/AppHead";
import Card from "@/components/common/Card";
import UserInfoCard from "@/components/common/UserInfoCard";
import AddIcon from "@/components/icons/AddIcon";
import EditIcon from "@/components/icons/EditIcon";
import ViewFarePriceLayout from "@/components/modules/fare-prices/ViewFarePriceLayout";
import ViewStaffLayout from "@/components/modules/staff/ViewStaffLayout";
import Button from "@/components/ui/Button/Button";
import MarketerNav from "@/components/modules/campaign/MarketerNav";
import TextField from "@/components/ui/Input/TextField/TextField";
import Loader from "@/components/ui/Loader/Loader";
import AppLayout from "@/layouts/AppLayout";
import { capitalizeAllFirstLetters } from "@/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { useGetAllDriversQuery } from "@/api-services/driversService";
import { useDashboardState } from "@/contexts/StateSegmentationContext";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import DriverTypeFilterBox from "@/components/modules/drivers/DriverTypeFilterBox";
import { driverOptionBarData, driverTypeFilterOptionsData } from "@/constants";
import DropDown from "@/components/ui/DropDown";
import DriversTable from "@/components/modules/campaign/DriversTable";
import Pagination from "@/components/common/Pagination";
import { useGetAllRidesQuery } from "@/api-services/ridersService";
import CountHeader from "@/components/common/CountHeader";
import RidersTable from "@/components/modules/campaign/RidersTable";
import DeletedRidersTable from "@/components/modules/campaign/DeletedRidersTable";


const ViewCampaignMine = () => {
    const router = useRouter();
    const online_status = router.query.online_status;

    
    const [driverOptions, setDriverOptions] = useState(driverOptionBarData);
    const [driverTypeOptions, setDriverTypeOptions] = useState([
        {
            title: 'Pending',
            isActive: true,
            keyVal: 'pending'
        },
        {
            title: 'Active',
            isActive: false,
            keyVal: 'active'
        },
        {
            title: 'Declined',
            isActive: false,
            keyVal: 'declined'
        }
    ]);
    
    const [onboardView, setOnboardView] = useState('driver');
    const [carOwner, setCarOwner] = useState<boolean>(false);
    const [pageSize, setPageSize] = useState(5);
    const [searchDriver, setSearchDriver] = useState<string>("");
    const [driverStatus, setDriverStatus] = useState<string>("pending");
    const [currentPage, setCurrentPage] = useState(1);
    const [currentRiderPage, setCurrentRiderPage] = useState(1);
    const [referralCode, setReferralCode] = useState('');
    const [searchRider, setSearchRider] = useState<string>("");
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

    const timeFilterOptions = [
        { label: "Newest First", value: "newest_first", default: true },
        { label: "Oldest First", value: "oldest_first", default: false },
        { label: "A-Z", value: "a-z", default: false },
        { label: "Z-A", value: "z-a", default: false },
      ];
      const riderStatusFilterOptions = [
        { label: "Active", value: "no", default: true },
        { label: "Blocked", value: "yes", default: false },
        { label: "Deleted", value: "deleted", default: false },
      ];
    
      const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>(
        timeFilterOptions.find((opt) => opt.default === true)?.value ||
          "newest_first"
      );

      const [riderStatusFilter, setRiderStatusFilter] = useState<string>(
        riderStatusFilterOptions.find((opt) => opt.default === true)?.value || "active"
      );

    const id = router.query.id;

    const { data, isLoading, error, refetch, isError } = useViewCampaignQuery({
        id
    })

    const {
        data: drivers,
        isLoading: driversLoading,
        isError: driversIsError,
        refetch: reloadDrivers,
        error: driversError,
      } = useGetAllDriversQuery(
        {
          carOwner: carOwner,
          driverStatus: driverStatus,
          limit: pageSize,
          page: currentPage,
          search: searchDriver,
          order: selectedFilterOption,
          status: statusFilter,
          onlineStatus: onlineStatusOption,
          dashboard_state: dashboardState,
          referralCode
        },
        {
          refetchOnMountOrArgChange: true,
          refetchOnReconnect: true,
        }
    );

    const { data: ridersData, isLoading: ridersLoading, isError: ridersIsError, refetch: ridersRefetch } = useGetAllRidesQuery(
        {
          limit: pageSize,
          page: currentRiderPage,
          search: searchRider,
          order: selectedTimeFilter,
          status: riderStatusFilter,
          onlineStatus: '',
          referralCode
        },
        { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
    );

    useEffect(() => {
        if (data) {
            console.log({data});
            setReferralCode(data?.campaign_details?.referral_code);
        }
    }, [data])

    const handleDriverTypeOption = (keyVal: string) => {
        const mutatedOptions = driverTypeOptions.map((option) => {
          if (option.keyVal === keyVal) return { ...option, isActive: true };
          return { ...option, isActive: false };
        });
    
        setDriverTypeOptions(() => mutatedOptions);
    };

    return (
        <div style={{ backgroundColor: '#F8F8F8' }}>
            <AppHead title="Kabukabu | Repair Loan" />
            <MarketerNav />
            <div className="p-5">
                <ActionBar></ActionBar>
            </div>
            <div className="px-5 pb-5">
                <div className="mx-auto w-[90%] flex flex-col md:flex-row my-1 gap-5">
                    {
                        isLoading && !data &&
                        <div className="flex justify-center items-center">
                            <Loader />
                        </div>
                    }
                </div>
                {
                    !isLoading && data &&
                    <>
                        <div className="grid grid-cols grid-cols-1 md:grid-cols-[15%_85%] lg:grid-cols-[30%_70%] gap-x-4">
                            <div className="w-full">
                                <div className="flex flex-col gap-4">
                                    <Card bg="#FFF">
                                        <div className="flex flex-col gap-3 w-full">
                                            <div className="flex flex-col gap-4 border-b border-b-[#E6E6E6] last:border-none py-4">
                                                <p className="text-sm text-[#000000] font-semibold">Campaign Name</p>
                                                <p className="text-lg font-bold">{capitalizeAllFirstLetters(data?.campaign_details?.name)}</p>
                                            </div>
                                            <div className="flex flex-col gap-4 border-b border-b-[#E6E6E6] last:border-none py-4">
                                                <p className="text-sm text-[#000000] font-semibold">Owned By</p>
                                                <p className="text-lg font-bold">{capitalizeAllFirstLetters(data?.campaign_details?.owner)}</p>
                                            </div>
                                            <div className="flex flex-col gap-4 border-b border-b-[#E6E6E6] last:border-none py-4">
                                                <p className="text-sm text-[#000000] font-semibold">Start date</p>
                                                <p className="text-lg font-bold">{new Date(data?.campaign_details?.start_date).toLocaleString()}</p>
                                            </div>
                                            {
                                                data?.campaign_details?.end_date &&
                                                <div className="flex flex-col gap-4 border-b border-b-[#E6E6E6] last:border-none py-4">
                                                    <p className="text-sm text-[#000000] font-semibold">End date</p>
                                                    <p className="text-lg font-bold">{new Date(data?.campaign_details?.end_date).toLocaleString()}</p>
                                                </div>
                                            }
                                        </div>
                                    </Card>

                                    <Card bg="#FFF">
                                        <p className="text-center font-bold text-md my-1">Drivers</p>
                                        {
                                            data?.direct_drivers_onboarded?.totalCount >= 0 &&
                                            <div className="flex flex-col gap-4 border-b border-b-[#E6E6E6] last:border-none py-4">
                                                <p className="text-sm text-[#000000] font-semibold">Total Drivers Onboarded</p>
                                                <p className="text-lg font-bold">{`${data?.direct_drivers_onboarded?.totalCount}`}</p>
                                            </div>
                                        }
                                        {
                                            data?.direct_drivers_onboarded?.total_approved >= 0 &&
                                            <div className="flex flex-col gap-4 border-b border-b-[#E6E6E6] last:border-none py-4">
                                                <p className="text-sm text-[#000000] font-semibold">Total Drivers Approved</p>
                                                <p className="text-lg font-bold">{`${data?.direct_drivers_onboarded?.total_approved}`}</p>
                                            </div>
                                        }
                                        {
                                            data?.direct_drivers_onboarded?.completed_onboarding >= 0 &&
                                            <div className="flex flex-col gap-4 border-b border-b-[#E6E6E6] last:border-none py-4">
                                                <p className="text-sm text-[#000000] font-semibold">Completed Onboarding</p>
                                                <p className="text-lg font-bold">{`${data?.direct_drivers_onboarded?.completed_onboarding}`}</p>
                                            </div>
                                        }
                                        {
                                            data?.direct_drivers_onboarded?.onboarding_incomplete >= 0 &&
                                            <div className="flex flex-col gap-4 border-b border-b-[#E6E6E6] last:border-none py-4">
                                                <p className="text-sm text-[#000000] font-semibold">Onboarding Incomplete</p>
                                                <p className="text-lg font-bold">{`${data?.direct_drivers_onboarded?.onboarding_incomplete}`}</p>
                                            </div>
                                        }
                                    </Card>
                                        
                                    <Card bg="#FFF">
                                        <p className="text-center font-bold text-md my-1">Riders</p>
                                        {
                                            data?.direct_riders_onboarded?.totalCount >= 0 &&
                                            <div className="flex flex-col gap-4 border-b border-b-[#E6E6E6] last:border-none py-4">
                                                <p className="text-sm text-[#000000] font-semibold">Total Riders Onboarded</p>
                                                <p className="text-lg font-bold">{`${data?.direct_riders_onboarded?.totalCount}`}</p>
                                            </div>
                                        }
                                    </Card>
                                </div>
                            </div>
                            <div className="w-full my-5">
                                <Card bg={'#FFF'}>
                                    <div className="flex gap-4 mb-3">
                                        <p className={`w-auto cursor-pointer ${onboardView === 'driver' ? 'font-bold' : ''}`} onClick={() => setOnboardView('driver')}>Driver</p>
                                        <p>|</p>
                                        <p className={`w-auto cursor-pointer ${onboardView === 'rider' ? 'font-bold' : ''}`} onClick={() => setOnboardView('rider')}>Rider</p>
                                    </div>
                                    <div className="flex flex-col gap-3 w-full">
                                        <p className="text-center font-bold text-sm">{capitalizeAllFirstLetters(onboardView)}s Onboarded</p>

                                        {
                                            onboardView === 'driver' &&
                                            <>
                                            <CountHeader title="Drivers" count={drivers?.totalCount} />
                                            <SearchFilterBar
                                                searchValue={searchDriver}
                                                handleSearch={(value) => {
                                                    setSearchDriver(value);
                                                }}
                                                filterOptions={filterOptions}
                                                dropDownOptionSelected={selectedFilterOption}
                                                handleDropDown={(val) => setSelectedFilterOption(String(val))}
                                                >
                                                <div className="flex items-center flex-col md:flex-row gap-3">
                                                    <DriverTypeFilterBox
                                                        options={driverTypeOptions}
                                                        handleClickOption={(keyVal) => {
                                                            handleDriverTypeOption(keyVal)
                                                            setDriverStatus(keyVal)
                                                        }}
                                                    />
                                                    <div className="text-xs flex gap-2 flex-col lg:flex-row items-center cursor-pointer justify-end">
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
                                                <DriversTable
                                                    tableData={drivers?.data}
                                                    isError={driversIsError}
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
                                            </>
                                        }

                                        {
                                            onboardView === 'rider' && 
                                            <>
                                                <CountHeader title="Riders" count={ridersData?.totalCount} />
                                                <SearchFilterBar
                                                searchValue={searchRider}
                                                handleSearch={(value) => {
                                                    setSearchRider(value);
                                                }}
                                                filterOptions={timeFilterOptions}
                                                handleDropDown={(val) => setSelectedTimeFilter(String(val))}
                                                dropDownOptionSelected={selectedTimeFilter}
                                                >
                                                <div className="text-xs flex gap-3 items-center cursor-pointer border-r border-r-black justify-end pr-3 mr-3 max-sm:pr-0 max-sm:mr-0 max-sm:border-r-0">
                                                    <span>Show:</span>
                                                    <DropDown
                                                    placeholder="Filter"
                                                    options={riderStatusFilterOptions}
                                                    value={riderStatusFilter}
                                                    handleChange={(val) => {
                                                        setRiderStatusFilter(String(val));
                                                    }}
                                                    />
                                                </div>
                                                </SearchFilterBar>
                                                {statusFilter === "deleted" ? (
                                                <DeletedRidersTable
                                                    headBg=""
                                                    ridersData={ridersData?.data}
                                                    isLoading={isLoading}
                                                    isError={isError}
                                                    refetch={refetch}
                                                />
                                                ) : (
                                                <RidersTable
                                                    headBg={riderStatusFilter === "yes" ? "#FEE2E9" : ""}
                                                    ridersData={ridersData?.data}
                                                    isLoading={ridersLoading}
                                                    isError={ridersIsError}
                                                    refetch={ridersRefetch}
                                                    currentPage={currentPage}
                                                />
                                                )}
                                                {ridersData && (
                                                <Pagination
                                                    className="pagination-bar"
                                                    currentPage={currentRiderPage}
                                                    totalCount={ridersData.totalCount}
                                                    pageSize={pageSize}
                                                    onPageChange={(page) => setCurrentRiderPage(page)}
                                                />
                                                )}
                                            </>
                                        }
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default ViewCampaignMine;