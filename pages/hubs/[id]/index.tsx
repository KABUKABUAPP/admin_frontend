import { NextPage } from "next";
import React from "react";

import AppLayout from "@/layouts/AppLayout";
import ViewHubLayout from "@/components/modules/hubs/ViewHubLayout";
import Button from "@/components/ui/Button/Button";
import ActionBar from "@/components/common/ActionBar";
import TrashIcon from "@/components/icons/TrashIcon";
import CarDescriptionContainer from "@/components/modules/hubs/CarDescriptionContainer";
import InspectionCenterDetails from "@/components/modules/hubs/InspectionCenterDetails";
import SummaryCard from "@/components/modules/hubs/SummaryCard";
import InspectorCard from "@/components/modules/hubs/InspectorCard";

const Hub: NextPage = () => {
  return (
    <AppLayout padding="0">
      <div className="lg:h-screen lg:overflow-hidden p-4">
        <ActionBar>
          <Button
            title="Delete Hub"
            size="large"
            color="secondary"
            startIcon={<TrashIcon />}
          />
        </ActionBar>

        <ViewHubLayout
          mainComponents={
            <div className="flex flex-col gap-4 pb-4">
              <CarDescriptionContainer
                title="Car inspection history"
                cars={mockCars}
              />
              <CarDescriptionContainer title="Cars in hub" cars={mockCars} />
            </div>
          }
          asideComponents={
            <div className="flex flex-col gap-4">
              <InspectionCenterDetails
                id="12345"
                images={[
                  "/testUser.jpg",
                  "/testUser.jpg",
                  "/testUser.jpg",
                  "/testUser.jpg",
                  "/testUser.jpg",
                  "/testUser.jpg",
                  "/testUser.jpg",
                ]}
                inspector="Samson Siasia"
                addedOn="Jan 1 2022 at 5:30pm"
                location="Ebute Ikorodu, Lagos"
                title="Ikorodu inspection center"
              />
              <SummaryCard approved={490} declined={10} processed={500} />
              <InspectorCard
                fullName="John Bosco"
                address="3, Ebinpejo Idumota, Lagos, Nigeria"
                phone="+234 903 4655"
              />
            </div>
          }
        />
      </div>
    </AppLayout>
  );
};

export default Hub;

const mockCars = [
  {
    carColor: "Black",
    carId: "12345",
    carImage: "/testUser.jpg",
    carModel: "Toyota Corolla 2020",
    plateNumber: "ABC 123 JYK",
  },
  {
    carColor: "Black",
    carId: "12345",
    carImage: "/testUser.jpg",
    carModel: "Toyota Corolla 2020",
    plateNumber: "ABC 123 JYK",
  },
  {
    carColor: "Black",
    carId: "12345",
    carImage: "/testUser.jpg",
    carModel: "Toyota Corolla 2020",
    plateNumber: "ABC 123 JYK",
  },
  {
    carColor: "Black",
    carId: "12345",
    carImage: "/testUser.jpg",
    carModel: "Toyota Corolla 2020",
    plateNumber: "ABC 123 JYK",
  },
  {
    carColor: "Black",
    carId: "12345",
    carImage: "/testUser.jpg",
    carModel: "Toyota Corolla 2020",
    plateNumber: "ABC 123 JYK",
  },
  {
    carColor: "Black",
    carId: "12345",
    carImage: "/testUser.jpg",
    carModel: "Toyota Corolla 2020",
    plateNumber: "ABC 123 JYK",
  },
  {
    carColor: "Black",
    carId: "12345",
    carImage: "/testUser.jpg",
    carModel: "Toyota Corolla 2020",
    plateNumber: "ABC 123 JYK",
  },
  {
    carColor: "Black",
    carId: "12345",
    carImage: "/testUser.jpg",
    carModel: "Toyota Corolla 2020",
    plateNumber: "ABC 123 JYK",
  },
  {
    carColor: "Black",
    carId: "12345",
    carImage: "/testUser.jpg",
    carModel: "Toyota Corolla 2020",
    plateNumber: "ABC 123 JYK",
  },
  {
    carColor: "Black",
    carId: "12345",
    carImage: "/testUser.jpg",
    carModel: "Toyota Corolla 2020",
    plateNumber: "ABC 123 JYK",
  },
  {
    carColor: "Black",
    carId: "12345",
    carImage: "/testUser.jpg",
    carModel: "Toyota Corolla 2020",
    plateNumber: "ABC 123 JYK",
  },
  {
    carColor: "Black",
    carId: "12345",
    carImage: "/testUser.jpg",
    carModel: "Toyota Corolla 2020",
    plateNumber: "ABC 123 JYK",
  },
  {
    carColor: "Black",
    carId: "12345",
    carImage: "/testUser.jpg",
    carModel: "Toyota Corolla 2020",
    plateNumber: "ABC 123 JYK",
  },
  {
    carColor: "Black",
    carId: "12345",
    carImage: "/testUser.jpg",
    carModel: "Toyota Corolla 2020",
    plateNumber: "ABC 123 JYK",
  },
];
