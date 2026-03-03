import React, { useEffect, useMemo, useRef, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import { NextPage } from "next";
import Button from "@/components/ui/Button/Button";
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

  const selectedTripSubtitle = (() => {
    const status = selectedTrip?.status;
    if (status === "pending") return "Driving to rider";
    if (status === "started" || status === "active") return "Driving to destination";
    if (status === "completed") return "Trip completed";
    if (status === "cancelled") return "Cancelled trip";
    return "Driving to destination";
  })();

  const formatDate = (value?: string) => {
    if (!value) return "-";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "-" : date.toLocaleString();
  };

  const formatCurrency = (value?: string | number) => {
    if (value === undefined || value === null || value === "") return "-";
    const numeric = Number(value);
    if (!Number.isNaN(numeric)) return `N${numeric.toLocaleString()}`;
    return `N${value}`;
  };

  const tripOverlayData = selectedTrip?.viewTrip;
  const tripStartedText = formatDate(tripOverlayData?.tripStarted);
  const tripEndText = formatDate(tripOverlayData?.tripEnded);
  const isCompletedTrip =
    selectedTrip?.status === "completed" ||
    data?.status === "completed" ||
    normalizedTab === "completed";
  const driverTripRatingValue = data?.driverTripRating;
  const riderTripRatingValue = data?.riderTripRating;

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
              style={isMapFullscreen ? undefined : { height: "90vh" }}
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
                selectedTripId={
                  normalizedId ? String(normalizedId) : selectedTrip?.id || null
                }
                suppressTripListFetch={true}
                suppressPersonnelFetch={true}
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
                  className={`${mapStyles.tripDetailsWrapperPersistent} max-h-[80vh] overflow-y-auto scrollbar-none pr-1 pb-6`}
                >
                  <div className={mapStyles.tripDetailsCard}>
                    <div className="bg-[#FFFFFF] rounded-lg p-4">
                      <div className="mb-3">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#E5E7EB] bg-[#FDFDFD]"
                          onClick={() => router.push(backUrl)}
                          aria-label="Back"
                        >
                          <img src="/arrowLeftFromLine.svg" alt="" className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="font-bold text-[18px] leading-[24px] text-[#1A1A1A]">
                        {selectedTripSubtitle}
                      </p>

                        <div className="mt-4 rounded-xl bg-[#F3F4F6] p-4">
                          <div className="flex gap-3 pb-4 border-b border-b-[#E0E0E0]">
                          <img
                            src="/trip-start-point.png"
                            alt="Origin icon"
                            className="w-4 h-4 mt-0.5 object-contain"
                          />
                          <div className="min-w-0">
                            <p className="text-xs text-[#9A9A9A]">Origin</p>
                            <p className="text-[16px] leading-[22px] font-semibold text-[#1A1A1A] break-words">
                              {tripOverlayData?.origin || "-"}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <img
                            src="/trip-end-point.png"
                            alt="Destination icon"
                            className="w-4 h-4 mt-0.5 object-contain"
                          />
                          <div className="min-w-0">
                            <p className="text-xs text-[#9A9A9A]">Destination</p>
                            <p className="text-[16px] leading-[22px] font-semibold text-[#1A1A1A] break-words">
                              {tripOverlayData?.destination || "-"}
                            </p>
                            <p className="text-xs text-[#737373] mt-1 break-words">
                              {tripOverlayData?.origin || ""}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 rounded-xl bg-[#F3F4F6] p-4 grid grid-cols-2 gap-4">
                        <div className="min-w-0">
                          <p className="text-xs text-[#9A9A9A]">Estimated Price</p>
                          <p className="text-[16px] leading-[22px] font-semibold text-[#1A1A1A] break-words">
                            {formatCurrency(
                              tripOverlayData?.tripPrice ?? tripOverlayData?.estimatedPrice
                            )}
                          </p>
                        </div>
                        <div className="min-w-0 flex gap-2">
                          <div className="pt-[2px]">
                            <WalletIcon />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-[#9A9A9A]">Payment Type</p>
                            <p className="text-[16px] leading-[22px] font-semibold text-[#1A1A1A] break-words">
                              {tripOverlayData?.paymentType || "-"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 rounded-xl bg-[#F3F4F6] p-4">
                        <div className="flex gap-2 pb-4 border-b border-b-[#E0E0E0]">
                          <ClockIcon />
                          <div className="min-w-0">
                            <p className="text-xs text-[#9A9A9A]">Trip started</p>
                            <p className="text-[16px] leading-[22px] font-semibold text-[#1A1A1A] break-words">
                              {tripStartedText}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <ClockIcon />
                          <div className="min-w-0">
                            <p className="text-xs text-[#9A9A9A]">Trip to end</p>
                            <p className="text-[16px] leading-[22px] font-semibold text-[#1A1A1A] break-words">
                              {tripEndText}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
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
                  {isCompletedTrip && data && (
                    <div className="mt-4 grid grid-cols-1 gap-4">
                      <TripRatingCard
                        title="Driver Rating"
                        rating={driverTripRatingValue}
                      />
                      <TripRatingCard
                        title="Rider Rating"
                        rating={riderTripRatingValue}
                        comment={data?.riderComment}
                      />
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
