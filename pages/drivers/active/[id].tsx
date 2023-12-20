import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

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
import { capitalizeAllFirstLetters } from "@/utils";
import Card from "@/components/common/Card";

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


const Driver: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading, isError, refetch } = useViewDriverQuery(
    { id: String(id) },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const { setModalContent } = useModalContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

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
