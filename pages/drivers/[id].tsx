import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import React from "react";

import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import PhoneIcon from "@/components/icons/PhoneIcon";
import BlockIcon from "@/components/icons/BlockIcon";
import ViewDriverLayout from "@/components/modules/drivers/ViewDriverLayout";
import DriverInfoCard from "@/components/modules/drivers/DriverInfoCard";
import CarDetailsCard from "@/components/modules/drivers/CarDetailsCard";

const Driver: NextPage = () => {
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
            </>
          }
        />
      </div>
    </AppLayout>
  );
};

export default Driver;
