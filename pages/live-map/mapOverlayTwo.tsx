// components/MapOverlay.tsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { 
    GoogleMap,
    useLoadScript,
    Marker
} from '@react-google-maps/api';
import { useGetAllDriversQuery } from '@/api-services/driversService';
import { useGetAllRidesQuery } from '@/api-services/ridersService';
import { tripsApi } from '@/api-services/tripsService';
import CloseIcon from '@/components/icons/CloseIcon';
import Card from '@/components/common/Card';
import useClickOutside from '@/hooks/useClickOutside';
import Avatar from '@/components/common/Avatar';
import { capitalizeAllFirstLetters } from '@/utils';
import { useRouter } from 'next/router';
import { io } from "socket.io-client";
import { DEV_MONITOR_URL } from '@/constants';
import { useDashboardState } from "@/contexts/StateSegmentationContext";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}` || '';
//const socket = io(`${DEV_MONITOR_URL}`);
const socket = io(`https://monitor-dev.up.railway.app`);
const TRIP_START_POINT_ICON = '/trip-start-point.png';


interface MapOverlayProps {
  onlineStatusDriver: string;
  onlineStatusRider: string;
  enableRiderOption: any;
  enableDriverOption: any;
  isFullscreen?: boolean;
  tripFilter?: Array<'pending' | 'completed' | 'active' | 'cancelled'>;
  selectedTripId?: string | null;
  onTripSelectionChange?: (payload: { id: string; loading: boolean; status?: string; viewTrip?: any } | null) => void;
}

interface DriverModalProps {
  driver: any;
  handleClose: () => void;
  type: string;
}

function updateCoordinateById(arrayOfObjects: any, singleObject: any) {
  const updatedArray = arrayOfObjects.map((obj: any) => {
    if (obj && obj._id === singleObject._id) {
      // Update the coordinate property with the value from the singleObject
      obj.coordinate = singleObject.coordinate;
    }
    return obj;
  });

  return updatedArray;
}

const DriverModal : React.FC<DriverModalProps> = ({ driver, handleClose, type }) => {
  const ref = useClickOutside<HTMLDivElement>(() => handleClose());
  const router = useRouter();

  return (
    <Card elevation={true} width="20vw" maxHeight="70vh">
      <div className="p-3 overflow-x-hidden relative" ref={ref}>
        <div className="flex justify-between">
          <p className="text-base font-bold">{type === 'driver' ? 'Driver' : 'Rider'}</p>
          <p><span
            className="absolute top-4 right-4 cursor-pointer"
            onClick={handleClose}
          >
            <CloseIcon />
          </span></p>
        </div>
        <div className="flex py-3 justify-between">
          <div className="w-[25%]">
            {(driver.imageUrl || driver.fullName) && (
              <Avatar
                imageUrl={driver.imageUrl}
                fallBack={`${driver.fullName && driver.fullName[0]}`}
                size="sm"
              />
            )}
          </div>
          <div className="w-[75%]">
            <p className="text-sm">{capitalizeAllFirstLetters(driver.fullName)}</p>
            <p className="text-sm">{capitalizeAllFirstLetters(driver.onlineStatus)}</p>
          </div>
        </div>
        <p className="text-xs font-semibold cursor-pointer" onClick={() => {type === 'driver' ? router.push(`/drivers/active/${driver.userId}?fallbackUrl=${router.asPath}`) : router.push(`/riders/${driver.riderId}?fallbackUrl=${router.asPath}`)}}>Click to view profile</p>
      </div>
    </Card>
  )
}

