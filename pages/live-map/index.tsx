// pages/index.tsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './style.module.css'; // Add CSS module for styling
import AppHead from '@/components/common/AppHead';
import AppLayout from '@/layouts/AppLayout';
import { useFormik, Form, FormikProvider } from "formik";
import DropDown from '@/components/ui/DropDown';
import { useGetInsightsQuery } from '@/api-services/dashboardService';
import { useDashboardState } from "@/contexts/StateSegmentationContext";
import MapOverlayTwo from './mapOverlayTwo';
import CarOccupantDetailsCard from '@/components/modules/Trips/CarOccupantDetailsCard';
import OriginIcon from '@/components/icons/OriginIcon';
import DestinationIcon from '@/components/icons/DestinationIcon';
import ClockIcon from '@/components/icons/ClockIcon';
import { useRouter } from 'next/router';
import { capitalizeAllFirstLetters } from '@/utils';

const IndexPage: React.FC = () => {
  const router = useRouter();
  const [dropDownOptionSelected, setDropDownOptionSelected] = useState('');
  const [expandTrue, setExpandTrue] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [onlineStatusOption, setOnlineStatusOption] = useState<string>("online");
  const [onlineStatusOptionRider, setOnlineStatusOptionRider] = useState<string>("online");
  const [enableDriverOption, setEnableDriverOption] = useState(true);
  const [enableRiderOption, setEnableRiderOption] = useState(true);
  const [liveTrackingSelection, setLiveTrackingSelection] = useState<Array<'pending' | 'completed' | 'active' | 'cancelled'>>(['completed']);
  const [isMapHovered, setIsMapHovered] = useState(false);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<{
    id: string;
    loading: boolean;
    status?: string;
    viewTrip?: any;
  } | null>(null);
  const [periodFilter, setPeriodFilter] = useState('today');
  const { dashboardState, setDashboardState } = useDashboardState();
  const {
    data: tripsInsight,
    isLoading: tripsInsightsLoading,
    isError: tripsInsightError,
    refetch: reloadTrips,
  } = useGetInsightsQuery({filter: periodFilter, dashboard_state: dashboardState}, { refetchOnReconnect: true });

  const filterOptions = [
    {
      label: 'Today',
      value: 'today',
      default: true
    },
    {
      label: 'This Week',
      value: 'this_week',
      default: false
    },
    {
      label: 'This Month',
      value: 'this_month',
      default: false
    }
  ]

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      
    },
  });

  const formikTwo = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      
    },
  });


  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = Boolean(document.fullscreenElement);
      setIsMapFullscreen(isFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.key === 'f' || event.key === 'F') && isMapHovered && !isMapFullscreen) {
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

      if (event.key === 'Escape' && isMapFullscreen) {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {
            setIsMapFullscreen(false);
          });
        } else {
          setIsMapFullscreen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMapHovered, isMapFullscreen]);

  useEffect(() => {
    document.body.style.overflow = isMapFullscreen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
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

  const selectedTripSubtitle = (() => {
    const status = selectedTrip?.status;
    if (status === 'pending') return 'Driving to rider';
    if (status === 'started' || status === 'active') return 'Driving to destination';
    if (status === 'completed') return 'Trip completed';
    if (status === 'cancelled') return 'Cancelled trip';
    return 'Driving to destination';
  })();

  const formatDate = (value?: string) => {
    if (!value) return '-';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '-' : date.toLocaleString();
  };

  const formatCurrency = (value?: string | number) => {
    if (value === undefined || value === null || value === '') return '-';
    const numeric = Number(value);
    if (!Number.isNaN(numeric)) return `N${numeric.toLocaleString()}`;
    return `N${value}`;
  };

  const hasDriverDetails =
    Boolean(selectedTrip?.viewTrip?.driverFullname) ||
    Boolean(selectedTrip?.viewTrip?.driverId) ||
    Boolean(selectedTrip?.loading);

  return (
    <>
        <AppHead title="Kabukabu | Map View" />
        <AppLayout>
            <div className={styles.app}>
              <div
                ref={mapContainerRef}
                className={`${styles.mapContainer} ${isMapFullscreen ? styles.mapContainerFullscreen : ''}`}
                onMouseEnter={() => setIsMapHovered(true)}
                onMouseLeave={() => setIsMapHovered(false)}
                id="live-map-fullscreen"
              >
                <MapOverlayTwo
                  onlineStatusDriver={onlineStatusOption}
                  onlineStatusRider={onlineStatusOptionRider}
                  enableDriverOption={enableDriverOption}
                  enableRiderOption={enableRiderOption}
                  isFullscreen={isMapFullscreen}
                  tripFilter={liveTrackingSelection}
                  selectedTripId={selectedTrip?.id || null}
                  onTripSelectionChange={setSelectedTrip}
                />
                <button
                  type="button"
                  className={`${styles.fullscreenHint} rounded-full ${isMapHovered && !isMapFullscreen ? styles.fullscreenHintVisible : ''}`}
                  onClick={handleEnterFullscreen}
                  aria-hidden={!isMapHovered || isMapFullscreen}
                  tabIndex={isMapHovered && !isMapFullscreen ? 0 : -1}
                >
                  Press F for Fullscreen
                </button>
              </div>

              {/* Elements above the map as overlay */}
              <div className={`flex flex-col md:flex-row justify-between ${isMapFullscreen ? styles.overlayFullscreen : ''}`}>
                {!selectedTrip?.id ? (
                  <>
                    <div className={styles.overlaySecondWrapper}>
                      <button
                        type="button"
                        className={styles.filtersToggle}
                        onClick={() => setShowFilters((prev) => !prev)}
                        aria-expanded={showFilters}
                        aria-controls="live-map-filters"
                      >
                        <span>Showing: All filters</span>
                        <span className={`${styles.filtersIcon} ${showFilters ? styles.filtersIconOpen : ''}`} aria-hidden="true">
                          <svg viewBox="0 0 20 20" role="presentation" focusable="false">
                            <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </button>
                      {showFilters && (
                        <div className={styles.overlaySecond} id="live-map-filters">
                          <div className="gap-4">
                            <div className={`bg-[#FDFDFD] ${expandTrue ? 'w-full' : 'w-[75%]'} gap-5 p-4 rounded-lg`}>
                              <div className="flex justify-between items-center my-2">
                                <div className="font-bp flex gap-3 items-center cursor-pointer">
                                  <span>View:</span>
                                  <div className="flex justify-right">
                                    <DropDown
                                      placeholder="Filter"
                                      options={filterOptions}
                                      value={dropDownOptionSelected}
                                      handleChange={(val) => {}}
                                      rightSet={4}
                                    />
                                  </div>
                                  
                                </div>
                                <p className="font-bold text-lg cursor-pointer" onClick={() => setExpandTrue(!expandTrue)}>
                                  <img src="/arrowLeftFromLine.svg" alt="" />
                                </p>
                              </div>
                              <div className="bg-[#F8F8F8] rounded-md p-4">
                                <div className="mt-2">
                                  <p className="text-md font-bold text-left">Show Availability</p>
                                  <div className="flex">
                                    <FormikProvider value={formik}>
                                      <Form>
                                        <div className="flex">
                                          <div className="flex flex-col space-y-2 p-3">
                                            <label className="inline-flex items-center">
                                              <input
                                                type="checkbox"
                                                className="form-checkbox text-yellow-400 checked:bg-yellow-400"
                                                name="driver-online"
                                                checked={onlineStatusOption === 'online'}
                                                onChange={() => {setOnlineStatusOption('online')}}
                                                disabled={!enableDriverOption}
                                              />
                                              <span className="ml-2 text-xs">Driver Online</span>
                                            </label>

                                            <label className="inline-flex items-center mb-4">
                                              <input
                                                type="checkbox"
                                                className="form-checkbox text-yellow-400 checked:bg-yellow-400"
                                                name="driver-offline"
                                                checked={onlineStatusOption === 'offline'}
                                                onChange={() => setOnlineStatusOption('offline')}
                                                disabled={!enableDriverOption}
                                              />
                                              <span className="ml-2 text-xs">Driver Offline</span>
                                            </label>
                                          </div>

                                          <div className="flex flex-col space-y-2 p-3">
                                            <label className="inline-flex items-center">
                                              <input
                                                type="checkbox"
                                                className="form-checkbox text-yellow-400 checked:bg-yellow-400"
                                                name="rider-online"
                                                checked={onlineStatusOptionRider === 'online'}
                                                onChange={() => setOnlineStatusOptionRider('online')}
                                                disabled={!enableRiderOption}
                                              />
                                              <span className="ml-2 text-xs">Rider Online</span>
                                            </label>

                                            <label className="inline-flex items-center">
                                              <input
                                                type="checkbox"
                                                className="form-checkbox text-yellow-400 checked:bg-yellow-400"
                                                name="rider-offline"
                                                checked={onlineStatusOptionRider === 'offline'}
                                                onChange={() => setOnlineStatusOptionRider('offline')}
                                                disabled={!enableRiderOption}
                                              />
                                              <span className="ml-2 text-xs">Rider Offline</span>
                                            </label>
                                          </div>
                                        </div>
                                      </Form>
                                    </FormikProvider>
                                  </div>
                                </div>

                                <div className="mt-2">
                                  <p className="text-md font-bold text-left">Live Tracking</p>
                                  <div className="flex">
                                    <FormikProvider value={formikTwo}>
                                      <Form>
                                        <div className="flex">
                                          <div className="flex flex-col space-y-2 p-3">
                                            <label className="inline-flex items-center">
                                              <input
                                                type="checkbox"
                                                className="form-checkbox text-yellow-400 checked:bg-yellow-400"
                                                name="pending-trips"
                                                checked={liveTrackingSelection.includes('pending')}
                                                onChange={() =>
                                                  setLiveTrackingSelection((prev) =>
                                                    prev.includes('pending')
                                                      ? prev.filter((item) => item !== 'pending')
                                                      : [...prev, 'pending']
                                                  )
                                                }
                                              />
                                              <img src="/indicator_pending.png" alt="" className="ml-2 h-2 w-2" />
                                              <span className="ml-2 text-xs">Pending Trips</span>
                                            </label>

                                            <label className="inline-flex items-center mb-4">
                                              <input
                                                type="checkbox"
                                                className="form-checkbox text-yellow-400 checked:bg-yellow-400"
                                                name="completed-trips"
                                                checked={liveTrackingSelection.includes('completed')}
                                                onChange={() =>
                                                  setLiveTrackingSelection((prev) =>
                                                    prev.includes('completed')
                                                      ? prev.filter((item) => item !== 'completed')
                                                      : [...prev, 'completed']
                                                  )
                                                }
                                              />
                                              <img src="/indicator_completed.png" alt="" className="ml-2 h-2 w-2" />
                                              <span className="ml-2 text-xs">Completed Trips</span>
                                            </label>
                                          </div>

                                          <div className="flex flex-col space-y-2 p-3">
                                            <label className="inline-flex items-center">
                                              <input
                                                type="checkbox"
                                                className="form-checkbox text-yellow-400 checked:bg-yellow-400"
                                                name="active-trips"
                                                checked={liveTrackingSelection.includes('active')}
                                                onChange={() =>
                                                  setLiveTrackingSelection((prev) =>
                                                    prev.includes('active')
                                                      ? prev.filter((item) => item !== 'active')
                                                      : [...prev, 'active']
                                                  )
                                                }
                                              />
                                              <img src="/indicator_active.png" alt="" className="ml-2 h-2 w-2" />
                                              <span className="ml-2 text-xs">Active Trips</span>
                                            </label>

                                            <label className="inline-flex items-center">
                                              <input
                                                type="checkbox"
                                                className="form-checkbox text-yellow-400 checked:bg-yellow-400"
                                                name="cancelled-trips"
                                                checked={liveTrackingSelection.includes('cancelled')}
                                                onChange={() =>
                                                  setLiveTrackingSelection((prev) =>
                                                    prev.includes('cancelled')
                                                      ? prev.filter((item) => item !== 'cancelled')
                                                      : [...prev, 'cancelled']
                                                  )
                                                }
                                              />
                                              <img src="/indicator_cancelled.png" alt="" className="ml-2 h-2 w-2" />
                                              <span className="ml-2 text-xs">Cancelled Trips</span>
                                            </label>
                                          </div>
                                        </div>
                                      </Form>
                                    </FormikProvider>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className={styles.overlay}>
                      <div className="bg-[#FDFDFD] w-full md:w-[60%] gap-2 py-1 px-4 rounded-full items-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="flex">
                            <div className="w-[20%]">
                              <img src="/taxiOnline.svg" alt="" />
                            </div>
                            <div className="w-[80%] pl-2">
                              <p className="text-md text-start"><b>{tripsInsight?.onlineStatusChart?.online}</b></p>
                              <p className="text-sm text-start"><b>Drivers Online</b></p>
                            </div>
                          </div>
                          <div className="flex">
                            <div className="w-[20%]">
                              <img src="/taxiOfflineMod.png" alt="" />
                            </div>
                            <div className="w-[80%] pl-2">
                              <p className="text-md text-start"><b>{tripsInsight?.onlineStatusChart?.offline}</b></p>
                              <p className="text-sm text-start"><b>Drivers Offline</b></p>
                            </div>
                          </div>
                          <div className="flex">
                            <div className="w-[20%]">
                              <img src="/riderOnline.svg" alt="" />
                            </div>
                            <div className="w-[80%] pl-2">
                              <p className="text-md text-start"><b>{tripsInsight?.onlineStatusChart?.onlineRiders}</b></p>
                              <p className="text-sm text-start"><b>Riders Online</b></p>
                            </div>
                          </div>
                          <div className="flex">
                            <div className="w-[20%]">
                              <img src="/riderOfflineMod.png" alt="" />
                            </div>
                            <div className="w-[80%] pl-2">
                              <p className="text-md text-start"><b>{tripsInsight?.onlineStatusChart?.offlineRiders}</b></p>
                              <p className="text-sm text-start"><b>Riders Offline</b></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={`${styles.tripDetailsWrapper} max-h-[78vh] overflow-y-auto scrollbar-none pr-1`}>
                    <div className={styles.tripDetailsCard}>
                      <div className="bg-[#FFFFFF] rounded-lg p-5">
                        <div className="flex items-center justify-between mb-6">
                          <p className="text-[18px] leading-[24px] font-semibold text-[#1A1A1A]">
                            Current trip
                          </p>
                          <button
                            type="button"
                            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#E5E7EB] bg-[#FDFDFD]"
                            onClick={() => setSelectedTrip(null)}
                            aria-label="Back"
                          >
                            <img src="/arrowLeftFromLine.svg" alt="" className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-start justify-between gap-4 mb-4">
                          <p className="text-[18px] leading-[24px] font-bold text-[#1A1A1A]">
                            {selectedTripSubtitle}
                          </p>
                          <p className="text-[16px] leading-[22px] font-semibold text-[#1A1A1A] text-right whitespace-nowrap">
                            {formatCurrency(
                              selectedTrip?.viewTrip?.tripPrice ??
                                selectedTrip?.viewTrip?.estimatedPrice
                            )}
                            {selectedTrip?.viewTrip?.paymentType
                              ? ` (${String(selectedTrip?.viewTrip?.paymentType).toLowerCase()})`
                              : ''}
                          </p>
                        </div>

                        <div className="flex gap-3 pb-4 border-b border-b-[#E6E6E6]">
                          <OriginIcon />
                          <div className="min-w-0">
                            <p className="text-xs text-[#9A9A9A]">Origin</p>
                            <p className="text-[16px] leading-[22px] font-semibold text-[#1A1A1A] break-words">
                              {selectedTrip?.viewTrip?.origin || '-'}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3 py-4 border-b border-b-[#E6E6E6]">
                          <DestinationIcon />
                          <div className="min-w-0">
                            <p className="text-xs text-[#9A9A9A]">Destination</p>
                            <p className="text-[16px] leading-[22px] font-semibold text-[#1A1A1A] break-words">
                              {selectedTrip?.viewTrip?.destination || '-'}
                            </p>
                            <p className="text-xs text-[#737373] mt-1 break-words">
                              {selectedTrip?.viewTrip?.origin || ''}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3 py-4 border-b border-b-[#E6E6E6]">
                          <ClockIcon />
                          <div className="min-w-0">
                            <p className="text-xs text-[#9A9A9A]">Trip started</p>
                            <p className="text-[16px] leading-[22px] font-semibold text-[#1A1A1A] break-words">
                              {formatDate(selectedTrip?.viewTrip?.tripStarted)}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <ClockIcon />
                          <div className="min-w-0">
                            <p className="text-xs text-[#9A9A9A]">Trip to end</p>
                            <p className="text-[16px] leading-[22px] font-semibold text-[#1A1A1A] break-words">
                              {formatDate(selectedTrip?.viewTrip?.tripEnded)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <CarOccupantDetailsCard
                        isRider={true}
                        name={selectedTrip?.viewTrip?.riderFullName}
                        location={selectedTrip?.viewTrip?.riderLocation}
                        tripCount={selectedTrip?.viewTrip?.riderTripCount}
                        rating={selectedTrip?.viewTrip?.riderRating}
                        viewProfileLink={
                          selectedTrip?.viewTrip?.riderId &&
                          `/riders/${selectedTrip?.viewTrip?.riderId}?fallbackUrl=${router.asPath}`
                        }
                        buttonTitle="View Rider's Profile"
                        imageUri={selectedTrip?.viewTrip?.riderImage}
                        isLoading={Boolean(selectedTrip?.loading)}
                        permissionKey="riders_permissions"
                      />
                    </div>
                    {hasDriverDetails && (
                      <div className="mt-4">
                        <CarOccupantDetailsCard
                          isRider={false}
                          name={selectedTrip?.viewTrip?.driverFullname}
                          location={selectedTrip?.viewTrip?.driverLocation}
                          tripCount={selectedTrip?.viewTrip?.driverTripCount}
                          rating={selectedTrip?.viewTrip?.driverRating}
                          viewProfileLink={
                            selectedTrip?.viewTrip?.driverId &&
                            `/drivers/active/${selectedTrip?.viewTrip?.driverId}?fallbackUrl=${router.asPath}`
                          }
                          carModel={capitalizeAllFirstLetters(selectedTrip?.viewTrip?.carModel)}
                          carPlateNumber={selectedTrip?.viewTrip?.plateNumber}
                          buttonTitle="View Driver's Profile"
                          imageUri={selectedTrip?.viewTrip?.driverImage}
                          isLoading={Boolean(selectedTrip?.loading)}
                          permissionKey="drivers_permissions"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
        </AppLayout>
    </>
  );
};

export default IndexPage;
