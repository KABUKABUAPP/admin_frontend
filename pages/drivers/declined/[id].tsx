import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import React from "react";

import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import PhoneIcon from "@/components/icons/PhoneIcon";
import BlockIcon from "@/components/icons/BlockIcon";
import ViewDriverLayout from "@/components/modules/drivers/ViewDriverLayout";
import DriverInfoCard from "@/components/common/UserInfoCard";
import GuarantorDetailsCard from "@/components/common/GuarantorDetailsCard";
import CarDocuments from "@/components/common/CarDocuments";
import { useRouter } from "next/router";
import { useViewDriverQuery } from "@/api-services/driversService";
import Loader from "@/components/ui/Loader/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import useUserPermissions from "@/hooks/useUserPermissions";
import AppHead from "@/components/common/AppHead";

const Driver: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading, isError, refetch } = useViewDriverQuery(
    { id: String(id) },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const { userPermissions } = useUserPermissions();

  return (
    <>
    <AppHead title="Kabukabu | Drivers" />
    <AppLayout padding="0">
      <div className="lg:h-screen lg:overflow-hidden p-4">
        <ActionBar>
          {userPermissions && userPermissions.drivers_permissions.write && (
            <Button
              title="Call Driver"
              startIcon={<PhoneIcon />}
              size="large"
            />
          )}
          {/* <Button
            title="Block Driver"
            startIcon={<BlockIcon />}
            size="large"
            color="secondary"
          /> */}
        </ActionBar>

        {data && !isLoading && !isError && (
          <ViewDriverLayout
            firstRow={
              <>
                <DriverInfoCard {...data.driverInfo} bg="#FEE2E9" />

                <GuarantorDetailsCard {...data.guarantor} bg="#FEE2E9" />

                <CarDocuments {...data.carDocs} bg="#FEE2E9" />
              </>
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

