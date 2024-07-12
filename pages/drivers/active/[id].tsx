import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import React, { FC, useEffect, useState } from "react";

import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import PhoneIcon from "@/components/icons/PhoneIcon";
import BlockIcon from "@/components/icons/BlockIcon";
import ViewDriverLayout from "@/components/modules/drivers/ViewDriverLayout";
import DriverInfoCard from "@/components/common/UserInfoCard";
import CarDetailsCard from "@/components/common/CarDetailsCard";
import FinancialsCard from "@/components/common/FinancialsCard";
import GuarantorDetailsCard from "@/components/common/GuarantorDetailsCard";
import CarDocuments from "@/components/common/CarDocuments";
import TripHistoryCard from "@/components/common/TripHistoryCard";
import { useRouter } from "next/router";
import {
  useToggleBlockDriverMutation,
  useViewDriverQuery,
} from "@/api-services/driversService";
import Loader from "@/components/ui/Loader/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useGetDriverTripHistoryQuery } from "@/api-services/tripsService";
import BlockDriverConfirmation from "@/components/modules/drivers/BlockDriverConfirmation";
import { useModalContext } from "@/contexts/ModalContext";
import { toast } from "react-toastify";
import useUserPermissions from "@/hooks/useUserPermissions";
import AppHead from "@/components/common/AppHead";
import { capitalizeAllFirstLetters, capitalizeFirstLetter } from "@/utils";
import Card from "@/components/common/Card";
import TransactionsIcon from "@/components/icons/TransactionsIcon";
import FundDriverWallet from "@/components/modules/drivers/FundDriverWallet";
import { useUserContext } from "@/contexts/UserContext";
import TimesIconRed from "@/components/icons/TimesIconRed";
import { useGetOnlineMonitorQuery } from "@/api-services/monitorService";
import TextField from "@/components/ui/Input/TextField/TextField";
import SearchIcon from "@/components/icons/SearchIcon";
import ArrowForwardRight from "@/components/icons/ArrowForwardRight";

