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
import StaticMap from "@/components/common/AppMap/StaticMap";
import RatingIcon from "@/components/icons/RatingIcon";

import { io } from "socket.io-client";
import TimesIcon from "@/components/icons/TimesIcon";
const socket = io("https://rideservice-dev.up.railway.app");

const ViewTrip: NextPage = () => {
  const { setIsCalling } = useCallContext();
  const { setModalContent } = useModalContext();
  const [isFeed, setIsFeed] = useState(false);
  const router = useRouter();
  const [currentCardSubTitle, setCurrentCardSubTitle] = useState("");
  const { id, tab, reason } = router.query;
  const tabOptions = [undefined, "pending", "active", "completed", "declined"];
  const cardSubTitleMap: Record<string, string> = {
    pending: "Driving to rider",
    active: "Driving to destination",
    completed: "Trip completed",
    declined: "Cancelled order",
  };
  enum Tab {
    TRIP_ORDERS,
    PENDING_TRIPS,
    ACTIVE_TRIPS,
    COMPLETED_TRIPS,
    CANCELLED_ORDERS,
  }
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
    if (tab === undefined) {
      setCurrentCardSubTitle("Looking for driver");
    } else {
      setCurrentCardSubTitle(cardSubTitleMap[`${tab}`]);
    }
  }, [tab]);

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
    driverRating,
    riderRating
  }: Record<string, string | number>) => {
    return [
      {
        topTitle: "Origin",
        topValue: origin,
        topIcon: <OriginIcon />,
        bottomTitle: "Destination",
        bottomValue: destination,
        bottomIcon: <DestinationIcon />,
        isRating: false
      },
      {
        topTitle: "Estimated Price",
        topValue: estimatedPrice,
        topIcon: <CashIcon />,
        bottomTitle: "Payment Type",
        bottomValue: paymentType,
        bottomIcon: <WalletIcon />,
        isRating: false
      },
      {
        topTitle: tripStarted ? "Trip started" : "",
        topValue: tripStarted ? new Date(tripStarted).toUTCString() : "",
        topIcon: <ClockIcon />,
        bottomTitle: tripToEnd ? "Trip to end" : "",
        bottomValue: tripToEnd ? new Date(tripToEnd).toUTCString() : "",
        bottomIcon: <ClockIcon />,
        isRating: true
      },
      {
        topTitle: driverRating ? "Driver Rating" : '',
        topValue: driverRating,
        topIcon: <RatingIcon fill="#000000"/>,
        bottomTitle: riderRating ? "Rider Rating" : '',
        bottomValue: riderRating,
        bottomIcon: <RatingIcon fill="#000000"/>,
        isRating: true
      },
      {
        topTitle: reason ? "Reason" : '',
        topValue: String(reason),
        topIcon: <TimesIcon fill="#000000"/>,
        bottomTitle: '',
        bottomValue: '',
        bottomIcon: <TimesIcon fill="#000000"/>,
        isRating: false
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
                
                {tab !== "completed"
                  ? liveLocation && <AppMap zoom={11} location={liveLocation} />
                  : data && (
                      <StaticMap
                        endPoint={data.endPoint}
                        startPoint={data.startPoint}
                      />
                    )}
              </div>
            </>
          }
          asideComponents={
            <>
              <TripDetailsCard
                cardSubTitle={currentCardSubTitle}
                data={
                  data &&
                  getTripDetails({
                    origin: data.origin,
                    destination: data.destination,
                    estimatedPrice: data.estimatedPrice.toString(),
                    paymentType: data.paymentType,
                    tripStarted: data.tripStarted,
                    tripToEnd: data.tripEnded,
                    driverRating: data.driverTripRating,
                    riderRating: data.riderTripRating
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
