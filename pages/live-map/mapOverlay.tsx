// components/MapOverlay.tsx
import React, { useEffect, useState } from 'react';
import { 
    GoogleMap,
    useLoadScript,
    Marker
} from '@react-google-maps/api';
import { useGetAllDriversQuery } from '@/api-services/driversService';
import { useGetAllRidesQuery } from '@/api-services/ridersService';
import CloseIcon from '@/components/icons/CloseIcon';
import Card from '@/components/common/Card';
import { useModalContext } from "@/contexts/ModalContext";
import useClickOutside from '@/hooks/useClickOutside';
import Avatar from '@/components/common/Avatar';
import { capitalizeAllFirstLetters } from '@/utils';
import { useRouter } from 'next/router';
import { io } from "socket.io-client";
import { DEV_MONITOR_URL } from '@/constants';
import { useDashboardState } from "@/contexts/StateSegmentationContext";
//const socket = io(`${DEV_MONITOR_URL}`);
const socket = io(`https://monitor-dev.up.railway.app`);


interface MapOverlayProps {
  onlineStatusDriver: string;
  onlineStatusRider: string;
  enableRiderOption: any;
  enableDriverOption: any;
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
    <Card elevation={true} maxWidth="400px" maxHeight="95vh">
      <div className="p-4 overflow-x-hidden relative" ref={ref}>
        <div className="flex justify-between">
          <p className="text-xl font-bold">{type === 'driver' ? 'Driver' : 'Rider'}</p>
          <p><span
            className="absolute top-4 right-4 cursor-pointer"
            onClick={handleClose}
          >
            <CloseIcon />
          </span></p>
        </div>
        <div className="flex p-4 justify-between">
          <div className="w-[25%]">
            {(driver.imageUrl || driver.fullName) && (
              <Avatar
                imageUrl={driver.imageUrl}
                fallBack={`${driver.fullName && driver.fullName[0]}`}
                size="md"
              />
            )}
          </div>
          <div className="w-[75%]">
            <p>{capitalizeAllFirstLetters(driver.fullName)}</p>
            <p>{capitalizeAllFirstLetters(driver.onlineStatus)}</p>
          </div>
        </div>
        <p className="text-md font-bold cursor-pointer" onClick={() => {type === 'driver' ? router.push(`/drivers/active/${driver.userId}?fallbackUrl=${router.asPath}`) : router.push(`/riders/${driver.riderId}?fallbackUrl=${router.asPath}`)}}>Click to view profile</p>
      </div>
    </Card>
  )
}

const MapOverlay: React.FC<MapOverlayProps> = ({ onlineStatusDriver, onlineStatusRider, enableRiderOption, enableDriverOption }) => {
  const { setModalContent } = useModalContext();
  const [directions, setDirections] = useState<any>(null);
  const [map, setMap] = React.useState(null);
  const [coordinates, setCoordinates] = React.useState<any[]>([]);
  const [riderCoordinates, setRiderCoordinates] = React.useState<any[]>([]);
  const [iconUrlDriver, setIconUrlDriver] = useState('');
  const [iconUrlRider, setIconUrlRider] = useState('');
  const { dashboardState, setDashboardState } = useDashboardState();

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
      }) : [];

      const ridersCoordinates = enableRiderOption ? riders?.data?.map((d: any) => {
        if (d.coordinate && d.coordinate.length > 0) return {lat: typeof d.coordinate[1] === 'number'
        ? d.coordinate[1] : parseFloat(d.coordinate[1]), lng: typeof d.coordinate[0] === 'number'
        ? d.coordinate[0] : parseFloat(d.coordinate[0]), personnel: d, type: 'rider', _id: d.riderId}
      }) : [];

      const allCoordinates = driversCoordinates.concat(ridersCoordinates)

      console.log({riderCoordinates}, riders?.data?.length);
      
      setCoordinates(allCoordinates);
      
      const driverIcon = onlineStatusDriver === 'offline' ? '/taxiOffline.svg' : '/taxiOnline.svg';
      const riderIcon = onlineStatusRider === 'offline' ? '/riderOffline.svg': '/riderOnline.svg';
      setIconUrlDriver(driverIcon);
      setIconUrlRider(riderIcon);

      if (onlineStatusDriver === 'online' || onlineStatusRider === 'online') {
        // Join the 'location-update' room
        socket.emit('join-room', 'location-update');
      }
  
      // Listen to the 'location' event
      socket.on('location', (data: any) => {
          const newCoordinates = updateCoordinateById(allCoordinates, data)
          
          setCoordinates(newCoordinates);
          
          const driverIcon = onlineStatusDriver === 'offline' ? '/taxiOffline.svg' : '/taxiOnline.svg';
          const riderIcon = onlineStatusRider === 'offline' ? '/riderOffline.svg': '/riderOnline.svg';
          setIconUrlDriver(driverIcon);
          setIconUrlRider(riderIcon);
      });
        
      return () => {
        socket.disconnect();
      };
    }
  }, [drivers, riders, enableRiderOption, enableDriverOption]);

  const center = coordinates.length > 0 ? coordinates[0] : { lat: 6.5244, lng: 3.3792 };
  
  const handleMarkerClick = (index: any, coord: any) => {
    console.log(coord);
    setModalContent(
      <DriverModal driver={coord.personnel} handleClose={() => setModalContent(null)} type={coord.type} />
    )
  };

  const onLoad = React.useCallback(function callback(map: any) {
    const origin = { lat: center.lat, lng: center.lng };
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(origin);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  return (
    <div className="w-full h-full rounded-lg overflow-hidden" id="map">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center} onLoad={onLoad}>
          {coordinates.map((coord, index) => (
            <>
            {
              coord &&
              <Marker
                key={index}
                position={coord}
                icon={{
                  url: coord.type === 'driver' ? iconUrlDriver : iconUrlRider, // Replace with the actual path to your custom icon
                  scaledSize: new window.google.maps.Size(40, 40), // Adjust the size as needed
                }} 
                onClick={() => handleMarkerClick(index, coord)}
              />
            }
            </>
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default MapOverlay;
