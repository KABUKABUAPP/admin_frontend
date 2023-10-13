import { NextPage } from "next";
import React, { useState } from "react";
import { useRouter } from "next/router";

import AppLayout from "@/layouts/AppLayout";
import ViewHubLayout from "@/components/modules/hubs/ViewHubLayout";
import Button from "@/components/ui/Button/Button";
import ActionBar from "@/components/common/ActionBar";
import TrashIcon from "@/components/icons/TrashIcon";
import CarDescriptionContainer from "@/components/modules/hubs/CarDescriptionContainer";
import InspectionCenterDetails from "@/components/modules/hubs/InspectionCenterDetails";
import SummaryCard from "@/components/modules/hubs/SummaryCard";
import InspectorCard from "@/components/modules/hubs/InspectorCard";
import { useViewHubQuery } from "@/api-services/hubService";
import Loader from "@/components/ui/Loader/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import DeleteHubCard from "@/components/modules/hubs/DeleteHubCard";
import { useModalContext } from "@/contexts/ModalContext";
import { useGetCarInspectionHistoryQuery } from "@/api-services/hubService";
import { useGetCarsInHubQuery } from "@/api-services/hubService";
import AppHead from "@/components/common/AppHead";

const Hub: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { setModalContent } = useModalContext();
  const { data, isLoading, isError, refetch } = useViewHubQuery(
    { hubId: String(id) },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const [currentPageInspectors, setCurrentPageInspectors] = useState(1);
  const [pageSizeInspectors, setPageSizeInspectors] = useState(5);
  const {
    data: carInspection,
    isLoading: carInspectionLoading,
    isError: carInspectionError,
    refetch: refetchCarInspection,
  } = useGetCarInspectionHistoryQuery(
    {
      id: String(id),
      status: "approved",
      limit: pageSizeInspectors,
      page: currentPageInspectors,
    },
    { skip: !id }
  );

  const [currentPageHubs, setCurrentPageHubs] = useState(1);
  const [pageSizeHubs, setPageSizeHubs] = useState(5);
  const {
    data: carHubs,
    isLoading: carHubsLoading,
    isError: carHubsError,
    refetch: refetchCarHubs,
  } = useGetCarsInHubQuery(
    {
      id: String(id),
      status: "approved",
      limit: pageSizeHubs,
      page: currentPageHubs,
    },
    { skip: !id }
  );

  return (
    <>
      <AppHead title="Kabukabu | Hubs" />
      <AppLayout padding="0">
        <div className="lg:h-screen lg:overflow-hidden p-4">
          <ActionBar>
            <Button
              title="Delete Hub"
              size="large"
              color="secondary"
              startIcon={<TrashIcon />}
              onClick={() =>
                setModalContent(
                  <DeleteHubCard handleClose={() => setModalContent(null)} />
                )
              }
            />
          </ActionBar>

          <ViewHubLayout
            mainComponents={
              <div className="flex flex-col gap-4 pb-4">
                <CarDescriptionContainer
                  title="Car inspection history"
                  cars={carInspection?.data}
                  isLoading={carInspectionLoading}
                  isError={carInspectionError}
                  refetch={refetchCarInspection}
                  totalCount={carInspection?.totalCount}
                  handleViewCount={(count) => {
                    setPageSizeInspectors(count);
                  }}
                />

                <CarDescriptionContainer
                  title="Cars in hub"
                  cars={carHubs?.data}
                  isLoading={carHubsLoading}
                  isError={carHubsError}
                  refetch={refetchCarHubs}
                  totalCount={carHubs?.totalCount}
                  handleViewCount={(count) => {
                    setPageSizeHubs(count);
                  }}
                />
              </div>
            }
            asideComponents={
              <div className="flex flex-col gap-4">
                {data && !isLoading && !isError && (
                  <>
                    <InspectionCenterDetails
                      id={data.inspectionCenterId}
                      inspectorId={data.inspectorId}
                      images={data.hubCars}
                      inspector={data.inspectorFullname}
                      addedOn={data.inspectionCenterDateAdded}
                      location={data.inspectorAddress}
                      title={data.inspectionCenterTitle}
                    />
                    <SummaryCard
                      approved={data.approved}
                      declined={data.declined}
                      processed={data.processed}
                    />
                    <InspectorCard
                      fullName={data.inspectorFullname}
                      address={data.inspectorAddress}
                      phone={data.inspectorPhone}
                      inspectorId={data.inspectorId}
                    />
                  </>
                )}
              </div>
            }
          />

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

export default Hub;
