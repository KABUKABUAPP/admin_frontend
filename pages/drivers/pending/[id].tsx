import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import ViewDriverLayout from "@/components/modules/drivers/ViewDriverLayout";
import DriverInfoCard from "@/components/common/UserInfoCard";
import CarDetailsCard from "@/components/common/CarDetailsCard";
import GuarantorDetailsCard from "@/components/common/GuarantorDetailsCard";
import CarDocuments from "@/components/common/CarDocuments";
import { useRouter } from "next/router";
import { useViewDriverQuery } from "@/api-services/driversService";
import Loader from "@/components/ui/Loader/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import CheckIcon from "@/components/icons/CheckIcon";
import TimesIcon from "@/components/icons/TimesIcon";
import ApproveRequestCard from "@/components/modules/drivers/ApproveRequestCard";
import DeclineRequestCard from "@/components/modules/drivers/DeclineRequestCard";
import { useModalContext } from "@/contexts/ModalContext";
import ActionDocumentCardContainer from "@/components/modules/drivers/ActionDocumentCardContainer";
import useUserPermissions from "@/hooks/useUserPermissions";
import AppHead from "@/components/common/AppHead";
import { useGetDriverSettingsQuery } from "@/api-services/settingsService";
import UpdateOnboardStatus from "@/components/modules/drivers/UpdateOnboardStatus";

const Driver: NextPage = () => {
  const router = useRouter();
  const { setModalContent } = useModalContext();

  const { id } = router.query;
  const inspectionCode = router.query.inspection_code;
  const onboardStatus = router.query.onboardStatus;

  const { data, isLoading, isError, refetch } = useViewDriverQuery(
    { id: String(id) },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const {
    data: driversSettings,
    isLoading: settingsLoading,
    isError: settingsError,
    refetch: reloadSettings,
  } = useGetDriverSettingsQuery({})

  const [isApproveButton, setIsApproveButton] = useState(false);
  const [isDeclineButton, setIsDeclineButton] = useState(false);

  useEffect(() => {
    if (data) {
      const allowApprove = data.carDocs.documents.every(
        (d: any) => d.status === "APPROVED"
      );
      const allowDecline = data.carDocs.documents.some(
        (d: any) => d.status === "DECLINED"
      );

      if (allowApprove) setIsApproveButton(true);
      else {
        setIsApproveButton(false);
      }

      if (allowDecline) setIsDeclineButton(true);
      else setIsDeclineButton(false);
    }
  }, [JSON.stringify(data)]);

  const { userPermissions } = useUserPermissions();
  
  const currentPageUrl = `/drivers/pending?currentPage=${router.query.current_page}${onboardStatus ? `&onboardStatus=${onboardStatus}` : ''}`
  const handleBackUrl = router.query.fallbackUrl ? router.query.fallbackUrl : `${currentPageUrl}`;

  return (
    <>
      <AppHead title="Kabukabu | Drivers" />
      <AppLayout padding="0">
        <div className="lg:h-screen lg:overflow-hidden p-4">
          <ActionBar handleBack={() => router.push(`${handleBackUrl}`)}>
            <Button
              title="Update Onboarding Step"
              className="!bg-[#1FD11B] !text-[#FFFFFF]"
              startIcon={<CheckIcon />}
              size="large"
              onClick={() => {
                setModalContent(<UpdateOnboardStatus onboardStepsData={driversSettings?.driver_onboarding_steps} />)
              }}
            />
            {userPermissions &&
              userPermissions.drivers_permissions.write &&
              data &&
              data.guarantor.responseStatus === "approved" &&
              isApproveButton && (
                <Button
                  title="Approve Request"
                  className="!bg-[#1FD11B] !text-[#FFFFFF]"
                  startIcon={<CheckIcon />}
                  size="large"
                  onClick={() => {
                    setModalContent(<ApproveRequestCard id={String(id)} />)
                  }}
                />
              )}
            {userPermissions &&
              userPermissions.drivers_permissions.write &&
              isDeclineButton && (
                <Button
                  title="Decline Request"
                  startIcon={<TimesIcon />}
                  size="large"
                  color="secondary"
                  onClick={() => {
                    setModalContent(<DeclineRequestCard id={String(id)} />);
                  }}
                />
              )}
          </ActionBar>

          {data && !isLoading && !isError && (
            <ViewDriverLayout
              firstRow={
                <>
                  <DriverInfoCard referral_code={data?.driverInfo?.referralCode} {...data.driverInfo} inspectionCode={inspectionCode} />

                  <CarDetailsCard
                    {...data.carDetails}
                    bg={data.driverInfo.isBlocked ? "#FEE2E9" : "#FFFFFF"}
                  />

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
    </>
  );
};

export default Driver;
