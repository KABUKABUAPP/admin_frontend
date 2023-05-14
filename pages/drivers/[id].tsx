import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import React from "react";

import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import PhoneIcon from "@/components/icons/PhoneIcon";
import BlockIcon from "@/components/icons/BlockIcon";
import ViewDriverLayout from "@/components/modules/drivers/ViewDriverLayout";
import DriverInfoCard from "@/components/common/UserInfoCard";
import CarDetailsCard from "@/components/common/CarDetailsCard";
import FinancialsCard from "@/components/common/FinancialsCard";
import GuarantorDetailsCard from "@/components/common/GuarantorDetailsCard";
import CarDocuments from "@/components/common/CarDocuments";
import TripHistoryCard from "@/components/common/TripHistoryCard";
import { useRouter } from "next/router";
import { useViewDriverQuery } from "@/api-services/driversService";

const Driver: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const {} = useViewDriverQuery(
    { id: String(id) },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

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

        <ViewDriverLayout
          secondRow={
            <>
              <TripHistoryCard tripHistoryData={mockTripHistory} />
            </>
          }
          firstRow={
            <>
              <DriverInfoCard
                image="/testUser.jpg"
                fullname="John Doe"
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

export default Driver;

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
