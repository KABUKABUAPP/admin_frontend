import React, { FC } from "react";

import AppLayout from "@/layouts/AppLayout";
import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import PhoneIcon from "@/components/icons/PhoneIcon";
import ViewInspectorLayout from "@/components/modules/inspectors/ViewInspectorLayout";
import UserInfoCard from "@/components/common/UserInfoCard";
import SummaryCard from "@/components/modules/inspectors/SummaryCard";
import CarsInHubCard from "@/components/modules/inspectors/CarsInHubCard";
import InspectionHistory from "@/components/modules/inspectors/InspectionHistory";
import { useViewInspectorQuery } from "@/api-services/inspectorsService";
import { useRouter } from "next/router";
import Loader from "@/components/ui/Loader/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import useUserPermissions from "@/hooks/useUserPermissions";
import AppHead from "@/components/common/AppHead";

const Inspector: FC = () => {
  const { id } = useRouter().query;

  const { data, isError, isLoading, refetch } = useViewInspectorQuery(
    { inspectorId: String(id) },
    { skip: !id, refetchOnReconnect: true, refetchOnMountOrArgChange: true }
  );

  const { userPermissions } = useUserPermissions();

  return (
    <>
      <AppHead title="Kabukabu | Inspectors" />
      <AppLayout padding="0">
        <div className="lg:h-screen lg:overflow-hidden p-4">
          <ActionBar>
            {userPermissions &&
              (userPermissions.inspectors_permissions.read ||
                userPermissions.inspectors_permissions.write) && (
                <Button title="Call Inspector" startIcon={<PhoneIcon />} />
              )}
          </ActionBar>

          {data && !isLoading && !isError && (
            <ViewInspectorLayout
              asideComponents={
                <div className="flex flex-col gap-4">
                  <UserInfoCard
                    fullName={data.fullname}
                    address={data.address}
                    email={data.email}
                    phone={data.phone}
                    totalCarsProcessed={data.totalCarsProcessed}
                  />
                  <SummaryCard
                    approved={data.approved}
                    declined={data.declined}
                    carsInHub={data.carsInHub}
                  />

                  <div className="flex justify-between max-sm:flex-col gap-3">
                    <Button
                      title="View Approved Cars"
                      variant="contained"
                      color="tetiary"
                      className="w-full !text-sm"
                    />
                    <Button
                      title="View Declined Cars"
                      variant="contained"
                      color="tetiary"
                      className="w-full !text-sm"
                    />
                  </div>
                </div>
              }
              mainComponents={<InspectionHistory />}
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

export default Inspector;
