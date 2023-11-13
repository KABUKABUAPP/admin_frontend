import { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";

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
import AppHead from "@/components/common/AppHead";

const SharpCar: NextPage = () => {
  const router = useRouter();
  
  return (
    <>
    <AppHead title="Kabukabu | Sharp Cars" />
      <AppLayout padding="0">
        <div className="lg:h-screen lg:overflow-hidden p-4">
          <ActionBar handleBack={() => router.push(`/sharp-cars?currentPage=${router.query.current_page}`)}>
            <Button
              title="Call Driver"
              startIcon={<PhoneIcon />}
              size="large"
            />
            <Button
              title="Block Driver"
              startIcon={<BlockIcon />}
              size="large"
              color="secondary"
            />
          </ActionBar>

          <ViewSharpCarLayout
            secondRow={
              <>{/* <TripHistoryCard tripHistoryData={mockTripHistory} /> */}</>
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
                  referral_code={""} />

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
    </>
  );
};

export default SharpCar;

