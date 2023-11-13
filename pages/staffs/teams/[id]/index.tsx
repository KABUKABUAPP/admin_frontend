import { NextPage } from "next";
import React, { useEffect } from "react";

import AppLayout from "@/layouts/AppLayout";
import ViewStaffLayout from "@/components/modules/teams/ViewStaffLayout";
import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import ActivityLogCard from "@/components/modules/teams/ActivityLogCard";
import { useModalContext } from "@/contexts/ModalContext";
import { useViewTeamQuery, useDeleteTeamMutation } from "@/api-services/teamService";
import { useRouter } from "next/router";
import Loader from "@/components/ui/Loader/Loader";
import useUserPermissions from "@/hooks/useUserPermissions";
import AppHead from "@/components/common/AppHead";
import TrashIcon from "@/components/icons/TrashIcon";
import TeamInfoCard from "@/components/common/TeamInfoCard";
import AudienceOnboarded from "@/components/common/AudeinceOnboarded";
import { toast } from "react-toastify";

const Staff: NextPage = () => {
  const { setModalContent } = useModalContext();
  const router = useRouter();
  const { id } = useRouter().query;
  const { data, isLoading, error, refetch } = useViewTeamQuery(
    { teamId: String(id) },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const [deleteTeam, { isSuccess, isLoading: teamDeleteLoading, error: teamDeleteError }] = useDeleteTeamMutation();

  const handleTeamDelete = () => {
    deleteTeam({staffId: String(id)})
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Team Deleted Successfully');
      window.location.href = "/staffs/teams"
    };

    if (teamDeleteError) {
      toast.error('Error Encountered, Please Try Again')
    }
  }, [isSuccess, teamDeleteError])

  const { userPermissions } = useUserPermissions();

  return (
    <>
      <AppHead title="Kabukabu | Staff" />
      <AppLayout padding="0">
        <div className="lg:h-screen lg:overflow-hidden p-4">
          <ActionBar handleBack={() => router.push(`/staffs/teams?currentPage=${router.query.current_page}`)}>            
            <Button
              title="Delete Team"
              color="secondary"
              variant="outlined"
              size="large"
              startIcon={<TrashIcon fill="#FFF"/>}
              className="!text-[#FFF] bg-[#EF2C5B]"
              onClick={handleTeamDelete}
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
            secondRow={<ActivityLogCard />}
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
