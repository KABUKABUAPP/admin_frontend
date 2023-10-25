import { NextPage } from "next";
import React, { useEffect } from "react";

import AppLayout from "@/layouts/AppLayout";
import ViewStaffLayout from "@/components/modules/teams/ViewStaffLayout";
import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import BlockIcon from "@/components/icons/BlockIcon";
import LockIcon from "@/components/icons/LockIcon";
import UserInfoCard from "@/components/common/UserInfoCard";
import SummaryCard from "@/components/modules/teams/SummaryCard";
import ActivityLogCard from "@/components/modules/teams/ActivityLogCard";
import { useModalContext } from "@/contexts/ModalContext";
import ResetPasswordCard from "@/components/modules/teams/ResetPasswordCard";
import ResetPasswordNotification from "@/components/modules/teams/ResetPasswordNotification";
import DisabledStaffCard from "@/components/modules/teams/DisabledStaffCard";
import { useViewTeamQuery } from "@/api-services/teamService";
import { useRouter } from "next/router";
import { useDisableStaffMutation } from "@/api-services/staffService";
import { toast } from "react-toastify";
import Loader from "@/components/ui/Loader/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import useUserPermissions from "@/hooks/useUserPermissions";
import AppHead from "@/components/common/AppHead";
import TrashIcon from "@/components/icons/TrashIcon";
import TeamInfoCard from "@/components/common/TeamInfoCard";
import AudienceOnboarded from "@/components/common/AudeinceOnboarded";

const Staff: NextPage = () => {
  const { setModalContent } = useModalContext();
  const { id } = useRouter().query;
  const { data, isLoading, error, refetch } = useViewTeamQuery(
    { teamId: String(id) },
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

  const { userPermissions } = useUserPermissions();

  return (
    <>
      <AppHead title="Kabukabu | Staff" />
      <AppLayout padding="0">
        <div className="lg:h-screen lg:overflow-hidden p-4">
          <ActionBar>            
            <Button
              title="Delete Team"
              color="secondary"
              variant="outlined"
              size="large"
              startIcon={<TrashIcon fill="#FFF"/>}
              className="!text-[#FFF] bg-[#EF2C5B]"
              //onClick={handleDisableStaff}
            />              
          </ActionBar>

          <ViewStaffLayout
            firstRow={
              <>
                {data && !isLoading && !error && (
                  <TeamInfoCard />
                )}
                {!data && !error && isLoading && (
                  <div className="flex items-center justify-center">
                    <Loader />
                  </div>
                )}
                {/*{!data && error && !isLoading && (
                  <div className="flex items-center justify-center flex-col gap-3">
                    <ErrorMessage message="Oops! Something went wrong" />
                    <Button title="Refetch" onClick={refetch} />
                  </div>
                )}*/}
                {<AudienceOnboarded /> }
              </>
            }
            /*{secondRow={data && <>{ <ActivityLogCard logs={data.activityLogs} />}</>}}*/
          />
        </div>
      </AppLayout>
    </>
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
