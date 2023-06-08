import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import ViewDriverLayout from "@/components/modules/drivers/ViewDriverLayout";
import DriverInfoCard from "@/components/common/UserInfoCard";
import CarDetailsCard from "@/components/common/CarDetailsCard";
import FinancialsCard from "@/components/common/FinancialsCard";
import GuarantorDetailsCard from "@/components/common/GuarantorDetailsCard";
import CarDocuments from "@/components/common/CarDocuments";
import TripHistoryCard from "@/components/common/TripHistoryCard";
import { useRouter } from "next/router";
import { useViewDriverQuery } from "@/api-services/driversService";
import Loader from "@/components/ui/Loader/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import CheckIcon from "@/components/icons/CheckIcon";
import TimesIcon from "@/components/icons/TimesIcon";
import ApproveRequestCard from "@/components/modules/drivers/ApproveRequestCard";
import DeclineRequestCard from "@/components/modules/drivers/DeclineRequestCard";
import { useModalContext } from "@/contexts/ModalContext";
import ApproveSuccessCard from "@/components/modules/drivers/ApproveSuccessCard";
import { useApproveDeclineDriverMutation } from "@/api-services/driversService";
import ActionDocumentCard from "@/components/modules/drivers/ActionDocumentCard";
import ActionDocumentCardContainer from "@/components/modules/drivers/ActionDocumentCardContainer";
import DeclineSuccessCard from "@/components/modules/drivers/DeclineSuccessCard";

const Driver: NextPage = () => {
  const router = useRouter();
  const { setModalContent } = useModalContext();

  const { id } = router.query;

  const { data, isLoading, isError, refetch } = useViewDriverQuery(
    { id: String(id) },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const [
    approveRequest,
    {
      data: approvedData,
      isSuccess: approvedSuccess,
      error: approvedError,
      isLoading: approvedLoading,
    },
  ] = useApproveDeclineDriverMutation();

  const [
    declineRequest,
    {
      data: declinedData,
      isSuccess: declinedSuccess,
      isLoading: declinedLoading,
    },
  ] = useApproveDeclineDriverMutation();

  console.log("main", declinedLoading);

  useEffect(() => {
    if (approvedSuccess) {
      setModalContent(<ApproveSuccessCard />);
    }
  }, [approvedSuccess]);

  useEffect(() => {
    if (declinedSuccess) {
      setModalContent(<DeclineSuccessCard />);
    }
  }, [declinedSuccess]);

  const [isApproveButton, setIsApproveButton] = useState(false);
  const [isDeclineButton, setIsDeclineButton] = useState(false);

  useEffect(() => {
    if (data) {
      const allowApprove = data.carDocs.documents.every(
        (d) => d.status === "APPROVE"
      );
      const allowDecline = data.carDocs.documents.some(
        (d) => d.status === "DECLINED"
      );

      if (allowApprove) setIsApproveButton(true);
      else {
        setIsApproveButton(false);
      }

      if (allowDecline) setIsDeclineButton(true);
      else setIsDeclineButton(false);
    }
  }, [JSON.stringify(data)]);

  return (
    <AppLayout padding="0">
      <div className="lg:h-screen lg:overflow-hidden p-4">
        <ActionBar>
          {isApproveButton && (
            <Button
              title="Approve Request"
              className="!bg-[#1FD11B] !text-[#FFFFFF]"
              startIcon={<CheckIcon />}
              size="large"
              onClick={() =>
                setModalContent(
                  <ApproveRequestCard
                    handleClose={() => setModalContent(null)}
                    handleApprove={() => {
                      if (data)
                        approveRequest({
                          driverId: data?.driverInfo.id,
                          status: "approve",
                        });
                    }}
                    isLoading={approvedLoading}
                  />
                )
              }
            />
          )}
          {isDeclineButton && (
            <Button
              title="Decline Request"
              startIcon={<TimesIcon />}
              size="large"
              color="secondary"
              onClick={() => {
                setModalContent(
                  <DeclineRequestCard
                    isLoading={declinedLoading}
                    handleClose={() => setModalContent(null)}
                    handleDecline={(reason) => {
                      if (data)
                        declineRequest({
                          driverId: data?.driverInfo.id,
                          reason: reason,
                          status: "decline",
                        });
                    }}
                  />
                );
              }}
            />
          )}
        </ActionBar>

        {data && !isLoading && !isError && (
          <ViewDriverLayout
            firstRow={
              <>
                <DriverInfoCard {...data.driverInfo} />

                <GuarantorDetailsCard {...data.guarantor} />

                <CarDocuments {...data.carDocs} />
              </>
            }
            secondRow={
              <ActionDocumentCardContainer data={data.carDocs.documents} />
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
  );
};

export default Driver;
