import React, { useState, useEffect } from "react";
import { NextPage } from "next";

import AppHead from "@/components/common/AppHead";
import CashIcon from "@/components/icons/CashIcon";
import ClockIcon from "@/components/icons/ClockIcon";
import DestinationIcon from "@/components/icons/DestinationIcon";
import OriginIcon from "@/components/icons/OriginIcon";
import SosIcon from "@/components/icons/SosIcon";
import WalletIcon from "@/components/icons/WalletIcon";
import { useCallContext } from "@/contexts/CallContext";
import { useModalContext } from "@/contexts/ModalContext";
import useUserPermissions from "@/hooks/useUserPermissions";
import AppLayout from "@/layouts/AppLayout";

import { io } from "socket.io-client";
import { useViewSosQuery } from "@/api-services/sosService";
import { useRouter } from "next/router";
import ConfirmCallCard from "@/components/modules/Trips/ConfirmCallCard";
import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import TripDetailsCard from "@/components/modules/Trips/TripDetailsCard";
import CarOccupantDetailsCard from "@/components/modules/Trips/CarOccupantDetailsCard";
import ViewTripLayout from "@/components/modules/Trips/ViewTripLayout";
import ViewFeed from "@/components/modules/Trips/ViewFeed";
import AppMap from "@/components/common/AppMap/AppMap";
const socket = io("https://rideservice-dev.up.railway.app");

const ViewSOS: NextPage = () => {
  const { id } = useRouter().query;
  const { data, isLoading, isError, refetch } = useViewSosQuery(
    { id: String(id) },
    { skip: !id }
  );
  const { setIsCalling } = useCallContext();
  const { setModalContent } = useModalContext();
  const [isFeed, setIsFeed] = useState(false);

  const getTripDetails = ({
    origin,
    destination,
    estimatedPrice,
    paymentType,
    tripStarted,
    tripToEnd,
    raisedBy,
    reason,
  }: Record<string, string | number>) => {
    return [
      {
        topTitle: "Origin",
        topValue: origin,
        topIcon: <OriginIcon />,
        bottomTitle: "Destination",
        bottomValue: destination,
        bottomIcon: <DestinationIcon />,
        isRating: false,
      },
      {
        topTitle: "Estimated Price",
        topValue: estimatedPrice,
        topIcon: <CashIcon />,
        bottomTitle: "Payment Type",
        bottomValue: paymentType,
        bottomIcon: <WalletIcon />,
        isRating: false,
      },
      {
        topTitle: tripStarted ? "Trip started" : "",
        topValue: tripStarted ? new Date(tripStarted).toUTCString() : "",
        topIcon: <ClockIcon />,
        bottomTitle: tripToEnd ? "Trip to end" : "",
        bottomValue: tripToEnd ? new Date(tripToEnd).toUTCString() : "",
        bottomIcon: <ClockIcon />,
        isRating: true,
      },
      {
        topTitle: "Raised by",
        topValue: raisedBy,
        topIcon: (
          <span style={{ color: "#EF2C5B" }}>
            <SosIcon />
          </span>
        ),
        bottomTitle: "Reason",
        bottomValue: reason,
        bottomIcon: (
          <span style={{ color: "#EF2C5B" }}>
            <SosIcon />
          </span>
        ),
      },
    ];
  };

  const { userPermissions } = useUserPermissions();

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

  return (
    <>
      <AppHead title="Kabukabu | SOS" />
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
            {userPermissions && userPermissions.riders_permissions.write && (
              <Button
                title="Call Rider"
                size="large"
                onClick={() => handleCall(true)}
              />
            )}
            {userPermissions && userPermissions.drivers_permissions.write && (
              <Button
                title="Call Driver"
                size="large"
                onClick={() => handleCall(false)}
              />
            )}
            {userPermissions && userPermissions.sos_permisions.write && (
              <Button title="Send to RRS" color="secondary" size="large" />
            )}
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
                  cardSubTitle={"Driving to destination"}
                  data={
                    data &&
                    getTripDetails({
                      origin: data.origin,
                      destination: data.destination,
                      estimatedPrice: data.estimatedPrice.toString(),
                      paymentType: data.paymentType,
                      tripStarted: data.tripStarted,
                      tripToEnd: data.tripEnded,
                      reason: data.reason,
                      raisedBy: data.raisedBy
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
                    viewProfileLink={
                      data?.riderId && `/riders/${data?.riderId}`
                    }
                    buttonTitle="View Rider's Profile"
                    imageUri={data?.riderImage}
                    isLoading={isLoading}
                    permissionKey="riders_permissions"
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
                    permissionKey="drivers_permissions"
                  />
                </div>
              </>
            }
          />
        </div>
      </AppLayout>
    </>
  );
};

export default ViewSOS;
