import { NextPage } from "next";
import React from "react";

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

const Staff: NextPage = () => {
  const { setModalContent } = useModalContext();

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
          <Button
            title="Disable Staff"
            color="secondary"
            size="large"
            startIcon={<BlockIcon />}
            onClick={handleDisableStaff}
          />
        </ActionBar>

        <ViewStaffLayout
          firstRow={
            <>
              <UserInfoCard
                fullname="John Doe"
                email="jdoe@gmail.com"
                phone="+234 909 888 7655"
                address="30, Ebinpejo Lane, Idumota, Lagos, Nigeia"
                role="Dispute Resolutor"
              />
              <SummaryCard disputesRaised={110} pendingDisputes={0} />
            </>
          }
          secondRow={
            <>
              <ActivityLogCard logs={mockLogs} />
            </>
          }
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
