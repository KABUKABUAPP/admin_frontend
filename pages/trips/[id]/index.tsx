import React, { useEffect, useMemo, useRef, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import ActionBar from "@/components/common/ActionBar";
import Button from "@/components/ui/Button/Button";
import TripDetailsCard from "@/components/modules/Trips/TripDetailsCard";
import { TripDetail } from "@/models/Trips";
import OriginIcon from "@/components/icons/OriginIcon";
import DestinationIcon from "@/components/icons/DestinationIcon";
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
import useUserPermissions from "@/hooks/useUserPermissions";
import AppHead from "@/components/common/AppHead";
import TripRatingCard from "@/components/modules/Trips/TripRatingCard";
import { capitalizeAllFirstLetters } from "@/utils";
import Card from "@/components/common/Card";
import MapOverlayTwo from "@/pages/live-map/mapOverlayTwo";
import mapStyles from "@/pages/live-map/style.module.css";

type MapTripStatus = "pending" | "completed" | "active" | "cancelled";
const defaultTripFilters: MapTripStatus[] = [
  "pending",
  "active",
  "completed",
  "cancelled",
];

const ViewTrip: NextPage = () => {
  const { setIsCalling } = useCallContext();
  const { setModalContent } = useModalContext();
  const [isFeed, setIsFeed] = useState(false);
  const [isMapHovered, setIsMapHovered] = useState(false);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<{
    id: string;
    loading: boolean;
    status?: string;
    viewTrip?: any;
  } | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { id, tab } = router.query;
  const normalizedId = Array.isArray(id) ? id[0] : id;
  const normalizedTab = Array.isArray(tab) ? tab[0] : tab;
  const normalizedCurrentPage = Array.isArray(router.query.current_page)
    ? router.query.current_page[0]
    : router.query.current_page;

  const selectedTabStatus = useMemo<MapTripStatus | undefined>(() => {
    if (normalizedTab === "pending") return "pending";
    if (normalizedTab === "active") return "active";
    if (normalizedTab === "completed") return "completed";
    if (normalizedTab === "cancelled") return "cancelled";
    return undefined;
  }, [normalizedTab]);

  const mapTripFilter = useMemo<MapTripStatus[]>(
    () => (selectedTabStatus ? [selectedTabStatus] : defaultTripFilters),
    [selectedTabStatus]
  );

  const { data, isLoading } = useViewTripQuery(
    { id: normalizedId ? String(normalizedId) : "" },
    { skip: normalizedId === undefined }
  );

  useEffect(() => {
    if (!normalizedId) {
      setSelectedTrip(null);
      return;
    }

    setSelectedTrip((prev) => {
      const tripId = String(normalizedId);
      if (prev?.id === tripId && prev.viewTrip) {
        return {
          ...prev,
          status: selectedTabStatus || prev.status,
        };
      }
      return {
        id: tripId,
        loading: true,
        status: selectedTabStatus,
      };
    });
  }, [normalizedId, selectedTabStatus]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsMapFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.key === "f" || event.key === "F") && isMapHovered && !isMapFullscreen) {
        event.preventDefault();
        const target = mapContainerRef.current;
        if (!target) return;

        if (target.requestFullscreen) {
          target.requestFullscreen().catch(() => {
            setIsMapFullscreen(true);
          });
        } else {
          setIsMapFullscreen(true);
        }
      }

      if (event.key === "Escape" && isMapFullscreen) {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {
            setIsMapFullscreen(false);
          });
        } else {
          setIsMapFullscreen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMapHovered, isMapFullscreen]);

  useEffect(() => {
    document.body.style.overflow = isMapFullscreen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMapFullscreen]);

  const handleEnterFullscreen = () => {
    const target = mapContainerRef.current;
    if (!target) return;

    if (target.requestFullscreen) {
      target.requestFullscreen().catch(() => {
        setIsMapFullscreen(true);
      });
    } else {
      setIsMapFullscreen(true);
    }
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

  const selectedTripDetails: TripDetail[] | undefined = selectedTrip?.viewTrip
    ? (() => {
        const viewTrip = selectedTrip.viewTrip;
        const status = selectedTrip.status || "";
        const tripToEndStr =
          status === "completed"
            ? "Trip Ended"
            : status === "cancelled"
            ? "Trip Cancelled"
            : "Trip To End";
        const formatDate = (value?: string) => {
          if (!value) return "";
          const date = new Date(value);
          return Number.isNaN(date.getTime()) ? "" : date.toLocaleString();
        };
        const details: TripDetail[] = [
          {
            topTitle: "Origin",
            topValue: viewTrip.origin,
            topIcon: <OriginIcon />,
            bottomTitle: "Destination",
            bottomValue: viewTrip.destination,
            bottomIcon: <DestinationIcon />,
            isRating: false,
          },
          {
            topTitle: "Payment Type",
            topValue: viewTrip.paymentType,
            topIcon: <WalletIcon />,
            bottomTitle: "",
            bottomValue: "",
            bottomIcon: "",
            isRating: false,
          },
          {
            topTitle: "Order Created",
            topValue: formatDate(viewTrip.createdAt),
            topIcon: <ClockIcon />,
            bottomTitle: "",
            bottomValue: "",
            bottomIcon: "",
            isRating: false,
          },
        ];

        const hasStarted = Boolean(viewTrip.tripStarted);
        const hasEnded = Boolean(viewTrip.tripEnded);
        if (hasStarted || hasEnded) {
          details.push({
            topTitle: hasStarted ? "Trip started" : "",
            topValue: hasStarted ? formatDate(viewTrip.tripStarted) : "",
            topIcon: hasStarted ? <ClockIcon /> : "",
            bottomTitle: hasEnded ? tripToEndStr : "",
            bottomValue: hasEnded ? formatDate(viewTrip.tripEnded) : "",
            bottomIcon: hasEnded ? <ClockIcon /> : "",
            isRating: true,
          });
        }

        const hasRatings =
          Boolean(viewTrip.driverTripRating) || Boolean(viewTrip.riderTripRating);
        if (status === "completed" && hasRatings) {
          details.push({
            topTitle: viewTrip.driverTripRating ? "Driver Rating" : "",
            topValue: viewTrip.driverTripRating,
            topIcon: <RatingIcon fill="#000000" />,
            bottomTitle: viewTrip.riderTripRating ? "Rider Rating" : "",
            bottomValue: viewTrip.riderTripRating,
            bottomIcon: <RatingIcon fill="#000000" />,
            isRating: true,
          });
        }

        return details;
      })()
    : undefined;

  const selectedTripSubtitle = (() => {
    const status = selectedTrip?.status;
    if (status === "pending") return "Driving to rider";
    if (status === "started" || status === "active") return "Driving to destination";
    if (status === "completed") return "Trip completed";
    if (status === "cancelled") return "Cancelled trip";
    return "Trip details";
  })();

  const { userPermissions } = useUserPermissions();
  const tabUrl = normalizedTab ? `tab=${normalizedTab}` : "";
  const currentPageUrl = normalizedCurrentPage
    ? `currentPage=${normalizedCurrentPage}`
    : "";
  const backQuery = [tabUrl, currentPageUrl].filter(Boolean).join("&");
  const backUrl = backQuery ? `/trips?${backQuery}` : "/trips";

  return (
    <>
      <AppHead title="Kabukabu | Trips" />
      <AppLayout padding="0">
        <div className="lg:h-screen lg:overflow-hidden p-4">
          <ActionBar handleBack={() => router.push(backUrl)} />
          {isFeed && (
            <div className="mt-4">
              <ViewFeed
                handleCloseFeed={() => {
                  setIsFeed(false);
                }}
              />
            </div>
          )}
          <div className={`mt-4 w-full h-full max-md:pl-0 ${mapStyles.app}`}>
            <div
              ref={mapContainerRef}
              className={`${mapStyles.mapContainer} ${
                isMapFullscreen ? mapStyles.mapContainerFullscreen : ""
              }`}
              style={isMapFullscreen ? undefined : { height: "70vh" }}
              onMouseEnter={() => setIsMapHovered(true)}
              onMouseLeave={() => setIsMapHovered(false)}
              id="trip-map-fullscreen"
            >
              <MapOverlayTwo
                onlineStatusDriver="online"
                onlineStatusRider="online"
                enableDriverOption={true}
                enableRiderOption={true}
                isFullscreen={isMapFullscreen}
                tripFilter={mapTripFilter}
                selectedTripId={selectedTrip?.id || null}
                onTripSelectionChange={setSelectedTrip}
              />
              <button
                type="button"
                className={`${mapStyles.fullscreenHint} rounded-full ${
                  isMapHovered && !isMapFullscreen
                    ? mapStyles.fullscreenHintVisible
                    : ""
                }`}
                onClick={handleEnterFullscreen}
                aria-hidden={!isMapHovered || isMapFullscreen}
                tabIndex={isMapHovered && !isMapFullscreen ? 0 : -1}
              >
                Press F for Fullscreen
              </button>
            </div>
            <div
              className={`flex flex-col md:flex-row justify-between ${
                isMapFullscreen ? mapStyles.overlayFullscreen : ""
              }`}
            >
              {selectedTrip?.id && (
                <div
                  className={`${mapStyles.tripDetailsWrapperPersistent} max-h-[60vh] overflow-y-auto scrollbar-none pr-1`}
                >
                  <div className={mapStyles.tripDetailsCard}>
                    <TripDetailsCard
                      variant="map"
                      onBack={() => router.push(backUrl)}
                      isLoading={selectedTrip.loading}
                      cardSubTitle={selectedTripSubtitle}
                      data={selectedTripDetails}
                      mapPrice={selectedTrip?.viewTrip?.estimatedPrice ?? ""}
                      mapRiderName={selectedTrip?.viewTrip?.riderFullName}
                      mapDriverName={selectedTrip?.viewTrip?.driverFullname}
                    />
                  </div>
                  {data?.couponDetails && (
                    <div className="rounded-md w-full my-4">
                      <Card bg={"#FFF"} width="100%">
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
                  )}
                  <div className="mt-4">
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
                  {normalizedTab !== "pending_orders" && (
                    <div className="mt-4">
                      <CarOccupantDetailsCard
                        isRider={false}
                        name={data?.driverFullname}
                        location={data?.driverLocation}
                        tripCount={data?.driverTripCount}
                        rating={data?.driverRating}
                        viewProfileLink={
                          data?.driverId &&
                          `/drivers/active/${data?.driverId}?fallbackUrl=${router.asPath}`
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
                  {normalizedTab === "completed" && (
                    <div className="mt-4">
                      {data && (
                        <TripRatingCard
                          rating={data.tripRating}
                          comment={data.riderComment}
                        />
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className={mapStyles.tripActionsOverlay}>
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
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export default ViewTrip;

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
