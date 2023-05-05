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

const FarePrice: NextPage = () => {
  const { setModalContent } = useModalContext();

  const handleStartSurge = () => {
    setModalContent(
      <StartSurgeCard handleClose={() => setModalContent(null)} />
    );
  };

  return (
    <AppLayout padding="0">
      <div className="lg:h-screen lg:overflow-hidden p-4">
        <ActionBar>
          <Button
            title="Start Surge"
            size="large"
            color="tetiary"
            startIcon={<SurgeIcon />}
            onClick={handleStartSurge}
          />
          <Button
            title="Delete Profile"
            size="large"
            color="secondary"
            startIcon={<TrashIcon />}
          />
        </ActionBar>

        <ViewFarePriceLayout
          asideComponents={
            <FareDetailsCard
              fareId="#1234"
              fareLocation="Lagos, Nigeria"
              totalFares="4"
              totalTripsInState="3,000"
              createdOn="Jan 1 2022 at 5:30pm"
            />
          }
          mainComponents={
            <>
              <FarePriceCard
                title="Driver Fee"
                cardData={[
                  { title: "Monthly Payment", body: "N20000/Month" },
                  { title: "Sharp Payment", body: "N20000/Month" },
                ]}
              />
              <FarePriceCard
                title="Fares[Normal]"
                cardData={[
                  { title: "Monthly Payment", body: "N20000/Month" },
                  { title: "Sharp Payment", body: "N20000/Month" },
                ]}
              />
              <FarePriceCard
                title="Fares[Surge]"
                cardData={[
                  { title: "Monthly Payment", body: "N20000/Month" },
                  { title: "Sharp Payment", body: "N20000/Month" },
                ]}
              />
            </>
          }
        />
      </div>
    </AppLayout>
  );
};

export default FarePrice;
