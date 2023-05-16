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

const Staff: NextPage = () => {
  return (
    <AppLayout padding="0">
      <div className="lg:h-screen lg:overflow-hidden p-4">
        <ActionBar>
          <Button
            title="Reset Password"
            size="large"
            startIcon={<LockIcon />}
          />
          <Button
            title="Disable Staff"
            color="secondary"
            size="large"
            startIcon={<BlockIcon />}
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
