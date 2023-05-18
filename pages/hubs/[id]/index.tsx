import { NextPage } from "next";
import React from "react";
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

const Hub: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isError, refetch } = useViewHubQuery(
    { hubId: String(id) },
    { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

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

        {data && !isLoading && !isError && (
          <ViewHubLayout
            mainComponents={
              <div className="flex flex-col gap-4 pb-4">
                <CarDescriptionContainer
                  title="Car inspection history"
                  cars={data.inspectionCars}
                />
                <CarDescriptionContainer
                  title="Cars in hub"
                  cars={data.hubCars}
                />
              </div>
            }
            asideComponents={
              <div className="flex flex-col gap-4">
                <InspectionCenterDetails
                  id={data.inspectionCenterId}
                  images={data.inspectionCenterImages}
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
                />
              </div>
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
