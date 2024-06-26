import { NextPage } from "next";
import React, { useEffect, useState } from "react";

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

const Rider: NextPage = () => {
  const { user } = useUserContext();
  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading, isError } = useViewRiderQuery(
    { id: String(id), status: "" },
    { skip: !id, refetchOnReconnect: true, refetchOnMountOrArgChange: true }
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
                  referral_code={""} 
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

