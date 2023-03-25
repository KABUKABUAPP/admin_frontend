import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import TripActionBar from "@/components/modules/Trips/TripActionBar";
import Button from "@/components/ui/Button/Button";
import ViewTripLayout from "@/components/modules/Trips/ViewTripLayout";

const ActiveTrip: NextPage = () => {
  return (
    <AppLayout>
      <TripActionBar>
        <Button title="View Feed" color="tetiary" size="large" />
        <Button title="Call Rider" size="large" />
        <Button title="Call Driver" size="large" />
        <Button title="Raise SOS" color="secondary" size="large" />
      </TripActionBar>
      <ViewTripLayout />
    </AppLayout>
  );
};

export default ActiveTrip;
