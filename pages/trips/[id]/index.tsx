import { NextPage } from "next";
import React from "react";
import AppLayout from "@/layouts/AppLayout";
import TripActionBar from "@/components/modules/Trips/TripActionBar";

const Trip: NextPage = () => {
  return (
    <AppLayout>
      <TripActionBar></TripActionBar>
    </AppLayout>
  );
};

export default Trip;
