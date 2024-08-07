import { NextPage } from "next";
import React, { useEffect, useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import ViewStaffLayout from "@/components/modules/staff/ViewStaffLayout";
import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import BlockIcon from "@/components/icons/BlockIcon";
import LockIcon from "@/components/icons/LockIcon";
import UserInfoCard from "@/components/common/UserInfoCard";
import SummaryCard from "@/components/modules/staff/SummaryCard";
import ActivityLogCard from "@/components/modules/staff/ActivityLogCard";
import { useModalContext } from "@/contexts/ModalContext";
import ResetPasswordCard from "@/components/modules/staff/ResetPasswordCard";
import ResetPasswordNotification from "@/components/modules/staff/ResetPasswordNotification";
import DisabledStaffCard from "@/components/modules/staff/DisabledStaffCard";
import { useViewStaffQuery } from "@/api-services/staffService";
import { useRouter } from "next/router";
import { useDisableStaffMutation } from "@/api-services/staffService";
import { toast } from "react-toastify";
import Loader from "@/components/ui/Loader/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import useUserPermissions from "@/hooks/useUserPermissions";
import AppHead from "@/components/common/AppHead";
import TrashIcon from "@/components/icons/TrashIcon";
import EditIcon from "@/components/icons/EditIcon";
import Card from "@/components/common/Card";
import EditStaffModal from "@/components/modules/staff/EditStaffModal";

const Staff: NextPage = () => {
  const { setModalContent } = useModalContext();
  const [onboardListData, setOnboardListData] = useState<any>()
  const [onboardDropdownData, setOnboardDropdownData] = useState<any>()
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, error, refetch } = useViewStaffQuery(
    { staffId: String(id) },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const [
    enableStaff,
    {
      isLoading: enableStaffLoading,
      error: enableStaffError,
      isSuccess: enableStaffSuccess,
    },
  ] = useDisableStaffMutation();

  useEffect(() => {
    if (enableStaffSuccess) {
      toast.success("Staff Successfully Enabled");
    }
  }, [enableStaffSuccess]);

  useEffect(() => {
    if (enableStaffError && "data" in enableStaffError) {
      const { message, status }: any = enableStaffError;
      if (message) toast.error(message);
      if (status) toast.error(status);
    }
  }, [enableStaffError]);

  useEffect(() => {
    if (data) {
      console.log({data})
      setOnboardListData(data.onboardDataList.total_drivers_onboarded_list)
    }
  }, [data])

  const handleResetPassword = () => {
    setModalContent(
      <ResetPasswordCard handleClose={() => setModalContent(null)} />
    );
  };

  const handleDisableStaff = () => {
    setModalContent(
      <DisabledStaffCard handleClose={() => setModalContent(null)} />
    );
  };

  const { userPermissions } = useUserPermissions();

  const handleOnboardListChange = (e: any) => {
    switch (e) {
      case 'today':
        if (data) setOnboardListData(data.onboardDataList.total_drivers_onboarded_today_list)
        break;
    
      case 'this_week':
        if (data) setOnboardListData(data.onboardDataList.total_drivers_onboarded_this_week_list)
        break;
    
      case 'this_month':
        if (data) setOnboardListData(data.onboardDataList.total_drivers_onboarded_this_month_list)
        break;
    
      case 'all':
        if (data) setOnboardListData(data.onboardDataList.total_drivers_onboarded_list)
        break;
    
      default:
        break;
    }
  }

  return (
    <>
      <AppHead title="Kabukabu | Staff" />
      <AppLayout padding="0">
        <div className="lg:h-screen lg:overflow-hidden p-4">
          <ActionBar handleBack={() => router.push(`/staffs?currentPage=${router.query.current_page}`)}>
            {data && userPermissions && userPermissions.staffs_permissions.write && (
              <Button
                title="Edit Account"
                size="large"
                startIcon={<EditIcon />}
                variant="outlined"
                className="!text-[#000] border-[#FFBF00]"
                onClick={() => {
                  setModalContent(<EditStaffModal currentData={data?.userInfo} handleClose={() => setModalContent(null)} />)
                }}
              />
            )}
            {userPermissions && userPermissions.staffs_permissions.write && (
              <Button
                title="Reset Password"
                size="large"
                startIcon={<LockIcon />}
                onClick={handleResetPassword}
              />
            )}
            {userPermissions &&
              userPermissions.staffs_permissions.write &&
              data &&
              data.isBlocked === false && (
                <Button
                  title="Disable Staff"
                  color="secondary"
                  variant="outlined"
                  size="large"
                  startIcon={<BlockIcon fill="#EF2C5B"/>}
                  className="!text-[#EF2C5B]"
                  onClick={handleDisableStaff}
                />
              )}
            {userPermissions &&
              userPermissions.staffs_permissions.write &&
              data &&
              data.isBlocked === true && (
                <Button
                  title="Enable Staff"
                  color="secondary"
                  size="large"
                  loading={enableStaffLoading}
                  disabled={enableStaffLoading}
                  startIcon={<BlockIcon />}
                  className="!bg-[#1FD11B] !text-[#FFFFFF]"
                  onClick={() => {
                    enableStaff({ staffId: String(id) });
                  }}
                />
              )}
          </ActionBar>

          <ViewStaffLayout
            firstRow={
              <>
                {data && !isLoading && !error && (
                  <UserInfoCard
                    {...data.userInfo}
                    bg={data.isBlocked === true ? "#FEE2E9" : "#FFFFFF"}
                    referralHistory={data.onboardDataList.total_drivers_onboarded_list.data.concat(data.onboardDataList.total_riders_onboarded_list.data)}
                  />
                )}
                {!data && !error && isLoading && (
                  <div className="flex items-center justify-center">
                    <Loader />
                  </div>
                )}
                {!data && error && !isLoading && (
                  <div className="flex items-center justify-center flex-col gap-3">
                    <ErrorMessage message="Oops! Something went wrong" />
                    <Button title="Refetch" onClick={refetch} />
                  </div>
                )}
                {data && <SummaryCard disputesRaised={data.disputeData.total} pendingDisputes={data.disputeData.pending} totalOnboarded={data.onboardData.total_drivers_onboarded}  totalOnboardToday={data.onboardData.total_onboarded_today} totalOnboardWeek={data.onboardData.total_onboarded_this_week} totalOnboardMonth={data.onboardData.total_onboarded_this_month} totalRidersOnboarded={data.onboardData.total_riders_onboarded}  totalRidersOnboardToday={data.onboardData.total_riders_onboarded_today} totalRidersOnboardWeek={data.onboardData.total_riders_onboarded_this_week} totalRidersOnboardMonth={data.onboardData.total_riders_onboarded_this_month} userRole={data.userInfo.role} />}
              </>
            }
            secondRow={data && <>{ <ActivityLogCard logs={data.activityLogs} userRole={data.userInfo.role} onboardList={onboardListData} staffName={data.userInfo.fullName} onboardDropdownData={onboardDropdownData} handleChange={handleOnboardListChange} />}</>}
          />
        </div>
      </AppLayout>
    </>
  );
};

export default Staff;

