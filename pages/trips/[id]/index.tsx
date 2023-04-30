import React, { useState } from "react";
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
import CarOccupantDetailsCard from "@/components/modules/Trips/CarOccupantDetailsCard";
import { useCallContext } from "@/contexts/CallContext";
import ConfirmCallCard from "@/components/modules/Trips/ConfirmCallCard";
import { useModalContext } from "@/contexts/ModalContext";
import RaiseSosCard from "@/components/modules/Trips/RaiseSosCard";
import ViewFeed from "@/components/modules/Trips/ViewFeed";

const ViewTrip: NextPage = () => {
  const { setIsCalling } = useCallContext();
  const { setModalContent } = useModalContext();
  const [isFeed, setIsFeed] = useState(false);

  const handleCall = (isRider: boolean) => {
    setModalContent(
      <ConfirmCallCard
        isRider={isRider}
        handleCall={() => {
          setIsCalling(true);
          setModalContent(null);
        }}
        handleClose={() => {
          setModalContent(null);
        }}
      />
    );
  };

  const handleRaiseSos = () => {
    setModalContent(<RaiseSosCard data={raiseSosData} />);
  };

  return (
    <AppLayout padding="0">
      <div className="lg:h-screen lg:overflow-hidden p-4">
        <TripActionBar>
          {isFeed ? (
            <Button
              title="Close Feed"
              color="tetiary"
              size="large"
              onClick={() => setIsFeed(false)}
            />
          ) : (
            <Button
              title="View Feed"
              color="tetiary"
              size="large"
              onClick={() => setIsFeed(true)}
            />
          )}
          <Button
            title="Call Rider"
            size="large"
            onClick={() => handleCall(true)}
          />
          <Button
            title="Call Driver"
            size="large"
            onClick={() => handleCall(false)}
          />
          <Button
            title="Raise SOS"
            color="secondary"
            size="large"
            onClick={handleRaiseSos}
          />
        </TripActionBar>
        <ViewTripLayout
          mainComponents={
            <>
              {isFeed && (
                <ViewFeed
                  handleCloseFeed={() => {
                    setIsFeed(false);
                  }}
                />
              )}
              <div className="w-full h-full max-h-[550px] max-md:pl-0">
                <AppMap zoom={11} location={location} />
              </div>
            </>
          }
          asideComponents={
            <>
              <TripDetailsCard
                cardSubTitle="Driving to destination"
                data={tripDetailsData}
              />
              <div className="mt-5">
                <CarOccupantDetailsCard
                  isRider={true}
                  name="John Doe"
                  location="Lagos, Nigeria"
                  tripCount={14}
                  rating={3.8}
                  viewProfileLink=""
                  buttonTitle="View Rider's Profile"
                  imageUri="/testUser.jpg"
                />
              </div>
              <div className="mt-5">
                <CarOccupantDetailsCard
                  isRider={false}
                  name="John Doe"
                  location="Lagos, Nigeria"
                  tripCount={14}
                  rating={3.8}
                  viewProfileLink=""
                  carModel="Toyota Corolla 2020, Black"
                  carPlateNumber="ABC123DEF"
                  buttonTitle="View Rider's Profile"
                  imageUri="/testUser.jpg"
                />
              </div>
            </>
          }
        />
      </div>
    </AppLayout>
  );
};

export default ViewTrip;

const location = {
  address: "",
  lat: 6.532954,
  lng: 3.36739,
};

const raiseSosData = [
  {
    topLocation: "Lekki Phase 1 RRS",
    subLocation: "Admiralty way, Lekki Phase 1",
    isChecked: false,
  },
  {
    topLocation: "Lekki Phase 1 RRS",
    subLocation: "Admiralty way, Lekki Phase 1",
    isChecked: false,
  },
  {
    topLocation: "Lekki Phase 1 RRS",
    subLocation: "Admiralty way, Lekki Phase 1",
    isChecked: true,
  },
  {
    topLocation: "Lekki Phase 1 RRS",
    subLocation: "Admiralty way, Lekki Phase 1",
    isChecked: true,
  },
];

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