function timeAgo(timeString: any) {
  const currentDate = new Date();
  const pastDate = new Date(timeString);
  
  const timeDifference = currentDate.getTime() - pastDate.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (seconds < 604800) {
    const days = Math.floor(seconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (seconds < 2629746) {
    const weeks = Math.floor(seconds / 604800);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (seconds < 31556952) {
    const months = Math.floor(seconds / 2629746);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(seconds / 31556952);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
}

function formatTime(dateString: any) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
      throw new Error('Invalid date value');
  }

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${formattedMinutes}${ampm}`;
}

function calculateHoursBetween(startTime: any, endTime: any) {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error('Invalid date value');
  }

  const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

  return Math.round(differenceInHours);
}

function getLastFiveDays() {
  const days = ['today', 'yesterday', 'last two days', 'last three days', 'last four days'];
  const today = new Date();
  const datesArray = [];

  for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(date.getDate()).padStart(2, '0');

      datesArray.push({
          day: days[i],
          date: `${year}-${month}-${day}`
      });
  }

  return datesArray;
}

const ViewExtendedActivity:FC<any> = ({setTimeline, setFixedDate, lastFiveDays, onlineMonitorData}) => {
  const { setModalContent } = useModalContext();

  return (
    <div className="w-[90%] sm:w-[50%] md:w-[40%] lg:w-[40%]">
      <Card bg="#FFF">
        <div className="flex w-full justify-center items-center">
          <div className="w-[5%] cursor-pointer" onClick={() => {
            setModalContent(null)
          }}>
            <TimesIconRed />
          </div>
          <div className="font-bold w-[95%] flex justify-center items-center">Extended Online Activity</div>
        </div>

        <div className="w-full mt-4">
          <TextField
            placeholder="Search by a single date or range"
            label="Search by a single date or range"
            type="date"
            onChange={(e) =>{
                setFixedDate(e.target.value)
                setModalContent(
                  <ViewTracker onlineMonitorData={onlineMonitorData} setTimeline={(v: any) => setTimeline(v)} setFixedDate={(v: any) => setFixedDate(v)} lastFiveDays={lastFiveDays} />
                )
              }
            }
            className="my-3"
            startIcon={<SearchIcon />}
          />
        </div>

        {
          <div className="w-full mt-4">
              {
                lastFiveDays.map((day: any) => (
                  <div className="flex justify-between mt-2 mb-2 mx-3 p-4 bg-[#F6F6F6] rounded-lg cursor-pointer" onClick={() => {
                    setFixedDate(day?.date)
                    setModalContent(
                      <ViewTracker onlineMonitorData={onlineMonitorData} setTimeline={(v: any) => setTimeline(v)} setFixedDate={(v: any) => setFixedDate(v)} lastFiveDays={lastFiveDays} />
                    )
                  }}>
                    <div className="mt-1 mb-1 font-bold text-xs">{capitalizeFirstLetter(day?.day)}</div>
                    <div className="mt-1 mb-1 font-bold text-xs flex items-center justify-center gap-2">
                      <p className="w-auto">({day?.date})</p>
                      <ArrowForwardRight />
                    </div>
                  </div>
                ))
              }
          </div> 
        }
      </Card>
    </div>
  )
}

const ViewTracker:FC<any> = ({setTimeline, setFixedDate, lastFiveDays, onlineMonitorData}) => {
  const { setModalContent } = useModalContext();

  return (
    <div className="w-[90%] sm:w-[50%] md:w-[40%] lg:w-[40%]">
      <Card bg="#FFF">
        <div className="flex w-full justify-center items-center">
          <div className="w-[5%] cursor-pointer">
            <div className="w-auto transform rotate-180 flex items-center justify-center" onClick={() => {
              setModalContent(
                <ViewExtendedActivity setTimeline={(v: any) => setTimeline(v)} setFixedDate={(v: any) => setFixedDate(v)} lastFiveDays={lastFiveDays} onlineMonitorData={onlineMonitorData} />
              )
            }}>
              <ArrowForwardRight />
            </div>
          </div>
          <div className="font-bold w-[95%] flex justify-center items-center">Online Activity</div>
        </div>

        <div className="flex flex-col overflow-y-scroll w-full h-[60vh]">
          {
            onlineMonitorData?.data?.trackers?.map((track: any) => (
              <div className="flex flex-col mt-2 mb-2 mx-3 p-4 bg-[#F6F6F6] rounded-lg">
                <div className="mx-3 flex justify-between">
                  <p className="mt-1 mb-1 font-bold">{track.type === 'online' ? `${formatTime(track.online_switch_time)} - ${formatTime(track.offline_switch_time)}` : `${formatTime(track.offline_switch_time)} - ${formatTime(track.online_switch_time)}`}</p>
                  <p className="mt-1 mb-1 font-bold text-xs">{track.type === 'online' ? `Online for ${calculateHoursBetween(track.online_switch_time, track.offline_switch_time)} hours` : `Offline for ${calculateHoursBetween(track.offline_switch_time, track.online_switch_time)} hours`}</p>
                </div>
              </div>
            ))
          }
          {
            onlineMonitorData?.data?.trackers?.length === 0 &&
            <p className="text-center font-bold">No activity</p>
          }
        </div>
      </Card>
    </div>
  )
}

const Driver: NextPage = () => {
  const { user } = useUserContext();
  const router = useRouter();
  const [timeline, setTimeline] = useState('this_week');
  const [fixedDate, setFixedDate] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('')

  const { id } = router.query;

  const { data, isLoading, isError, refetch } = useViewDriverQuery(
    { id: String(id) },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  
  const { setModalContent } = useModalContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [extendedView, setExtendedView] = useState(false);
  const lastFiveDays = getLastFiveDays();

  const {
    data: tripHistory,
    isLoading: tripHistoryLoading,
    isError: tripHistoryError,
    refetch: refetchTripHistory,
  } = useGetDriverTripHistoryQuery(
    { driverId: String(id), limit: pageSize, page: currentPage },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const {
    data: onlineMonitorData,
    isLoading: onlineMonitorDataLoading,
    isError: onlineMonitorDataError,
    refetch: refetchOnlineMonitorData,
  } = useGetOnlineMonitorQuery(
    { id: String(id), timeline, fixedDate, dateStart, dateEnd },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const [
    unblockDriver,
    {
      isLoading: unblockLoading,
      isSuccess: unblockSuccess,
      error: unblockError,
    },
  ] = useToggleBlockDriverMutation();

  useEffect(() => {
    if (unblockSuccess) {
      toast.success("Driver Successfully Unblocked");
    }
  }, [unblockSuccess]);

  useEffect(() => {
    if (unblockError && "data" in unblockError) {
      const { message, status }: any = unblockError;
      if (message) toast.error(message);
      if (status) toast.error(status);
    }
  }, [unblockError]);

  useEffect(() => {
    if (onlineMonitorData) console.log({onlineMonitorData})
  }, [onlineMonitorData])

  useEffect(() => {
    if (fixedDate) console.log({fixedDate})
  }, [fixedDate])

  const { userPermissions } = useUserPermissions();
  const currentPageUrl = router.query.current_page ? `currentPage=${router.query.current_page}` : '';
  const handleBackUrl = router.query.fallbackUrl ? router.query.fallbackUrl : `/drivers/active?${currentPageUrl}`;

  return (
    <>
      <AppHead title="Kabukabu | Drivers" />
      <AppLayout padding="0">
        <div className="lg:h-screen lg:overflow-hidden p-4">
          <ActionBar handleBack={() => router.push(`${handleBackUrl}`)}>
            <Button
              title="Call Driver"
              startIcon={<PhoneIcon />}
              size="large"
            />
            {userPermissions &&
              userPermissions.drivers_permissions.write &&
              data &&
              data.driverInfo.isBlocked === false && (
                <>
                  {
                    user && user!.role === 'principal' &&
                    <Button
                      title="Fund Driver Wallet"
                      startIcon={<TransactionsIcon />}
                      size="large"
                      onClick={() => {
                        setModalContent(
                          <FundDriverWallet />
                        );
                      }}
                    />
                  }
                  <Button
                    title="Block Driver"
                    startIcon={<BlockIcon />}
                    size="large"
                    color="secondary"
                    onClick={() => {
                      setModalContent(
                        <BlockDriverConfirmation driverId={String(id)} />
                      );
                    }}
                  />
                </>
              )}
            {userPermissions &&
              userPermissions.drivers_permissions.write &&
              data &&
              data.driverInfo.isBlocked === true && (
                <Button
                  title="Unblock Driver"
                  startIcon={<BlockIcon />}
                  loading={unblockLoading}
                  disabled={unblockLoading}
                  size="large"
                  color="secondary"
                  className="!bg-[#1FD11B] !text-[#FFFFFF]"
                  onClick={() => {
                    unblockDriver({ driverId: String(id), reason: "" });
                  }}
                />
              )}
          </ActionBar>

          {data && !isLoading && !isError && (
            <ViewDriverLayout
              secondRow={
                <>
                  {
                    <div className="my-3">
                    <Card>
                      <div className="flex justify-end pt-2">
                        <p><b>User Status: </b>{capitalizeAllFirstLetters(data.onlineStatus)}</p>
                        {data.onlineStatus === 'online' ? <div className="mt-1 mx-2" style={{backgroundColor: '#6BBE66', border: '1px solid #6BBE66', borderRadius: '50%', height: '2vh', width: '1vw'}}></div> : <div className="mt-1 mx-2" style={{backgroundColor: '#9A9A9A', border: '1px solid #9A9A9A', borderRadius: '50%', height: '2vh', width: '1vw'}}></div>}
                      </div>
                      {(data.onlineSwitch || data.offlineSwitch) && 
                      <div className="flex justify-end pb-2">
                        {data.onlineStatus === 'online' ?  `Active since ${timeAgo(data.onlineSwitch)}` : `Last active ${timeAgo(data.offlineSwitch)}`}
                      </div>}
                      {
                        onlineMonitorData &&
                        <div className="flex justify-between py-2">
                          <div className="cursor-pointer text-xs bg-[#FFF5D8] p-2 rounded-lg" onClick={() => {
                            setModalContent(
                              <div className="w-[90%] sm:w-[50%] md:w-[40%] lg:w-[40%]">
                                <Card bg="#FFF">
                                  <div className="flex w-full justify-center items-center">
                                    <div className="w-[5%] cursor-pointer" onClick={() => {
                                      setModalContent(null)
                                    }}>
                                      <TimesIconRed />
                                    </div>
                                    <div className="font-bold w-[95%] flex justify-center items-center">Today's Online Activity</div>
                                  </div>
                                  <div className="flex flex-col overflow-y-scroll w-full h-[60vh]">
                                    {
                                      onlineMonitorData?.data?.trackers?.map((track: any) => (
                                        <div className="flex flex-col mt-2 mb-2 mx-3 p-4 bg-[#F6F6F6] rounded-lg">
                                          <div className="mx-3 flex justify-between">
                                            <p className="mt-1 mb-1 font-bold">{track.type === 'online' ? `${formatTime(track.online_switch_time)} - ${formatTime(track.offline_switch_time)}` : `${formatTime(track.offline_switch_time)} - ${formatTime(track.online_switch_time)}`}</p>
                                            <p className="mt-1 mb-1 font-bold text-xs">{track.type === 'online' ? `Online for ${calculateHoursBetween(track.online_switch_time, track.offline_switch_time)} hours` : `Offline for ${calculateHoursBetween(track.offline_switch_time, track.online_switch_time)} hours`}</p>
                                          </div>
                                        </div>
                                      ))
                                    }

                                    
                                    {
                                      onlineMonitorData?.data?.trackers?.length === 0 &&
                                      <p className="text-center font-bold">No activity</p>
                                    }
                                  </div>
                                </Card>
                              </div>
                            )
                          }}>View Today's Online Activity</div>
                          <div className="cursor-pointer text-xs bg-[#FFF5D8] p-2 rounded-lg" onClick={() => {
                            setModalContent(
                              <ViewExtendedActivity setTimeline={(v: any) => setTimeline(v)} setFixedDate={(v: any) => setFixedDate(v)} lastFiveDays={lastFiveDays} onlineMonitorData={onlineMonitorData}  />
                            )
                          }}>View Extended Online Activity</div>
                      </div>
                      }
                      
                    </Card>
                    </div>
                  }
                  {userPermissions &&
                    (userPermissions.trips_permissions.read ||
                      userPermissions.trips_permissions.write) &&
                    tripHistory &&
                    !tripHistoryLoading &&
                    !tripHistoryError && (
                      <TripHistoryCard
                        tripHistoryData={tripHistory.data}
                        totalCount={tripHistory.totalCount}
                        currentCount={tripHistory.data.length}
                        handleViewMore={() => {
                          setPageSize((ps) => ps + 5);
                        }}
                      />
                    )}
                  {userPermissions &&
                    (userPermissions.trips_permissions.read ||
                      userPermissions.trips_permissions.write) &&
                    !tripHistoryLoading &&
                    !tripHistory &&
                    tripHistoryError && (
                      <div className="pt-4 flex flex-col gap-2 items-center justify-center">
                        <ErrorMessage message="Error Fetching Trip History" />
                        <Button title="Reload" onClick={refetchTripHistory} />
                      </div>
                    )}
                  {userPermissions &&
                    (userPermissions.trips_permissions.read ||
                      userPermissions.trips_permissions.write) &&
                    tripHistoryLoading &&
                    !tripHistory &&
                    !tripHistoryError && (
                      <div className="pt-4 flex items-center justify-center">
                        <Loader size="medium" />
                      </div>
                    )}
                </>
              }
              firstRow={
                <>
                  <DriverInfoCard
                    referral_code={data?.driverInfo?.referralCode} {...data.driverInfo}
                    bg={data.driverInfo.isBlocked ? "#FEE2E9" : "#FFFFFF"}
                  />

                  <CarDetailsCard
                    {...data.carDetails}
                    bg={data.driverInfo.isBlocked ? "#FEE2E9" : "#FFFFFF"}
                  />

                  <FinancialsCard
                    {...data.financials}
                    bg={data.driverInfo.isBlocked ? "#FEE2E9" : "#FFFFFF"}
                  />

                  <GuarantorDetailsCard
                    {...data.guarantor}
                    bg={data.driverInfo.isBlocked ? "#FEE2E9" : "#FFFFFF"}
                  />

                  <CarDocuments
                    {...data.carDocs}
                    bg={data.driverInfo.isBlocked ? "#FEE2E9" : "#FFFFFF"}
                  />
                </>
              }
            />
          )}
          {isLoading && !data && !isError && (
            <div className="pt-4 flex items-center justify-center">
              <Loader size="medium" />
            </div>
          )}

          {!isLoading && !data && isError && (
            <div className="pt-4 flex flex-col gap-2 items-center justify-center">
              <ErrorMessage message="Error Fetching Data" />
              <Button title="Reload" onClick={refetch} />
            </div>
          )}
        </div>
      </AppLayout>
    </>
  );
};

export default Driver;

const mockTripHistory = [
  {
    originTop: "Kuvuki Land",
    originBottom: "",
    destinationTop: "Filmhouse Cinemas IMAX Lekki",
    destinationBottom: "22, Ozumba Mbadiwe Street, Lekki, Lagos",
    paymentMethod: "Wallet Payment",
    date: "20 January, 2023 at 3:30pm",
    amount: 1300,
    id: "#12345",
  },
  {
    originTop: "Kuvuki Land",
    originBottom: "",
    destinationTop: "Filmhouse Cinemas IMAX Lekki",
    destinationBottom: "22, Ozumba Mbadiwe Street, Lekki, Lagos",
    paymentMethod: "Wallet Payment",
    date: "20 January, 2023 at 3:30pm",
    amount: 1300,
    id: "#12345",
  },
  {
    originTop: "Kuvuki Land",
    originBottom: "",
    destinationTop: "Filmhouse Cinemas IMAX Lekki",
    destinationBottom: "22, Ozumba Mbadiwe Street, Lekki, Lagos",
    paymentMethod: "Wallet Payment",
    date: "20 January, 2023 at 3:30pm",
    amount: 1300,
    id: "#12345",
  },
];
