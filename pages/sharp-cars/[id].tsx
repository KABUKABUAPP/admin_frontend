import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import AppLayout from "@/layouts/AppLayout";
import ViewSharpCarLayout from "@/components/modules/sharp-cars/ViewSharpCarLayout";
import ActionBar from "@/components/common/ActionBar";
import UserInfoCard from "@/components/common/UserInfoCard";
import TripHistoryCard from "@/components/common/TripHistoryCard";
import DriverInfoCard from "@/components/common/UserInfoCard";
import CarDetailsCard from "@/components/common/CarDetailsCard";
import GuarantorDetailsCard from "@/components/common/GuarantorDetailsCard";
import Button from "@/components/ui/Button/Button";
import BlockIcon from "@/components/icons/BlockIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import CarDocuments from "@/components/common/CarDocuments";
import FinancialsCard from "@/components/common/FinancialsCard";
import AppHead from "@/components/common/AppHead";
import { useToggleBlockDriverMutation, useViewDriverQuery } from "@/api-services/driversService";
import { useGetDriverTripHistoryQuery } from "@/api-services/tripsService";
import ViewDriverLayout from "@/components/modules/drivers/ViewDriverLayout";
import Card from "@/components/common/Card";
import { capitalizeAllFirstLetters } from "@/utils";
import useUserPermissions from "@/hooks/useUserPermissions";
import ErrorMessage from "@/components/common/ErrorMessage";
import Loader from "@/components/ui/Loader/Loader";
import BlockDriverConfirmation from "@/components/modules/drivers/BlockDriverConfirmation";
import { useModalContext } from "@/contexts/ModalContext";

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

const SharpCar: NextPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { id } = router.query;

  const { data, isLoading, isError, refetch } = useViewDriverQuery(
    { id: String(id) },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
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

  const [
    unblockDriver,
    {
      isLoading: unblockLoading,
      isSuccess: unblockSuccess,
      error: unblockError,
    },
  ] = useToggleBlockDriverMutation();

  const { setModalContent } = useModalContext();

  useEffect(() => {
    if (data) console.log('asdf', data)
  }, [data])

  
  const { userPermissions } = useUserPermissions();
  const currentPageUrl = router.query.current_page ? `currentPage=${router.query.current_page}` : '';
  const handleBackUrl = router.query.fallbackUrl ? router.query.fallbackUrl : `/sharp-cars?${currentPageUrl}`;
  
  return (
    <>
    <AppHead title="Kabukabu | Sharp Cars" />
      <AppLayout padding="0">
        <div className="lg:h-screen lg:overflow-hidden p-4">
          <ActionBar handleBack={() => router.push(`${handleBackUrl}`)}>
            <Button
              title="Call Rider"
              startIcon={<PhoneIcon />}
              size="large"
            />
            {userPermissions &&
              userPermissions.drivers_permissions.write &&
              data &&
              data.driverInfo.isBlocked === false && (
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
                      <div className="flex justify-end py-2">
                        <p><b>User Status: </b>{capitalizeAllFirstLetters(data.onlineStatus)}</p>
                        {data.onlineStatus === 'online' ? <div className="mt-1 mx-2" style={{backgroundColor: '#6BBE66', border: '1px solid #6BBE66', borderRadius: '50%', height: '2vh', width: '1vw'}}></div> : <div className="mt-1 mx-2" style={{backgroundColor: '#9A9A9A', border: '1px solid #9A9A9A', borderRadius: '50%', height: '2vh', width: '1vw'}}></div>}
                      </div>
                      {(data.onlineSwitch || data.offlineSwitch) && 
                      <div className="flex justify-end py-2">
                        {data.onlineStatus === 'online' ?  `Active since ${timeAgo(data.onlineSwitch)}` : `Last active ${timeAgo(data.offlineSwitch)}`}
                      </div>}
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
                    referral_code={""} {...data.driverInfo}
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

export default SharpCar;

