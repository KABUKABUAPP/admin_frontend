import { NextPage } from "next";
import React from "react";

import AppLayout from "@/layouts/AppLayout";
import ViewRiderLayout from "@/components/modules/riders/ViewRiderLayout";
import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import PhoneIcon from "@/components/icons/PhoneIcon";
import BlockIcon from "@/components/icons/BlockIcon";
import UserInfoCard from "@/components/common/UserInfoCard";
import FinancialsCard from "@/components/modules/riders/FinancialsCard";
import NextOfKinCard from "@/components/modules/riders/NextOfKinCard";
import TripHistoryCard from "@/components/common/TripHistoryCard";

const Rider: NextPage = () => {
  return (
    <AppLayout padding="0">
      <div className="lg:h-screen lg:overflow-hidden p-4">
        <ActionBar>
          <Button title="Call Rider" startIcon={<PhoneIcon />} size="large" />
          <Button
            title="Block Rider"
            startIcon={<BlockIcon />}
            size="large"
            color="secondary"
          />
        </ActionBar>

        <ViewRiderLayout
          firstRow={
            <>
              <UserInfoCard
                fullname="John Doe"
                address="Lagos, Nigeria"
                tripCount={14}
                rating={3.6}
              />
              <FinancialsCard total={"130,000"} walletBalance={"20,000"} />
              <NextOfKinCard
                fullname="Amaka Nweke"
                relationship="Mother"
                phone="+234 903 4564"
              />
            </>
          }

          secondRow={
            <TripHistoryCard tripHistoryData={mockTripHistory} />}
        />
      </div>
    </AppLayout>
  );
};

export default Rider;

const mockTripHistory = [
  {
    originTop: "Kuvuki Land",
    originBottom: "",
    destinationTop: "Filmhouse Cinemas IMAX Lekki",
    destinationBottom: "22, Ozumba Mbadiwe Street, Lekki, Lagos",
    paymentMethod: "Wallet Payment",
    date: "20 January, 2023 at 3:30pm",
    amount: 1300,
    id: "#12345",
  },
  {
    originTop: "Kuvuki Land",
    originBottom: "",
    destinationTop: "Filmhouse Cinemas IMAX Lekki",
    destinationBottom: "22, Ozumba Mbadiwe Street, Lekki, Lagos",
    paymentMethod: "Wallet Payment",
    date: "20 January, 2023 at 3:30pm",
    amount: 1300,
    id: "#12345",
  },
  {
    originTop: "Kuvuki Land",
    originBottom: "",
    destinationTop: "Filmhouse Cinemas IMAX Lekki",
    destinationBottom: "22, Ozumba Mbadiwe Street, Lekki, Lagos",
    paymentMethod: "Wallet Payment",
    date: "20 January, 2023 at 3:30pm",
    amount: 1300,
    id: "#12345",
  },
];
