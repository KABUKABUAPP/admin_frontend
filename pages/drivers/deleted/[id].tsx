import { NextPage } from "next";
import React, { useState, useEffect } from "react";

import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import ViewDriverLayout from "@/components/modules/drivers/ViewDriverLayout";
import DriverInfoCard from "@/components/common/UserInfoCard";
import GuarantorDetailsCard from "@/components/common/GuarantorDetailsCard";
import CarDocuments from "@/components/common/CarDocuments";
import { useRouter } from "next/router";
import {
  useReactivateDriverMutation,
  useViewDriverQuery,
} from "@/api-services/driversService";
import Loader from "@/components/ui/Loader/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import useUserPermissions from "@/hooks/useUserPermissions";
import AppHead from "@/components/common/AppHead";
import AppLayout from "@/layouts/AppLayout";
import ReactivateIcon from "@/components/icons/ReactivateIcon";
import CarDetailsCard from "@/components/common/CarDetailsCard";
import FinancialsCard from "@/components/common/FinancialsCard";
import TripHistoryCard from "@/components/common/TripHistoryCard";
import { useGetDriverTripHistoryQuery } from "@/api-services/tripsService";
import { toast } from "react-toastify";

const DeletedDriver: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading, isError, refetch } = useViewDriverQuery(
    { id: String(id) },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

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

  const { userPermissions } = useUserPermissions();

  const [
    reactivateDriver,
    {
      isLoading: reactivateLoading,
      error: reactivateError,
      isSuccess: reactivateSuccess,
    },
  ] = useReactivateDriverMutation();

  useEffect(()=>{
    if(reactivateError && "data" in reactivateError){
      const { message }:any = reactivateError
      toast.error(message)
    }
  }, [reactivateError])

  useEffect(()=>{
    if(reactivateSuccess){
      toast.success('Driver Reactivation Successful')
      router.push(`/drivers/active/${String(id)}`)
    }
  }, [reactivateSuccess])

  return (
    <>
      <AppHead title="Kabukabu | Drivers" />
      <AppLayout padding="0">
        <div className="lg:h-screen lg:overflow-hidden p-4">
          <ActionBar handleBack={() => router.push(`/drivers/deleted?currentPage=${router.query.current_page}`)}>
            {userPermissions && userPermissions.drivers_permissions.write && (
              <Button
                title="Reactivate Account"
                startIcon={<ReactivateIcon />}
                size="large"
                className="!bg-[#1FD11B] !text-[#FFFFFF]"
                loading={reactivateLoading}
                disabled={reactivateLoading}
                onClick={() => {
                  reactivateDriver({ driverId: String(id) });
                }}
              />
            )}
          </ActionBar>

          {data && !isLoading && !isError && (
            <ViewDriverLayout
              secondRow={
                <>
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
                  <DriverInfoCard referral_code={""} {...data.driverInfo} bg="#F1F1F1" />

                  <CarDetailsCard {...data.carDetails} bg="#F1F1F1" />

                  <FinancialsCard {...data.financials} bg="#F1F1F1" />

                  <GuarantorDetailsCard {...data.guarantor} bg="#F1F1F1" />

                  <CarDocuments {...data.carDocs} bg="#F1F1F1" />
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

export default DeletedDriver;
