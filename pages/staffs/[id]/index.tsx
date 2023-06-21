import { NextPage } from "next";
import React, { useEffect } from "react";

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

const Staff: NextPage = () => {
  const { setModalContent } = useModalContext();
  const { id } = useRouter().query;
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

  return (
    <AppLayout padding="0">
      <div className="lg:h-screen lg:overflow-hidden p-4">
        <ActionBar>
          <Button
            title="Reset Password"
            size="large"
            startIcon={<LockIcon />}
            onClick={handleResetPassword}
          />
          {data && data.isBlocked === false && (
            <Button
              title="Disable Staff"
              color="secondary"
              size="large"
              startIcon={<BlockIcon />}
              onClick={handleDisableStaff}
            />
          )}
          {data && data.isBlocked === true && (
            <Button
              title="Enable Staff"
              color="secondary"
              size="large"
              loading={enableStaffLoading}
              disabled={enableStaffLoading}
              startIcon={<BlockIcon />}
              className="!bg-[#1FD11B] !text-[#FFFFFF]"
              onClick={()=>{
                enableStaff({staffId: String(id)})
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
                />
              )}
              {/* <SummaryCard disputesRaised={110} pendingDisputes={0} /> */}
            </>
          }
          secondRow={<>{/* <ActivityLogCard logs={mockLogs} /> */}</>}
        />
      </div>
    </AppLayout>
  );
};

export default Staff;

const mockLogs = [
  {
    title: "John Doe sent a trip to the dispatch",
    date: "Today at 2:30pm",
  },
  {
    title: "John Doe sent a trip to the dispatch",
    date: "Today at 2:30pm",
  },
  {
    title: "John Doe sent a trip to the dispatch",
    date: "Today at 2:30pm",
  },
  {
    title: "John Doe sent a trip to the dispatch",
    date: "Today at 2:30pm",
  },
  {
    title: "John Doe sent a trip to the dispatch",
    date: "Today at 2:30pm",
  },
  {
    title: "John Doe sent a trip to the dispatch",
    date: "Today at 2:30pm",
  },
  {
    title: "John Doe sent a trip to the dispatch",
    date: "Today at 2:30pm",
  },
  {
    title: "John Doe sent a trip to the dispatch",
    date: "Today at 2:30pm",
  },
  {
    title: "John Doe sent a trip to the dispatch",
    date: "Today at 2:30pm",
  },
];
