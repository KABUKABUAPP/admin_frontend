import { NextPage } from "next";
import React, { FC, useEffect, useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import ViewRiderLayout from "@/components/modules/riders/ViewRiderLayout";
import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import PhoneIcon from "@/components/icons/PhoneIcon";
import BlockIcon from "@/components/icons/BlockIcon";
import UserInfoCard from "@/components/common/UserInfoCard";
import FinancialsCard from "@/components/modules/riders/FinancialsCard";
import NextOfKinCard from "@/components/modules/riders/NextOfKinCard";
import TripHistoryCard from "@/components/common/TripHistoryCard";
import FundDriverWallet from "@/components/modules/drivers/FundDriverWallet";
import {
  useToggleBlockRiderMutation,
  useViewRiderQuery,
} from "@/api-services/ridersService";
import { useRouter } from "next/router";
import { useGetDriverTripHistoryQuery } from "@/api-services/tripsService";
import { useModalContext } from "@/contexts/ModalContext";
import BlockRiderConfirmation from "@/components/modules/riders/BlockRiderConfirmation";
import { toast } from "react-toastify";
import useUserPermissions from "@/hooks/useUserPermissions";
import AppHead from "@/components/common/AppHead";
import TransactionsIcon from "@/components/icons/TransactionsIcon";
import { useUserContext } from "@/contexts/UserContext";
import Card from "@/components/common/Card";
import { useGetOnlineMonitorQuery } from "@/api-services/monitorService";
import TimesIconRed from "@/components/icons/TimesIconRed";
import ArrowForwardRight from "@/components/icons/ArrowForwardRight";
import Loader from "@/components/ui/Loader/Loader";
import TextField from "@/components/ui/Input/TextField/TextField";
import SearchIcon from "@/components/icons/SearchIcon";
import { capitalizeFirstLetter } from "@/utils";


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
function calculateHoursBetween(startTime: string, endTime: string) {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error('Invalid date value');
  }

  const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
  const differenceInSeconds = differenceInMilliseconds / 1000;

  if (differenceInSeconds < 60) {
    return `${Math.round(differenceInSeconds)} seconds`;
  }

  const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

  if (differenceInMinutes < 60) {
    return `${Math.round(differenceInMinutes)} minutes`;
  }

  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
  return `${Math.round(differenceInHours)} hours`;
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

const ViewExtendedActivity:FC<any> = ({lastFiveDays}) => {
  const today = new Date();
  const todayDate = new Date(today);
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(todayDate.getDate()).padStart(2, '0');
  const [timeline, setTimeline] = useState('');
  const [fixedDate, setFixedDate] = useState(`${year}-${month}-${day}`);
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('')

  const router = useRouter();
  const { id } = router.query;

  const {
    data: onlineMonitorData,
    isLoading: onlineMonitorDataLoading,
    isError: onlineMonitorDataError,
    refetch: refetchOnlineMonitorData,
  } = useGetOnlineMonitorQuery(
    { id: String(id), timeline, fixedDate, dateStart, dateEnd },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

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
            onChange={(e) => {
                setTimeline('6_months')
                setFixedDate(e.target.value)
                setModalContent(
                  <ViewTracker lastFiveDays={lastFiveDays} conditionalDate={e.target.value} />
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
                    let theDay = '';

                    if (day?.day === 'today') {
                      theDay = 'today';
                      setFixedDate(day?.date);
                    } else if (day?.day === 'yesterday') {
                      theDay = 'yesterday';
                      setFixedDate(day?.date);
                    } else {
                      theDay = 'date_range'
                      setDateStart(day?.date)
                      setDateEnd(day?.date)
                    }

                    setModalContent(
                      <ViewTracker lastFiveDays={lastFiveDays} conditionalDate={day?.date} conditionalTimeline={theDay} />
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

const ViewTracker:FC<any> = ({lastFiveDays, conditionalDate, conditionalTimeline}) => {
  const today = new Date();
  const todayDate = new Date(today);
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(todayDate.getDate()).padStart(2, '0');
  const [timeline, setTimeline] = useState('');
  const [fixedDate, setFixedDate] = useState(`${year}-${month}-${day}`);
  const [dateStart, setDateStart] = useState('');
  const { setModalContent } = useModalContext();
  const [dateEnd, setDateEnd] = useState('')
  
  const router = useRouter();
  const { id } = router.query;

  const {
    data: onlineMonitorData,
    isLoading: onlineMonitorDataLoading,
    isError: onlineMonitorDataError,
    refetch: refetchOnlineMonitorData,
  } = useGetOnlineMonitorQuery(
    { id: String(id), timeline: conditionalTimeline ? conditionalTimeline : timeline, fixedDate: conditionalDate ? conditionalDate : fixedDate, dateStart, dateEnd },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  return (
    <div className="w-[90%] sm:w-[50%] md:w-[40%] lg:w-[40%]">
      <Card bg="#FFF">
        <div className="flex w-full justify-center items-center">
          <div className="w-[5%] cursor-pointer">
            <div className="w-auto transform rotate-180 flex items-center justify-center" onClick={() => {
              setModalContent(
                <ViewExtendedActivity lastFiveDays={lastFiveDays} />
              )
            }}>
              <ArrowForwardRight />
            </div>
          </div>
          <div className="font-bold w-[95%] flex justify-center items-center">Online Activity</div>
        </div>

        <div className="flex flex-col overflow-y-scroll w-full h-[60vh]">
          {
            onlineMonitorDataLoading &&
            <div className="flex justify-center items center">
              <Loader />
            </div>
            
          }
          {
            !onlineMonitorDataLoading && onlineMonitorData?.data &&
            <div className="flex flex-col gap-3 p-4">
              <div className="flex justify-between">
                <p className="font-bold">Total Online Time (Minutes)</p>
                <p className="font-bold text-xs">{onlineMonitorData?.data?.totalOnlineTimeInMinutes} minutes</p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold">Total Online Hours</p>
                <p className="font-bold text-xs">{onlineMonitorData?.data?.totalOnlineHours.hours}hrs {onlineMonitorData?.data?.totalOnlineHours.minutes}mins</p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold">Total Offline Hours</p>
                <p className="font-bold text-xs">{onlineMonitorData?.data?.totalOfflineHours.hours}hrs {onlineMonitorData?.data?.totalOfflineHours.minutes}mins</p>
              </div>
            </div>
          }
          {
            !onlineMonitorDataLoading && onlineMonitorData?.data?.trackers?.map((track: any) => (
              <div className="flex flex-col mt-2 mb-2 mx-3 p-4 bg-[#F6F6F6] rounded-lg">
                <div className="mx-3 flex justify-between">
                  <p className="mt-1 mb-1 font-bold">{track.type === 'online' ? `${formatTime(track.online_switch_time)} - ${formatTime(track.offline_switch_time)}` : `${formatTime(track.offline_switch_time)} - ${formatTime(track.online_switch_time)}`}</p>
                  <p className="mt-1 mb-1 font-bold text-xs">{track.type === 'online' ? `Online for ${calculateHoursBetween(track.online_switch_time, track.offline_switch_time)}` : `Offline for ${calculateHoursBetween(track.offline_switch_time, track.online_switch_time)}`}</p>
                </div>
              </div>
            ))
          }
          {
            !onlineMonitorDataLoading && onlineMonitorData?.data?.trackers?.length === 0 &&
            <p className="text-center font-bold">No activity</p>
          }
        </div>
      </Card>
    </div>
  )
}

const Rider: NextPage = () => {
  const { user } = useUserContext();
  const router = useRouter();

  const { id } = router.query;
  
  const today = new Date();
  const todayDate = new Date(today);
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(todayDate.getDate()).padStart(2, '0');
  const { setModalContent } = useModalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [timeline, setTimeline] = useState('today');
  const [fixedDate, setFixedDate] = useState(`${year}-${month}-${day}`);
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('')
  const [onlineMonitorDataRes, setOnlineMonitorDataRes] = useState<any>()
  const lastFiveDays = getLastFiveDays();

  const { data, isLoading, isError } = useViewRiderQuery(
    { id: String(id), status: "" },
    { skip: !id, refetchOnReconnect: true, refetchOnMountOrArgChange: true }
  );

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
    unblockRider,
    {
      isSuccess: unblockSuccess,
      error: unblockError,
      isLoading: unblockLoading,
    },
  ] = useToggleBlockRiderMutation();

  useEffect(() => {
    if (unblockSuccess) {
      toast.success("Rider Successfully Unblocked");
    }
  }, [unblockSuccess]);

  useEffect(() => {
    if (unblockError && "data" in unblockError) {
      const { message, status }: any = unblockError;
      if (message) toast.error(message);
      if (status) toast.error(status);
    }
  }, [unblockError]);

  const { userPermissions } = useUserPermissions();

  const currentPageUrl = router.query.current_page ? `currentPage=${router.query.current_page}` : '';
  const handleBackUrl = router.query.fallbackUrl ? router.query.fallbackUrl : `/riders?${currentPageUrl}`;

  return (
    <>
      <AppHead title="Kabukabu | Riders" />
      <AppLayout padding="0">
        <div className="lg:h-screen lg:overflow-hidden p-4">
          <ActionBar handleBack={() => router.push(`${handleBackUrl}`)}>
            {userPermissions && userPermissions.riders_permissions.write && (
              <Button
                title="Call Rider"
                startIcon={<PhoneIcon />}
                size="large"
              />
            )}
            {userPermissions &&
              userPermissions.riders_permissions.write &&
              data &&
              data?.driver.isBlocked === false && (
                <>
                  {
                    user && user!.role === 'principal' &&
                    <Button
                      title="Fund Rider Wallet"
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
                    title="Block Rider"
                    startIcon={<BlockIcon />}
                    size="large"
                    color="secondary"
                    onClick={() => {
                      setModalContent(
                        <BlockRiderConfirmation driverId={String(id)} />
                      );
                    }}
                  />
                </>
              )}
            {data && data?.driver.isBlocked === true && (
              <Button
                title="Unblock Rider"
                startIcon={<BlockIcon />}
                size="large"
                color="secondary"
                loading={unblockLoading}
                disabled={unblockLoading}
                className="!bg-[#1FD11B] !text-[#FFFFFF]"
                onClick={() => {
                  unblockRider({ driverId: String(id), reason: "unblock" });
                }}
              />
            )}
          </ActionBar>

          <ViewRiderLayout
            firstRow={
              <>
                <UserInfoCard
                  {...data?.driver}
                  bg={data?.driver.isBlocked ? "#FEE2E9" : "#FFFFFF"} 
                />
                <FinancialsCard
                  {...data?.financials}
                  bg={data?.driver.isBlocked ? "#FEE2E9" : "#FFFFFF"}
                />
                <NextOfKinCard
                  {...data?.nextOfKin}
                  bg={data?.driver.isBlocked ? "#FEE2E9" : "#FFFFFF"}
                />
              </>
            }
            secondRow={
              <>
                {
                  <div className="my-3">
                    <Card>
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
                                      !onlineMonitorDataLoading && onlineMonitorData?.data &&
                                      <div className="flex flex-col gap-3 p-4">
                                        <div className="flex justify-between">
                                          <p className="font-bold">Total Online Time (Minutes)</p>
                                          <p className="font-bold text-xs">{onlineMonitorData?.data?.totalOnlineTimeInMinutes} minutes</p>
                                        </div>
                                        <div className="flex justify-between">
                                          <p className="font-bold">Total Online Hours</p>
                                          <p className="font-bold text-xs">{onlineMonitorData?.data?.totalOnlineHours.hours}hrs {onlineMonitorData?.data?.totalOnlineHours.minutes}mins</p>
                                        </div>
                                        <div className="flex justify-between">
                                          <p className="font-bold">Total Offline Hours</p>
                                          <p className="font-bold text-xs">{onlineMonitorData?.data?.totalOfflineHours.hours}hrs {onlineMonitorData?.data?.totalOfflineHours.minutes}mins</p>
                                        </div>
                                      </div>
                                    }
                                    {
                                      onlineMonitorData?.data?.trackers?.map((track: any) => (
                                        <div className="flex flex-col mt-2 mb-2 mx-3 p-4 bg-[#F6F6F6] rounded-lg">
                                          <div className="mx-3 flex justify-between">
                                            <p className="mt-1 mb-1 font-bold">{track.type === 'online' ? `${formatTime(track.online_switch_time)} - ${formatTime(track.offline_switch_time)}` : `${formatTime(track.offline_switch_time)} - ${formatTime(track.online_switch_time)}`}</p>
                                            <p className="mt-1 mb-1 font-bold text-xs">{track.type === 'online' ? `Online for ${calculateHoursBetween(track.online_switch_time, track.offline_switch_time)}` : `Offline for ${calculateHoursBetween(track.offline_switch_time, track.online_switch_time)}`}</p>
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
                              <ViewExtendedActivity lastFiveDays={lastFiveDays} />
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
                  tripHistory && (
                    <TripHistoryCard
                      tripHistoryData={tripHistory.data}
                      totalCount={tripHistory.totalCount}
                      currentCount={tripHistory.data.length}
                      handleViewMore={() => {
                        setPageSize((ps) => ps + 5);
                      }}
                    />
                  )}
              </>
            }
          />
        </div>
      </AppLayout>
    </>
  );
};

export default Rider;

