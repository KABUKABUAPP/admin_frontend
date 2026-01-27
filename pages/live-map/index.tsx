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
import TripDetailsCard from '@/components/modules/Trips/TripDetailsCard';
import OriginIcon from '@/components/icons/OriginIcon';
import DestinationIcon from '@/components/icons/DestinationIcon';
import CashIcon from '@/components/icons/CashIcon';
import WalletIcon from '@/components/icons/WalletIcon';
import ClockIcon from '@/components/icons/ClockIcon';
import RatingIcon from '@/components/icons/RatingIcon';
import { TripDetail } from '@/models/Trips';

const IndexPage: React.FC = () => {
  const [dropDownOptionSelected, setDropDownOptionSelected] = useState('');
  const [expandTrue, setExpandTrue] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [onlineStatusOption, setOnlineStatusOption] = useState<string>("online");
  const [onlineStatusOptionRider, setOnlineStatusOptionRider] = useState<string>("online");
  const [enableDriverOption, setEnableDriverOption] = useState(true);
  const [enableRiderOption, setEnableRiderOption] = useState(true);
  const [liveTrackingSelection, setLiveTrackingSelection] = useState<'pending' | 'completed' | 'active' | 'cancelled'>('completed');
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

  const selectedTripDetails: TripDetail[] | undefined = selectedTrip?.viewTrip
    ? (() => {
        const viewTrip = selectedTrip.viewTrip;
        const status = selectedTrip.status || '';
        const tripToEndStr =
          status === 'completed'
            ? 'Trip Ended'
            : status === 'cancelled'
            ? 'Trip Cancelled'
            : 'Trip To End';
        const formatDate = (value?: string) => {
          if (!value) return '';
          const date = new Date(value);
          return Number.isNaN(date.getTime()) ? '' : date.toLocaleString();
        };
        const estimatedPrice = viewTrip?.estimatedPrice ? String(viewTrip.estimatedPrice) : '';
        return [
          {
            topTitle: 'Origin',
            topValue: viewTrip.origin,
            topIcon: <OriginIcon />,
            bottomTitle: 'Destination',
            bottomValue: viewTrip.destination,
            bottomIcon: <DestinationIcon />,
            isRating: false,
          },
          {
            topTitle: 'Estimated Price',
            topValue: estimatedPrice,
            topIcon: <CashIcon />,
            bottomTitle: 'Payment Type',
            bottomValue: viewTrip.paymentType,
            bottomIcon: <WalletIcon />,
            isRating: false,
          },
          {
            topTitle: 'Order Created',
            topValue: formatDate(viewTrip.createdAt),
            topIcon: <ClockIcon />,
            bottomTitle: '',
            bottomValue: '',
            bottomIcon: '',
            isRating: false,
          },
          {
            topTitle: viewTrip.tripStarted ? 'Trip started' : '',
            topValue: formatDate(viewTrip.tripStarted),
            topIcon: <ClockIcon />,
            bottomTitle: viewTrip.tripEnded ? tripToEndStr : '',
            bottomValue: formatDate(viewTrip.tripEnded),
            bottomIcon: <ClockIcon />,
            isRating: true,
          },
          {
            topTitle: viewTrip.driverTripRating ? 'Driver Rating' : '',
            topValue: viewTrip.driverTripRating,
            topIcon: <RatingIcon fill="#000000" />,
            bottomTitle: viewTrip.riderTripRating ? 'Rider Rating' : '',
            bottomValue: viewTrip.riderTripRating,
            bottomIcon: <RatingIcon fill="#000000" />,
            isRating: true,
          },
        ];
      })()
    : undefined;

  const selectedTripSubtitle = (() => {
    const status = selectedTrip?.status;
    if (status === 'pending') return 'Driving to rider';
    if (status === 'started' || status === 'active') return 'Driving to destination';
    if (status === 'completed') return 'Trip completed';
    if (status === 'cancelled') return 'Cancelled trip';
    return 'Trip details';
  })();

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
              {!isMapFullscreen && (
              <div className="flex flex-col md:flex-row justify-between">
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
                                            checked={liveTrackingSelection === 'pending'}
                                            onChange={() => setLiveTrackingSelection('pending')}
                                          />
                                          <img src="/indicator_pending.png" alt="" className="ml-2 h-2 w-2" />
                                          <span className="ml-2 text-xs">Pending Trips</span>
                                        </label>

                                        <label className="inline-flex items-center mb-4">
                                          <input
                                            type="checkbox"
                                            className="form-checkbox text-yellow-400 checked:bg-yellow-400"
                                            name="completed-trips"
                                            checked={liveTrackingSelection === 'completed'}
                                            onChange={() => setLiveTrackingSelection('completed')}
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
                                            checked={liveTrackingSelection === 'active'}
                                            onChange={() => setLiveTrackingSelection('active')}
                                          />
                                          <img src="/indicator_active.png" alt="" className="ml-2 h-2 w-2" />
                                          <span className="ml-2 text-xs">Active Trips</span>
                                        </label>

                                        <label className="inline-flex items-center">
                                          <input
                                            type="checkbox"
                                            className="form-checkbox text-yellow-400 checked:bg-yellow-400"
                                            name="cancelled-trips"
                                            checked={liveTrackingSelection === 'cancelled'}
                                            onChange={() => setLiveTrackingSelection('cancelled')}
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
                  <div className={styles.tripDetailsWrapper}>
                    <button
                      type="button"
                      className={styles.tripDetailsBackButton}
                      onClick={() => setSelectedTrip(null)}
                    >
                      <img src="/arrowLeftFromLine.svg" alt="Back" />
                    </button>
                    <div className={styles.tripDetailsCard}>
                      {selectedTrip.loading ? (
                        <div className="p-4 text-left text-sm font-semibold">Loading trip details...</div>
                      ) : (
                        <TripDetailsCard cardSubTitle={selectedTripSubtitle} data={selectedTripDetails} />
                      )}
                    </div>
                  </div>
                )}
              </div>
              )}
            </div>
        </AppLayout>
    </>
  );
};

export default IndexPage;
