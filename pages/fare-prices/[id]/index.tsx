import { NextPage } from "next";
import React from "react";

import AppLayout from "@/layouts/AppLayout";
import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import SurgeIcon from "@/components/icons/SurgeIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import ViewFarePriceLayout from "@/components/modules/fare-prices/ViewFarePriceLayout";
import FareDetailsCard from "@/components/modules/fare-prices/FareDetailsCard";
import FarePriceCard from "@/components/modules/fare-prices/FarePriceCard";
import { useModalContext } from "@/contexts/ModalContext";
import StartSurgeCard from "@/components/modules/fare-prices/StartSurgeCard";
import { useRouter } from "next/router";
import { useViewFarePriceQuery } from "@/api-services/farePricesService";
import Loader from "@/components/ui/Loader/Loader";
import EditDriverFeeForm from "@/components/modules/fare-prices/EditDriverFeeForm";
import EditNormalFeesForm from "@/components/modules/fare-prices/EditNormalFeesForm";

const FarePrice: NextPage = () => {
  const { setModalContent } = useModalContext();
  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading, isError, refetch } = useViewFarePriceQuery(
    { id: id as string },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const handleSurge = () => {
    setModalContent(
      <StartSurgeCard handleClose={() => setModalContent(null)} />
    );
  };

  return (
    <AppLayout padding="0">
      <div className="lg:h-screen lg:overflow-hidden p-4">
        <ActionBar>
          {data && (
            <Button
              title={
                data.data.surge_status === true ? "End Surge" : "Start Surge"
              }
              size="large"
              color="tetiary"
              startIcon={<SurgeIcon />}
              onClick={handleSurge}
            />
          )}
          <Button
            title="Delete Profile"
            size="large"
            color="secondary"
            startIcon={<TrashIcon />}
          />
        </ActionBar>
        {isLoading && !data && !isError && (
          <div className="pt-6 flex justify-center w-full">
            <Loader size="medium" />
          </div>
        )}
        {!data && isError && !isLoading && (
          <div className="flex flex-col items-center gap-3 pt-6">
            <p className="text-rose-600">Oops! Something went wrong</p>
            <div>
              <Button title="Reload" onClick={refetch} />
            </div>
          </div>
        )}
        {data && !isLoading && !isError && (
          <ViewFarePriceLayout
            asideComponents={
              <FareDetailsCard
                fareId={`#${data.data._id}`}
                fareLocation={`${data.data.state}, ${data.data.country}`}
                totalFares={`4`}
                totalTripsInState={`${data?.data?.total_trips_in_state}`}
                createdOn={new Date(data.data.created_at).toLocaleDateString()}
              />
            }
            mainComponents={
              <>
                <FarePriceCard
                  title="Driver Fee"
                  handleEdit={() => {
                    setModalContent(<EditDriverFeeForm />);
                  }}
                  cardData={[
                    {
                      title: "Monthly Payment",
                      body: `₦${data.data.driver_fee.monthly_payment}/Month`,
                    },
                    {
                      title: "Sharp Payment",
                      body: `₦${data.data.driver_fee.sharp_payment}/Month`,
                    },
                  ]}
                />
                <FarePriceCard
                  title="Fares[Normal]"
                  handleEdit={() => {
                    setModalContent(<EditNormalFeesForm />);
                  }}
                  cardData={[
                    { title: "Base Fare", body: `₦${data.data.base_fare}` },
                    {
                      title: "Distance",
                      body: `₦${data.data.distance_per_km}/km`,
                    },
                    { title: "Time", body: `₦${data.data.time_per_min}/min` },
                    { title: "LASG Levy", body: `${data.data.state_levy}%` },
                    { title: "Booking Fee", body: `₦${data.data.booking_fee}` },
                    {
                      title: "Surge Multiplier",
                      body: `${data.data.surge_multiplier}`,
                    },
                  ]}
                />
              </>
            }
          />
        )}
      </div>
    </AppLayout>
  );
};

export default FarePrice;
