import React, { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import ViewTripLayout from "@/components/modules/Trips/ViewTripLayout";
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
import RatingIcon from "@/components/icons/RatingIcon";

import { io } from "socket.io-client";
import TimesIcon from "@/components/icons/TimesIcon";
import useUserPermissions from "@/hooks/useUserPermissions";
import AppHead from "@/components/common/AppHead";
import TripRatingCard from "@/components/modules/Trips/TripRatingCard";
import { capitalizeAllFirstLetters } from "@/utils";
import Card from "@/components/common/Card";
import RouteMapThree from "@/components/common/AppMap/RouteMapThree";
const socket = io("https://rideservice-dev.up.railway.app");

const ViewTrip: NextPage = () => {
  const { setIsCalling } = useCallContext();
  const { setModalContent } = useModalContext();
  const [isFeed, setIsFeed] = useState(false);
  const router = useRouter();
  const [currentCardSubTitle, setCurrentCardSubTitle] = useState("");
  const { id, tab, reason } = router.query;
  const tabOptions = [undefined, "pending", "active", "completed", "cancelled"];
  const cardSubTitleMap: Record<string, string> = {
    pending: "Driving to rider",
    active: "Driving to destination",
    completed: "Trip completed",
    cancelled: "Cancelled order",
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
  const tripHistory =
    Array.isArray(data?.tripHistory) && data.tripHistory.length > 1
      ? data.tripHistory
      : null;
  const livePoint =
    liveLocation && Number.isFinite(liveLocation.lng) && Number.isFinite(liveLocation.lat)
      ? ([liveLocation.lng, liveLocation.lat] as [number, number])
      : null;
  const effectiveTripHistory = (() => {
    if (!tripHistory) return null;
    if (!livePoint) return tripHistory;
    const last = tripHistory[tripHistory.length - 1];
    if (last && last[0] === livePoint[0] && last[1] === livePoint[1]) {
      return tripHistory;
    }
    return tripHistory.concat([livePoint]);
  })();
  const fallbackStart =
    data?.startPoint || (effectiveTripHistory ? effectiveTripHistory[0] : null);
  const fallbackEnd =
    data?.endPoint || (effectiveTripHistory ? effectiveTripHistory[effectiveTripHistory.length - 1] : null);

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
      console.log({data})
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
    riderRating,
    orderCreated
  }: Record<string, string | number>) => {
    const tripToEndStr = tab === 'completed' ? 'Trip Ended' : tab === 'cancelled' ? 'Trip Cancelled' : 'Trip To End'
    const details: TripDetail[] = [
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
        topTitle: "Order Created",
        topValue: new Date(orderCreated).toUTCString() != "Invalid Date"
        ? orderCreated
          ? new Date(orderCreated).toLocaleString()
          : ""
        : "",
        topIcon: <ClockIcon />,
        bottomTitle: "",
        bottomValue: '',
        bottomIcon: '',
        isRating: false,
      },
      {
        topTitle: reason ? "Reason" : "",
        topValue: String(reason),
        topIcon: <TimesIcon fill="#000000" />,
        bottomTitle: "",
        bottomValue: "",
        bottomIcon: <TimesIcon fill="#000000" />,
        isRating: false,
      },
    ];

    const startedDate = new Date(tripStarted);
    const endedDate = new Date(tripToEnd);
    const hasStarted = !Number.isNaN(startedDate.getTime()) && Boolean(tripStarted);
    const hasEnded = !Number.isNaN(endedDate.getTime()) && Boolean(tripToEnd);

    if (hasStarted || hasEnded) {
      details.splice(3, 0, {
        topTitle: hasStarted ? "Trip started" : "",
        topValue: hasStarted ? new Date(tripStarted).toLocaleString() : "",
        topIcon: hasStarted ? <ClockIcon /> : "",
        bottomTitle: hasEnded ? tripToEndStr : "",
        bottomValue: hasEnded ? new Date(tripToEnd).toLocaleString() : "",
        bottomIcon: hasEnded ? <ClockIcon /> : "",
        isRating: true,
      });
    }

    if (tab === "completed" && (driverRating || riderRating)) {
      details.splice(4, 0, {
        topTitle: driverRating ? "Driver Rating" : "",
        topValue: driverRating,
        topIcon: <RatingIcon fill="#000000" />,
        bottomTitle: riderRating ? "Rider Rating" : "",
        bottomValue: riderRating,
        bottomIcon: <RatingIcon fill="#000000" />,
        isRating: true,
      });
    }

    return details;
  };

  const { userPermissions } = useUserPermissions();
  const tabUrl = router.query.tab ? `tab=${router.query.tab}` : '';
  const currentPageUrl = router.query.current_page ? `currentPage=${router.query.current_page}` : '';

  return (
    <>
      <AppHead title="Kabukabu | Trips" />
      <AppLayout padding="0">
        <div className="lg:h-screen lg:overflow-hidden p-4">
          <ActionBar handleBack={() => router.push(`/trips?${tabUrl}&${currentPageUrl}`)}>
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
              <Button
                title="Raise SOS"
                color="secondary"
                size="large"
                onClick={handleRaiseSos}
              />
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
                  {Array.isArray(fallbackStart) && Array.isArray(fallbackEnd) && (
                    <>
                      {/*<RouteMap start={
                          liveLocation
                          ? {lat: liveLocation.lng, lng: liveLocation.lat}
                          : {lat: data?.startPoint[1], lng: data?.startPoint[0]}
                        } 
                        end={{lat: data?.endPoint[1], lng: data?.endPoint[0]}} 
                      />*/}

                      <RouteMapThree
                        start={
                          liveLocation
                            ? [liveLocation.lng, liveLocation.lat]
                            : [fallbackStart[0], fallbackStart[1]]
                        }
                        end={[fallbackEnd[0], fallbackEnd[1]]}
                        routeCoordinates={effectiveTripHistory || undefined}
                      />
                    </>
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
                      estimatedPrice: data.paymentDetails && data.paymentDetails.is_discount ? <><s>{data.paymentDetails.original_sum}</s> {data.paymentDetails.total_charge}</> : data.estimatedPrice.toString(),
                      paymentType: data.paymentType,
                      orderCreated: data.createdAt,
                      tripStarted: data.tripStarted,
                      tripToEnd: data.tripEnded,
                      driverRating: data.driverTripRating,
                      riderRating: data.riderTripRating,
                    })
                  }
                />
                {
                  data?.couponDetails &&
                  <div className="rounded-md w-full my-4">
                    <Card bg={'#FFF'} width="100%">
                      <p className="font-bold text-sm mb-4">Coupon Details</p>
                      <div className="border-b border-b-[#E6E6E6] my-2 flex flex-col gap-2 pb-3">
                        <p className="text-xs text-[#9A9A9A]">Amount Type</p>
                        <p className="text-xs font-bold">{data?.couponDetails?.amount_type}</p>
                      </div>
                      <div className="border-b border-b-[#E6E6E6] my-2 flex flex-col gap-2 pb-3">
                        <p className="text-xs text-[#9A9A9A]">Value</p>
                        <p className="text-xs font-bold">{data?.couponDetails?.value}</p>
                      </div>
                    </Card>
                  </div>
                }
                <div className="mt-5">
                  <CarOccupantDetailsCard
                    isRider={true}
                    name={data?.riderFullName}
                    location={data?.riderLocation}
                    tripCount={data?.riderTripCount}
                    rating={data?.riderRating}
                    viewProfileLink={
                      data?.riderId && `/riders/${data?.riderId}?fallbackUrl=${router.asPath}`
                    }
                    buttonTitle="View Rider's Profile"
                    imageUri={data?.riderImage}
                    isLoading={isLoading}
                    permissionKey="riders_permissions"
                  />
                </div>
                {tab !== "pending_orders" && (
                  <div className="mt-5">
                    <CarOccupantDetailsCard
                      isRider={false}
                      name={data?.driverFullname}
                      location={data?.driverLocation}
                      tripCount={data?.driverTripCount}
                      rating={data?.driverRating}
                      viewProfileLink={
                        data?.driverId && `/drivers/active/${data?.driverId}?fallbackUrl=${router.asPath}`
                      }
                      carModel={capitalizeAllFirstLetters(data?.carModel)}
                      carPlateNumber={data?.plateNumber}
                      buttonTitle="View Driver's Profile"
                      imageUri={data?.driverImage}
                      isLoading={isLoading}
                      permissionKey="drivers_permissions"
                    />
                  </div>
                )}
                {tab === "completed" && (
                  <div className="mt-5">
                    {data && (
                      <TripRatingCard
                        rating={data.tripRating}
                        comment={data.riderComment}
                      />
                    )}
                  </div>
                )}
              </>
            }
          />
        </div>
      </AppLayout>
    </>
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
