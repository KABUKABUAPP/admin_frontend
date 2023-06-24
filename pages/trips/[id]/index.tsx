import React, { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import ViewTripLayout from "@/components/modules/Trips/ViewTripLayout";
import AppMap from "@/components/common/AppMap/AppMap";
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
import { useViewTripQuery } from "@/api-services/tripsService";
import { useRouter } from "next/router";

import { io } from "socket.io-client";
const socket = io("https://rideservice-dev.up.railway.app");

const ViewTrip: NextPage = () => {
  const { setIsCalling } = useCallContext();
  const { setModalContent } = useModalContext();
  const [isFeed, setIsFeed] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError, refetch } = useViewTripQuery(
    { id: id ? String(id) : "" },
    { skip: id === undefined }
  );
  const [liveLocation, setLiveLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);

  useEffect(() => {
    if (data) {
      socket.on("connect", () => {
        joinRoom(data.orderId);
      });
    }

    socket.on("driver-location", (data: { lat: number; long: number }) => {
      const location = { lat: data.lat, lng: data.long, address: "" };
      setLiveLocation(location);
    });

    return () => {
      socket.disconnect();
      setLiveLocation(null);
    };
  }, [data]);

  const joinRoom = (orderId: string) => {
    socket.emit("join-room", [orderId]);
  };

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

  const getTripDetails = ({
    origin,
    destination,
    estimatedPrice,
    paymentType,
    tripStarted,
    tripToEnd,
  }: Record<string, string>) => {
    return [
      {
        topTitle: "Origin",
        topValue: origin,
        topIcon: <OriginIcon />,
        bottomTitle: "Destination",
        bottomValue: destination,
        bottomIcon: <DestinationIcon />,
      },
      {
        topTitle: "Estimated Price",
        topValue: estimatedPrice,
        topIcon: <CashIcon />,
        bottomTitle: "Payment Type",
        bottomValue: paymentType,
        bottomIcon: <WalletIcon />,
      },
      {
        topTitle: "Trip started",
        topValue: new Date(tripStarted).toUTCString(),
        topIcon: <ClockIcon />,
        bottomTitle: "Trip to end",
        bottomValue: new Date(tripToEnd).toUTCString(),
        bottomIcon: <ClockIcon />,
      },
    ];
  };

  return (
    <AppLayout padding="0">
      <div className="lg:h-screen lg:overflow-hidden p-4">
        <ActionBar>
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
        </ActionBar>
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
                {liveLocation && <AppMap zoom={11} location={liveLocation} />}
              </div>
            </>
          }
          asideComponents={
            <>
              <TripDetailsCard
                cardSubTitle="Driving to destination"
                data={
                  data &&
                  getTripDetails({
                    origin: data.origin,
                    destination: data.destination,
                    estimatedPrice: data.estimatedPrice.toString(),
                    paymentType: data.paymentType,
                    tripStarted: data.tripStarted,
                    tripToEnd: data.tripEnded,
                  })
                }
              />
              <div className="mt-5">
                <CarOccupantDetailsCard
                  isRider={true}
                  name={data?.riderFullName}
                  location={data?.riderLocation}
                  tripCount={data?.riderTripCount}
                  rating={data?.riderRating}
                  viewProfileLink={data?.riderId && `/riders/${data?.riderId}`}
                  buttonTitle="View Rider's Profile"
                  imageUri={data?.riderImage}
                  isLoading={isLoading}
                />
              </div>
              <div className="mt-5">
                <CarOccupantDetailsCard
                  isRider={false}
                  name={data?.driverFullname}
                  location={data?.driverLocation}
                  tripCount={data?.driverTripCount}
                  rating={data?.driverRating}
                  viewProfileLink={
                    data?.driverId && `/drivers/${data?.driverId}`
                  }
                  carModel={data?.carModel}
                  carPlateNumber={data?.plateNumber}
                  buttonTitle="View Driver's Profile"
                  imageUri={data?.driverImage}
                  isLoading={isLoading}
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
