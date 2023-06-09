import { NextPage } from "next";
import React from "react";

import AppLayout from "@/layouts/AppLayout";
import ViewSharpCarLayout from "@/components/modules/sharp-cars/ViewSharpCarLayout";
import ActionBar from "@/components/common/ActionBar";
import UserInfoCard from "@/components/common/UserInfoCard";
import TripHistoryCard from "@/components/common/TripHistoryCard";
import CarDetailsCard from "@/components/common/CarDetailsCard";
import GuarantorDetailsCard from "@/components/common/GuarantorDetailsCard";
import Button from "@/components/ui/Button/Button";
import BlockIcon from "@/components/icons/BlockIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import CarDocuments from "@/components/common/CarDocuments";
import FinancialsCard from "@/components/common/FinancialsCard";

const SharpCar: NextPage = () => {
  return (
    <AppLayout padding="0">
      <div className="lg:h-screen lg:overflow-hidden p-4">
        <ActionBar>
          <Button title="Call Driver" startIcon={<PhoneIcon />} size="large" />
          <Button
            title="Block Driver"
            startIcon={<BlockIcon />}
            size="large"
            color="secondary"
          />
        </ActionBar>

        <ViewSharpCarLayout
          secondRow={
            <>
              {/* <TripHistoryCard tripHistoryData={mockTripHistory} /> */}
            </>
          }
          firstRow={
            <>
              <UserInfoCard
                image="/testUser.jpg"
                fullName="John Doe"
                address="30, Ebinpejo Lane, Idumota, Lagos, Nigeria"
                email="jdoe@gmail.com"
                phone="+234 909 888 7655"
                tripCount={14}
                rating={3.6}
              />

              <CarDetailsCard
                carImages={[
                  "/testUser.jpg",
                  "/testUser.jpg",
                  "/testUser.jpg",
                  "/testUser.jpg",
                  "/testUser.jpg",
                  "/testUser.jpg",
                ]}
                carModel="Toyota Corolla 2020"
                carColor="Black"
                plateNumber="ABC 123 XCD"
              />

              <FinancialsCard
                walletBalance={"20,000"}
                total={"130,000"}
                subscriptionDue={"20,000"}
              />

              <GuarantorDetailsCard
                address="6, Ebinpejo Lane, Idumota, Lagos, Nigeria"
                fullname="Amaka Nweke"
                image=""
                phone="+234 903 4564"
                relationship="Mother"
              />

              <CarDocuments
                totalDocs={5}
                documents={[
                  {
                    docId: "12334",
                    docImage: "/testUser.jpg",
                    title: "Drivers License",
                  },
                ]}
              />
            </>
          }
        />
      </div>
    </AppLayout>
  );
};

export default SharpCar;

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
