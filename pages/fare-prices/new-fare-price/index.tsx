import { NextPage } from "next";
import React from "react";

import AppLayout from "@/layouts/AppLayout";
import ActionBar from "@/components/common/ActionBar";
import AddNewFarePriceLayout from "@/components/modules/fare-prices/AddNewFarePriceLayout";
import NewFareProfileForm from "@/components/modules/fare-prices/NewFareProfileForm";
import useUserPermissions from "@/hooks/useUserPermissions";

const NewFarePrice: NextPage = () => {
  const { userPermissions } = useUserPermissions();
  return (
    <AppLayout padding="0">
      <div className="lg:h-screen lg:overflow-hidden p-4">
        <ActionBar />

        {userPermissions && userPermissions.inspectors_permissions.write && (
          <AddNewFarePriceLayout>
            <p className="text-3xl font-semibold pb-8">New Fare Profile</p>
            <NewFareProfileForm />
          </AddNewFarePriceLayout>
        )}
      </div>
    </AppLayout>
  );
};

export default NewFarePrice;
