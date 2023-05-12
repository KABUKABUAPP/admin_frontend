import React, { FC } from "react";

import AppLayout from "@/layouts/AppLayout";
import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import PhoneIcon from "@/components/icons/PhoneIcon";
import ViewInspectorLayout from "@/components/modules/inspectors/ViewInspectorLayout";
import UserInfoCard from "@/components/common/UserInfoCard";
import SummaryCard from "@/components/modules/inspectors/SummaryCard";
import CarsInHubCard from "@/components/modules/inspectors/CarsInHubCard";

const Inspector: FC = () => {
  return (
    <AppLayout padding="0">
      <div className="lg:h-screen lg:overflow-hidden p-4">
        <ActionBar>
          <Button title="Call Inspector" startIcon={<PhoneIcon />} />
        </ActionBar>

        <ViewInspectorLayout
          asideComponents={
            <div className="flex flex-col gap-4">
              <UserInfoCard
                fullname="John Doe"
                address="30, Ebinpejo Lane, Idumota, Lagos, Nigeria"
                email="jdoe@gmail.com"
                phone="+234 909 888 7655"
                totalCarsProcessed={110}
              />
              <SummaryCard approved={110} declined={0} carsInHub={0} />

              <div className="flex justify-between max-sm:flex-col gap-3">
                <Button
                  title="View Approved Cars"
                  variant="contained"
                  color="tetiary"
                  className="w-full !text-sm"
                />
                <Button
                  title="View Declined Cars"
                  variant="contained"
                  color="tetiary"
                  className="w-full !text-sm"
                />
              </div>
            </div>
          }
          mainComponents={<CarsInHubCard carsCount={0} />}
        />
      </div>
    </AppLayout>
  );
};

export default Inspector;
