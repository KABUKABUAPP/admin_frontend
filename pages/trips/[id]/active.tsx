import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import TripActionBar from "@/components/modules/Trips/TripActionBar";
import Button from "@/components/ui/Button/Button";
import ViewTripLayout from "@/components/modules/Trips/ViewTripLayout";
import AppMap from "@/components/common/AppMap";
import TripDetailsCard from "@/components/modules/Trips/TripDetailsCard";
import { TripDetail } from "@/models/Trips";
import OriginIcon from "@/components/icons/OriginIcon";
import DestinationIcon from "@/components/icons/DestinationIcon";
import CashIcon from "@/components/icons/CashIcon";
import WalletIcon from "@/components/icons/WalletIcon";
import ClockIcon from "@/components/icons/ClockIcon";

const ActiveTrip: NextPage = () => {
  const location = {
    address: "",
    lat: 6.532954,
    lng: 3.36739,
  };

  const tripDetailsData: TripDetail[] = [
    {
      topTitle: "Origin",
      topValue: "23, Kuvuki Land Igando",
      topIcon: <OriginIcon />,
      bottomTitle: "Destination",
      bottomValue: "23, Kuvuki Land Igando",
      bottomIcon: <DestinationIcon />,
    },
    {
      topTitle: "Estimated Price",
      topValue: "N1,600",
      topIcon: <CashIcon />,
      bottomTitle: "Payment Type",
      bottomValue: "Cash",
      bottomIcon: <WalletIcon />,
    },
    {
      topTitle: "Trip started",
      topValue: "Jan 1 2023 at 2:30pm",
      topIcon: <ClockIcon />,
      bottomTitle: "Trip to end",
      bottomValue: "Jan 1, 2023 at 5:50pm (est. 20mins)",
      bottomIcon: <ClockIcon />,
    },
  ];

  return (
    <AppLayout>
      <TripActionBar>
        <Button title="View Feed" color="tetiary" size="large" />
        <Button title="Call Rider" size="large" />
        <Button title="Call Driver" size="large" />
        <Button title="Raise SOS" color="secondary" size="large" />
      </TripActionBar>
      <ViewTripLayout
        mainComponents={
          <>
            <div className="w-full h-full max-h-[550px] pl-12">
              <AppMap zoom={11} location={location} />
            </div>
          </>
        }
        asideComponents={
          <TripDetailsCard
            cardSubTitle="Driving to destination"
            data={tripDetailsData}
          />
        }
      />
    </AppLayout>
  );
};

export default ActiveTrip;