const MapOverlayTwo: React.FC<MapOverlayProps> = ({
  onlineStatusDriver,
  onlineStatusRider,
  enableRiderOption,
  enableDriverOption,
  isFullscreen = false,
  tripFilter = ['completed'],
  selectedTripId = null,
  onTripSelectionChange,
}) => {
  const [directions, setDirections] = useState<any>(null);
  const [coordinates, setCoordinates] = React.useState<any[]>([]);
  const [baseCoordinates, setBaseCoordinates] = React.useState<any[]>([]);
  const [tripCoordinates, setTripCoordinates] = React.useState<any[]>([]);
  const [tripStartPoints, setTripStartPoints] = useState<Record<string, [number, number]>>({});
  const [selectedTripMeta, setSelectedTripMeta] = useState<{ id: string; status?: string; driverId?: string } | null>(null);
  const [selectedTripView, setSelectedTripView] = useState<any | null>(null);
  const [selectedTripLiveLocation, setSelectedTripLiveLocation] = useState<[number, number] | null>(null);
  const [routeSegments, setRouteSegments] = useState<{ completed?: [number, number][]; remaining?: [number, number][] } | null>(null);
  const [riderCoordinates, setRiderCoordinates] = React.useState<any[]>([]);
  const [iconUrlDriver, setIconUrlDriver] = useState('');
  const [iconUrlRider, setIconUrlRider] = useState('');
  const [mapReady, setMapReady] = useState(false);
  const [tripsByStatus, setTripsByStatus] = useState<Record<string, any[]>>({});
  const { dashboardState, setDashboardState } = useDashboardState();
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<string, { marker: mapboxgl.Marker; hash: string }>>(new Map());
  const hasCenteredRef = useRef(false);
  const tripStartPointCacheRef = useRef<Map<string, [number, number]>>(new Map());
  const selectedTripCacheRef = useRef<Map<string, any>>(new Map());
  const activeTripSocketRef = useRef<any | null>(null);
  const routeRequestRef = useRef(0);
  const dispatch = useDispatch<any>();
  const [hoveredCoord, setHoveredCoord] = useState<any | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ left: number; top: number } | null>(null);
  const [, setIsTooltipHovered] = useState(false);
  const hideTimeoutRef = useRef<number | null>(null);
  const hoveredCoordRef = useRef<any | null>(null);
  const isTooltipHoveredRef = useRef(false);

  const {
    data: drivers,
    isLoading: driversLoading,
    isError: driversError,
    refetch: reloadDrivers,
    error,
  } = useGetAllDriversQuery(
    {
      carOwner: true,
      driverStatus: "active",
      limit: 1000,
      page: 1,
      search: '',
      order: 'newest_first',
      onlineStatus: onlineStatusDriver,
      dashboard_state: dashboardState 
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const { 
    data: riders, 
    isLoading: ridersLoading, 
    isError: ridersError, 
    refetch: riderRefetch
  } = useGetAllRidesQuery(
    {
      limit: 1000,
      page: 1,
      search: '',
      order: 'newest_first',
      status: 'no',
      onlineStatus: onlineStatusRider
    },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const selectedStatuses = Array.isArray(tripFilter) ? tripFilter : [];
  const getQueryStatus = useCallback((status: string) => {
    return status === 'active' ? 'started' : status;
  }, []);

  const getTripIcon = useCallback((status?: string) => {
    if (status === 'started' || status === 'active') return '/car_active.png';
    if (status === 'completed') return '/car_completed.png';
    if (status === 'cancelled') return '/car_cancelled.png';
    return '/car_pending.png';
  }, []);

  const getRouteColor = useCallback((status?: string) => {
    if (status === 'started' || status === 'active') return '#16a34a';
    if (status === 'completed') return '#0ea5e9';
    if (status === 'cancelled') return '#ef4444';
    return '#f59e0b';
  }, []);

  const ROUTE_COMPLETED_SOURCE = 'selected-trip-route-completed-source';
  const ROUTE_COMPLETED_LAYER = 'selected-trip-route-completed-layer';
  const ROUTE_REMAINING_SOURCE = 'selected-trip-route-remaining-source';
  const ROUTE_REMAINING_LAYER = 'selected-trip-route-remaining-layer';

  const fetchRouteCoordinates = useCallback(async (start: [number, number], end: [number, number]) => {
    if (!mapboxgl.accessToken) return null;
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`;
    try {
      const response = await fetch(url);
      if (!response.ok) return null;
      const data = await response.json();
      const coordinates = data?.routes?.[0]?.geometry?.coordinates;
      if (!Array.isArray(coordinates)) return null;
      return coordinates as [number, number][];
    } catch (error) {
      return null;
    }
  }, []);

  const normalizePoints = useCallback((points: [number, number][]) => {
    const result: [number, number][] = [];
    points.forEach((point) => {
      const last = result[result.length - 1];
      if (!last || last[0] !== point[0] || last[1] !== point[1]) {
        result.push(point);
      }
    });
    return result;
  }, []);

  const clampPoints = useCallback((points: [number, number][], maxPoints = 25) => {
    if (points.length <= maxPoints) return points;
    const trimmed: [number, number][] = [];
    const step = (points.length - 1) / (maxPoints - 1);
    for (let i = 0; i < maxPoints; i += 1) {
      const index = Math.round(i * step);
      trimmed.push(points[index]);
    }
    return trimmed;
  }, []);

  const fetchRouteWithWaypoints = useCallback(
    async (points: [number, number][]) => {
      if (!mapboxgl.accessToken || points.length < 2) return null;
      const cleaned = clampPoints(normalizePoints(points));
      if (cleaned.length < 2) return null;
      const coordString = cleaned.map((point) => `${point[0]},${point[1]}`).join(';');
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordString}?geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`;
      try {
        const response = await fetch(url);
        if (!response.ok) return null;
        const data = await response.json();
        const coordinates = data?.routes?.[0]?.geometry?.coordinates;
        if (!Array.isArray(coordinates)) return null;
        return coordinates as [number, number][];
      } catch (error) {
        return null;
      }
    },
    [clampPoints, normalizePoints]
  );

  useEffect(() => {
    let isCancelled = false;
    if (selectedStatuses.length === 0) {
      setTripsByStatus({});
      return;
    }

    const loadTrips = async () => {
      const results: Record<string, any[]> = {};
      await Promise.all(
        selectedStatuses.map(async (status) => {
          const subscription = dispatch(
            tripsApi.endpoints.getAllTrips.initiate(
              {
                limit: 300,
                page: 1,
                status: getQueryStatus(status) as any,
                search: '',
                order: 'newest_first',
                type: 'trip',
              },
              { forceRefetch: true }
            )
          );
          try {
            const response: any = await subscription.unwrap();
            results[status] = response?.data?.data || [];
          } catch (error) {
            results[status] = [];
          } finally {
            subscription.unsubscribe();
          }
        })
      );

      if (!isCancelled) {
        setTripsByStatus(results);
      }
    };

    loadTrips();

    return () => {
      isCancelled = true;
    };
  }, [dispatch, getQueryStatus, selectedStatuses.join('|')]);

  const { isLoaded } = useLoadScript({
      googleMapsApiKey: 'AIzaSyBKw_APHMTRn37FXj0dd7_CptLColGP4Gc',
  });

  const mapContainerStyle = {
      height: '90vh',
      width: '100%',
  };

  const joinRoom = () => {
    socket.emit("location-update", {});
  };

  useEffect(() => {
    if (drivers && riders) {
      const driversCoordinates = enableDriverOption ? drivers?.data?.map((d: any) => {
        if (d.coordinate && d.coordinate.length > 0) return {lat: typeof d.coordinate[1] === 'number'
        ? d.coordinate[1] : parseFloat(d.coordinate[1]), lng: typeof d.coordinate[0] === 'number'
        ? d.coordinate[0] : parseFloat(d.coordinate[0]), personnel: d, type: 'driver', _id: d.driverId}
      }).filter(Boolean) : [];

      const ridersCoordinates = enableRiderOption ? riders?.data?.map((d: any) => {
        if (d.coordinate && d.coordinate.length > 0) return {lat: typeof d.coordinate[1] === 'number'
        ? d.coordinate[1] : parseFloat(d.coordinate[1]), lng: typeof d.coordinate[0] === 'number'
        ? d.coordinate[0] : parseFloat(d.coordinate[0]), personnel: d, type: 'rider', _id: d.riderId}
      }).filter(Boolean) : [];

      const allCoordinates = driversCoordinates.concat(ridersCoordinates);
      
      setBaseCoordinates(allCoordinates);
      
      const driverIcon = onlineStatusDriver === 'offline' ? '/taxiOfflineMod.png' : '/taxiOnline.svg';
      const riderIcon = onlineStatusRider === 'offline' ? '/riderOfflineMod.png' : '/riderOnline.svg';
      setIconUrlDriver(driverIcon);
      setIconUrlRider(riderIcon);

      if (onlineStatusDriver === 'online' || onlineStatusRider === 'online') {
        // Join the 'location-update' room
        socket.emit('join-room', 'location-update');
      }
  
      // Listen to the 'location' event
      socket.on('location', (data: any) => {
          const newCoordinates = updateCoordinateById(allCoordinates, data)
          
          setBaseCoordinates(newCoordinates);
          
          const driverIcon = onlineStatusDriver === 'offline' ? '/taxiOfflineMod.png' : '/taxiOnline.svg';
          const riderIcon = onlineStatusRider === 'offline' ? '/riderOfflineMod.png' : '/riderOnline.svg';
          setIconUrlDriver(driverIcon);
          setIconUrlRider(riderIcon);
      });
        
      return () => {
        socket.disconnect();
      };
    }
  }, [drivers, riders, enableRiderOption, enableDriverOption, onlineStatusDriver, onlineStatusRider]);

  useEffect(() => {
    const nonActiveTrips = selectedStatuses
      .filter((status) => status !== 'active')
      .flatMap((status) => tripsByStatus[status] || []);
    if (nonActiveTrips.length === 0) {
      setTripStartPoints({});
      return;
    }
    let isCancelled = false;
    const tripList = nonActiveTrips.slice(0, 300);
    const tripIds = tripList
      .map((trip: any) => trip?._id || trip?.id)
      .filter(Boolean)
      .map((id: string) => String(id));
    const missingIds = tripIds.filter((id) => !tripStartPointCacheRef.current.has(id));

    const loadStartPoints = async () => {
      const updateStateFromCache = () => {
        const nextStartPoints: Record<string, [number, number]> = {};
        tripIds.forEach((id) => {
          const point = tripStartPointCacheRef.current.get(id);
          if (point) {
            nextStartPoints[id] = point;
          }
        });
        setTripStartPoints(nextStartPoints);
      };

      updateStateFromCache();

      const batchSize = 5;
      for (let i = 0; i < missingIds.length && !isCancelled; i += batchSize) {
        const batch = missingIds.slice(i, i + batchSize);
        await Promise.all(
          batch.map(async (id) => {
            const subscription = dispatch(
              tripsApi.endpoints.viewTrip.initiate({ id }, { forceRefetch: true })
            );
            try {
              const result: any = await subscription.unwrap();
              const startPoint = result?.startPoint;
              if (Array.isArray(startPoint) && startPoint.length === 2) {
                const lng = typeof startPoint[0] === 'number' ? startPoint[0] : parseFloat(startPoint[0]);
                const lat = typeof startPoint[1] === 'number' ? startPoint[1] : parseFloat(startPoint[1]);
                if (!Number.isNaN(lng) && !Number.isNaN(lat)) {
                  tripStartPointCacheRef.current.set(id, [lng, lat]);
                }
              }
            } catch (error) {
              // ignore failed trip fetch
            } finally {
              subscription.unsubscribe();
            }
          })
        );

        if (isCancelled) return;
        updateStateFromCache();
        if (i + batchSize < missingIds.length) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      }
    };

    loadStartPoints();

    return () => {
      isCancelled = true;
    };
  }, [tripsByStatus, selectedStatuses.join('|'), dispatch]);

  useEffect(() => {
    const tripListByStatus = selectedStatuses.map((status) => ({
      status,
      trips: (tripsByStatus[status] || []).slice(0, 300),
    }));
    const driverCoordinateMap = new Map<string, { lat: number; lng: number }>();

    baseCoordinates.forEach((coord: any) => {
      if (coord?.type === 'driver' && coord?._id) {
        driverCoordinateMap.set(String(coord._id), { lat: coord.lat, lng: coord.lng });
      }
    });

    const nextTripCoordinates = tripListByStatus
      .flatMap(({ status, trips }) => {
        const tripIcon = getTripIcon(getQueryStatus(status));
        return trips
          .map((trip: any) => {
            const id = trip?._id || trip?.id;
            if (!id) return null;
            const driverId =
              trip?.driver?._id || trip?.driverId || trip?.driver_id || trip?.driver_details?._id || undefined;

            let point: [number, number] | null = null;

            if (status === 'active') {
              if (!driverId) return null;
              const driverCoord = driverCoordinateMap.get(String(driverId));
              if (!driverCoord) return null;
              point = [driverCoord.lng, driverCoord.lat];
            } else {
              const startPoint = tripStartPoints[String(id)];
              if (Array.isArray(startPoint) && startPoint.length === 2) {
                point = startPoint;
              }
            }

            if (!point) return null;

            return {
              lat: typeof point[1] === 'number' ? point[1] : parseFloat(point[1]),
              lng: typeof point[0] === 'number' ? point[0] : parseFloat(point[0]),
              type: 'trip',
              status: trip?.status || getQueryStatus(status),
              _id: id,
              iconUrl: tripIcon,
              driverId,
              trip,
            };
          })
          .filter(Boolean);
      });

    setTripCoordinates(nextTripCoordinates);
  }, [tripsByStatus, selectedStatuses.join('|'), baseCoordinates, tripStartPoints, getTripIcon, getQueryStatus]);

  useEffect(() => {
    if (!selectedTripId) {
      setSelectedTripMeta(null);
      setSelectedTripView(null);
      setSelectedTripLiveLocation(null);
      setRouteSegments(null);
      routeRequestRef.current += 1;
      if (activeTripSocketRef.current) {
        activeTripSocketRef.current.disconnect();
        activeTripSocketRef.current = null;
      }
      return;
    }

    let isCancelled = false;
    const tripList = selectedStatuses.flatMap((status) => tripsByStatus[status] || []) as any[];
    const baseTrip: any = tripList.find((trip: any) => String(trip?._id || trip?.id) === String(selectedTripId));
    const fallbackStatus = selectedStatuses.includes('active') ? 'started' : selectedStatuses[0] || '';
    const status = baseTrip?.status || fallbackStatus;
    const driverId =
      baseTrip?.driver?._id || baseTrip?.driverId || baseTrip?.driver_id || baseTrip?.driver_details?._id || undefined;

    setSelectedTripMeta({ id: String(selectedTripId), status, driverId: driverId ? String(driverId) : undefined });
    setSelectedTripLiveLocation(null);
    setRouteSegments(null);
    routeRequestRef.current += 1;

    onTripSelectionChange?.({ id: String(selectedTripId), loading: true, status });

    const cached = selectedTripCacheRef.current.get(String(selectedTripId));
    if (cached) {
      setSelectedTripView(cached);
      onTripSelectionChange?.({ id: String(selectedTripId), loading: false, status, viewTrip: cached });
      return;
    }

    const loadTrip = async () => {
      const subscription = dispatch(
        tripsApi.endpoints.viewTrip.initiate({ id: String(selectedTripId) }, { forceRefetch: true })
      );
      try {
        const result: any = await subscription.unwrap();
        if (isCancelled) return;
        selectedTripCacheRef.current.set(String(selectedTripId), result);
        setSelectedTripView(result);
        onTripSelectionChange?.({ id: String(selectedTripId), loading: false, status, viewTrip: result });
      } catch (error) {
        if (!isCancelled) {
          onTripSelectionChange?.({ id: String(selectedTripId), loading: false, status });
        }
      } finally {
        subscription.unsubscribe();
      }
    };

    loadTrip();

    return () => {
      isCancelled = true;
    };
  }, [selectedTripId, tripsByStatus, dispatch, onTripSelectionChange, selectedStatuses.join('|')]);

  useEffect(() => {
    if (!selectedTripId) return;
    if (selectedTripMeta?.status !== 'started') return;
    if (!selectedTripMeta?.driverId) return;
    if (selectedTripLiveLocation) return;
    const driverCoord = baseCoordinates.find(
      (coord: any) => coord?.type === 'driver' && String(coord._id) === String(selectedTripMeta.driverId)
    );
    if (driverCoord) {
      setSelectedTripLiveLocation([driverCoord.lng, driverCoord.lat]);
    }
  }, [selectedTripId, selectedTripMeta?.status, selectedTripMeta?.driverId, selectedTripLiveLocation, baseCoordinates]);

  useEffect(() => {
    if (!selectedTripId) return;
    isTooltipHoveredRef.current = false;
    setHoveredCoord(null);
    setTooltipPosition(null);
  }, [selectedTripId]);

  useEffect(() => {
    const isActiveTrip = selectedTripMeta?.status === 'started';
    const orderId = selectedTripView?.orderId;

    if (!selectedTripId || !isActiveTrip || !orderId) {
      if (activeTripSocketRef.current) {
        activeTripSocketRef.current.disconnect();
        activeTripSocketRef.current = null;
      }
      return;
    }

    const tripSocket = io('https://rideservice-dev.up.railway.app');
    activeTripSocketRef.current = tripSocket;

    tripSocket.on('connect', () => {
      tripSocket.emit('join-room', [orderId]);
    });

    tripSocket.on('driver-location', (data: { lat: number; long: number }) => {
      setSelectedTripLiveLocation([data.long, data.lat]);
    });

    return () => {
      tripSocket.disconnect();
      if (activeTripSocketRef.current === tripSocket) {
        activeTripSocketRef.current = null;
      }
    };
  }, [selectedTripId, selectedTripMeta?.status, selectedTripView?.orderId]);

  const toLngLat = useCallback((point: any): [number, number] | null => {
    if (!Array.isArray(point) || point.length !== 2) return null;
    const lng = typeof point[0] === 'number' ? point[0] : parseFloat(point[0]);
    const lat = typeof point[1] === 'number' ? point[1] : parseFloat(point[1]);
    if (Number.isNaN(lng) || Number.isNaN(lat)) return null;
    return [lng, lat];
  }, []);

  const buildSelectedTripMarkers = useCallback(() => {
    if (!selectedTripId || !selectedTripMeta) return [];
    const status = selectedTripMeta.status;
    const tripIcon = getTripIcon(status);
    const driverId = selectedTripMeta.driverId;
    const startPoint = toLngLat(selectedTripView?.startPoint);
    const endPoint = toLngLat(selectedTripView?.endPoint);
    const driverCoord = driverId
      ? baseCoordinates.find((coord: any) => coord?.type === 'driver' && String(coord._id) === String(driverId))
      : null;

    let point: [number, number] | null = null;
    if (status === 'started') {
      point =
        selectedTripLiveLocation ||
        (driverCoord ? [driverCoord.lng, driverCoord.lat] : null) ||
        startPoint;
    } else {
      point = startPoint;
    }

    const markers: any[] = [];
    const samePoint =
      point !== null &&
      startPoint !== null &&
      point[0] === startPoint[0] &&
      point[1] === startPoint[1];

    if (point) {
      markers.push({
        lat: point[1],
        lng: point[0],
        type: 'trip',
        status,
        _id: String(selectedTripId),
        iconUrl: tripIcon,
      });
    }

    if (startPoint) {
      if (!point || samePoint) {
        if (markers.length > 0) {
          markers[0] = {
            ...markers[0],
            type: 'trip-start',
            iconUrl: TRIP_START_POINT_ICON,
          };
        } else {
          markers.push({
            lat: startPoint[1],
            lng: startPoint[0],
            type: 'trip-start',
            status,
            _id: `${String(selectedTripId)}-start`,
            iconUrl: TRIP_START_POINT_ICON,
          });
        }
      } else {
        markers.push({
          lat: startPoint[1],
          lng: startPoint[0],
          type: 'trip-start',
          status,
          _id: `${String(selectedTripId)}-start`,
          iconUrl: TRIP_START_POINT_ICON,
        });
      }
    }

    if (endPoint) {
      const hasTripIconAtEnd = markers.some(
        (marker: any) =>
          marker.lng === endPoint[0] &&
          marker.lat === endPoint[1] &&
          marker.iconUrl === tripIcon
      );

      if (!hasTripIconAtEnd) {
        markers.push({
          lat: endPoint[1],
          lng: endPoint[0],
          type: 'trip-end',
          status,
          _id: `${String(selectedTripId)}-end`,
          iconUrl: tripIcon,
        });
      }
    }

    return markers;
  }, [
    selectedTripId,
    selectedTripMeta,
    selectedTripView,
    selectedTripLiveLocation,
    baseCoordinates,
    toLngLat,
    getTripIcon,
  ]);

  useEffect(() => {
    if (!selectedTripId || !selectedTripMeta || !selectedTripView) {
      setRouteSegments(null);
      routeRequestRef.current += 1;
      return;
    }

    const status = selectedTripMeta.status;
    const historyCoords: [number, number][] | null =
      Array.isArray(selectedTripView.tripHistory) &&
      selectedTripView.tripHistory.length > 0
        ? selectedTripView.tripHistory
        : null;

    const startPoint = toLngLat(selectedTripView.startPoint);
    const endPoint = toLngLat(selectedTripView.endPoint);
    const driverId = selectedTripMeta.driverId;
    const driverCoord = driverId
      ? baseCoordinates.find((coord: any) => coord?.type === 'driver' && String(coord._id) === String(driverId))
      : null;
    const driverPoint = driverCoord ? ([driverCoord.lng, driverCoord.lat] as [number, number]) : null;
    const currentPoint =
      status === 'started' ? selectedTripLiveLocation || driverPoint || startPoint : endPoint;

    if (historyCoords) {
      const requestId = ++routeRequestRef.current;
      const loadHistoryRoute = async () => {
        const baseHistory: [number, number][] = [];
        if (startPoint) baseHistory.push(startPoint);
        baseHistory.push(...historyCoords);

        const historyPath = (() => {
          if (status !== 'started' || !currentPoint) {
            if (endPoint) baseHistory.push(endPoint);
            return baseHistory;
          }
          const last = baseHistory[baseHistory.length - 1];
          if (!last || last[0] !== currentPoint[0] || last[1] !== currentPoint[1]) {
            baseHistory.push(currentPoint);
          }
          return baseHistory;
        })();

        const completedRoute = await fetchRouteWithWaypoints(historyPath);
        if (routeRequestRef.current !== requestId) return;

        if (status === 'started' && endPoint && currentPoint) {
          const remainingRoute = await fetchRouteCoordinates(currentPoint, endPoint);
          if (routeRequestRef.current !== requestId) return;
          setRouteSegments({
            completed: completedRoute || historyPath,
            remaining: remainingRoute || [currentPoint, endPoint],
          });
          return;
        }

        setRouteSegments({ completed: completedRoute || historyPath });
      };

      loadHistoryRoute();
      return;
    }

    if (!startPoint || !endPoint) {
      setRouteSegments(null);
      routeRequestRef.current += 1;
      return;
    }

    const requestId = ++routeRequestRef.current;

    const loadRoutes = async () => {
      if (status === 'started') {
        if (!currentPoint) {
          setRouteSegments({ completed: [startPoint, endPoint] });
          return;
        }
        const completedRoute = await fetchRouteCoordinates(startPoint, currentPoint);
        const remainingRoute = await fetchRouteCoordinates(currentPoint, endPoint);
        if (routeRequestRef.current !== requestId) return;
        setRouteSegments({
          completed: completedRoute || [startPoint, currentPoint],
          remaining: remainingRoute || [currentPoint, endPoint],
        });
        return;
      }

      const fullRoute = await fetchRouteCoordinates(startPoint, endPoint);
      if (routeRequestRef.current !== requestId) return;
      setRouteSegments({ completed: fullRoute || [startPoint, endPoint] });
    };

    loadRoutes();
  }, [
    selectedTripId,
    selectedTripMeta,
    selectedTripView,
    selectedTripLiveLocation,
    baseCoordinates,
    toLngLat,
    fetchRouteCoordinates,
    fetchRouteWithWaypoints,
  ]);

  useEffect(() => {
    if (selectedTripId) {
      const markers = buildSelectedTripMarkers();
      setCoordinates(markers);
      return;
    }
    setCoordinates(baseCoordinates.concat(tripCoordinates));
  }, [selectedTripId, baseCoordinates, tripCoordinates, buildSelectedTripMarkers]);

  useEffect(() => {
    hasCenteredRef.current = false;
  }, [selectedTripId, selectedStatuses.join('|')]);

  const updateTooltipPosition = useCallback((coord: any) => {
    if (!mapRef.current) return;
    const point = mapRef.current.project([coord.lng, coord.lat]);
    setTooltipPosition({ left: point.x, top: point.y });
  }, []);

  const clearHideTimeout = useCallback(() => {
    if (hideTimeoutRef.current !== null) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const handleMarkerEnter = useCallback((coord: any) => {
    clearHideTimeout();
    setHoveredCoord(coord);
    updateTooltipPosition(coord);
  }, [clearHideTimeout, updateTooltipPosition]);

  const scheduleHideTooltip = useCallback(() => {
    clearHideTimeout();
    hideTimeoutRef.current = window.setTimeout(() => {
      if (!isTooltipHoveredRef.current) {
        setHoveredCoord(null);
        setTooltipPosition(null);
      }
    }, 150);
  }, [clearHideTimeout]);

  const handleTooltipEnter = useCallback(() => {
    clearHideTimeout();
    isTooltipHoveredRef.current = true;
    setIsTooltipHovered(true);
  }, [clearHideTimeout]);

  const handleTooltipLeave = useCallback(() => {
    isTooltipHoveredRef.current = false;
    setIsTooltipHovered(false);
    setHoveredCoord(null);
    setTooltipPosition(null);
  }, []);

  const handleTripClick = useCallback(
    (coord: any) => {
      const id = coord?._id;
      if (!id) return;
      if (selectedTripId && String(selectedTripId) === String(id)) return;
      const status = coord?.status;
      onTripSelectionChange?.({ id: String(id), loading: true, status });
    },
    [onTripSelectionChange, selectedTripId]
  );

  const createMarkerElement = useCallback((coord: any) => {
    const el = document.createElement('div');
    el.className = 'marker';
    const iconUrl = coord.iconUrl || (coord.type === 'driver' ? iconUrlDriver : iconUrlRider);
    el.style.backgroundImage = `url(${iconUrl})`;
    if (coord.type === 'driver') {
      el.style.width = '32px';
      el.style.height = '44px';
    } else if (coord.type === 'rider') {
      el.style.width = '32px';
      el.style.height = '32px';
    } else {
      el.style.width = '36px';
      el.style.height = '36px';
    }
    el.style.backgroundSize = 'contain';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.backgroundPosition = 'center';
    el.style.cursor = 'pointer';
    el.dataset.id = coord._id;
    if (coord.type === 'driver' || coord.type === 'rider') {
      el.addEventListener('mouseenter', () => handleMarkerEnter(coord));
      el.addEventListener('mouseleave', () => scheduleHideTooltip());
    } else if (coord.type === 'trip') {
      el.addEventListener('click', () => handleTripClick(coord));
    }
    return el;
  }, [iconUrlDriver, iconUrlRider, handleMarkerEnter, scheduleHideTooltip, handleTripClick]);

  const mapWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapWrapper.current) return;

    const markers = markersRef.current;
    const map = new mapboxgl.Map({
      container: mapWrapper.current,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [6.5244, 3.3792],
      zoom: 12
    });
    mapRef.current = map;

    map.on('load', () => {
      setMapReady(true);
    });

    const handleMapMove = () => {
      if (hoveredCoordRef.current) {
        updateTooltipPosition(hoveredCoordRef.current);
      }
    };

    map.on('move', handleMapMove);
    map.on('zoom', handleMapMove);
    map.on('resize', handleMapMove);

    return () => {
      map.off('move', handleMapMove);
      map.off('zoom', handleMapMove);
      map.off('resize', handleMapMove);
      markers.forEach((entry) => entry.marker.remove());
      markers.clear();
      mapRef.current = null;
      setMapReady(false);
      map.remove();
    };
  }, [updateTooltipPosition]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    const markerMap = markersRef.current;
    const nextKeys = new Set<string>();

    coordinates.forEach((coord: any, index: number) => {
      if (!coord) return;
      const id = coord._id ? String(coord._id) : `${coord.type}-${index}`;
      const key = `${coord.type}-${id}`;
      nextKeys.add(key);
      const lngLat: [number, number] = [coord.lng, coord.lat];
      const effectiveIcon =
        coord.iconUrl || (coord.type === 'driver' ? iconUrlDriver : coord.type === 'rider' ? iconUrlRider : '');
      const hash = `${coord.type}|${effectiveIcon}|${coord.lng}|${coord.lat}`;
      const existing = markerMap.get(key);

      if (existing) {
        if (existing.hash !== hash) {
          existing.marker.remove();
          const marker = new mapboxgl.Marker({ element: createMarkerElement(coord) })
            .setLngLat(lngLat)
            .addTo(map);
          markerMap.set(key, { marker, hash });
        } else {
          existing.marker.setLngLat(lngLat);
        }
      } else {
        const marker = new mapboxgl.Marker({ element: createMarkerElement(coord) })
          .setLngLat(lngLat)
          .addTo(map);
        markerMap.set(key, { marker, hash });
      }
    });

    markerMap.forEach((entry, key) => {
      if (!nextKeys.has(key)) {
        entry.marker.remove();
        markerMap.delete(key);
      }
    });

    if (!hasCenteredRef.current && coordinates.length > 0) {
      map.jumpTo({ center: [coordinates[0].lng, coordinates[0].lat], zoom: 12 });
      hasCenteredRef.current = true;
    }
  }, [coordinates, createMarkerElement, mapReady, iconUrlDriver, iconUrlRider]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    const removeLine = (sourceId: string, layerId: string) => {
      if (map.getLayer(layerId)) map.removeLayer(layerId);
      if (map.getSource(sourceId)) map.removeSource(sourceId);
    };

    const upsertLine = (
      sourceId: string,
      layerId: string,
      coords: [number, number][],
      options: { width: number; color: string; dash?: number[] }
    ) => {
      const data = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coords,
        },
      } as any;
      const existingSource = map.getSource(sourceId) as mapboxgl.GeoJSONSource | undefined;
      if (existingSource) {
        existingSource.setData(data);
      } else {
        map.addSource(sourceId, {
          type: 'geojson',
          data,
        });
        map.addLayer({
          id: layerId,
          type: 'line',
          source: sourceId,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': options.color,
            'line-width': options.width,
            ...(options.dash ? { 'line-dasharray': options.dash } : {}),
            'line-opacity': 0.9,
          },
        });
      }
    };

    if (!selectedTripId || !routeSegments) {
      removeLine(ROUTE_COMPLETED_SOURCE, ROUTE_COMPLETED_LAYER);
      removeLine(ROUTE_REMAINING_SOURCE, ROUTE_REMAINING_LAYER);
      return;
    }

    const status = selectedTripMeta?.status;
    const color = getRouteColor(status);
    const isActiveTrip = status === 'started';
    const completedCoords = routeSegments.completed || [];
    const remainingCoords = routeSegments.remaining || [];

    if (completedCoords.length > 1) {
      upsertLine(ROUTE_COMPLETED_SOURCE, ROUTE_COMPLETED_LAYER, completedCoords, {
        width: isActiveTrip ? 12 : 8,
        color,
      });
    } else {
      removeLine(ROUTE_COMPLETED_SOURCE, ROUTE_COMPLETED_LAYER);
    }

    if (isActiveTrip && remainingCoords.length > 1) {
      upsertLine(ROUTE_REMAINING_SOURCE, ROUTE_REMAINING_LAYER, remainingCoords, {
        width: 4,
        color,
        dash: [2, 2],
      });
    } else {
      removeLine(ROUTE_REMAINING_SOURCE, ROUTE_REMAINING_LAYER);
    }
  }, [
    mapReady,
    selectedTripId,
    selectedTripMeta?.status,
    routeSegments,
    getRouteColor,
    ROUTE_COMPLETED_SOURCE,
    ROUTE_COMPLETED_LAYER,
    ROUTE_REMAINING_SOURCE,
    ROUTE_REMAINING_LAYER,
  ]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.resize();
    }
  }, [isFullscreen]);

  useEffect(() => {
    hoveredCoordRef.current = hoveredCoord;
    if (hoveredCoord) {
      updateTooltipPosition(hoveredCoord);
    }
  }, [hoveredCoord, updateTooltipPosition]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${isFullscreen ? '' : 'rounded-lg'}`} id="map">
      <div ref={mapWrapper} className="mapWrapper" style={{width: '100%', height: '100%'}} />
      {hoveredCoord && tooltipPosition && (
        <div
          className="absolute z-20"
          style={{
            left: tooltipPosition.left,
            top: tooltipPosition.top,
            transform: 'translate(-50%, 14px)'
          }}
          onMouseEnter={handleTooltipEnter}
          onMouseLeave={handleTooltipLeave}
        >
          <DriverModal
            driver={hoveredCoord.personnel}
            handleClose={() => {
              setHoveredCoord(null);
              setTooltipPosition(null);
            }}
            type={hoveredCoord.type}
          />
        </div>
      )}
    </div>
  );
};

export default MapOverlayTwo;
