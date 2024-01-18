// components/MapOverlay.tsx
import React, { useEffect, useState } from 'react';
import { 
    GoogleMap,
    useLoadScript,
    Marker
} from '@react-google-maps/api';
import { useGetAllDriversQuery } from '@/api-services/driversService';
import { useModalContext } from "@/contexts/ModalContext";
import CloseIcon from '@/components/icons/CloseIcon';
import Card from '@/components/common/Card';
import useClickOutside from '@/hooks/useClickOutside';
import Avatar from '@/components/common/Avatar';
import { capitalizeAllFirstLetters } from '@/utils';
import { useRouter } from 'next/router';

interface MapOverlayProps {
  onlineStatus: string;
}

interface DriverModalProps {
  driver: any;
  handleClose: () => void;
  type: string;
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
        <p className="text-md font-bold cursor-pointer" onClick={() => {type === 'driver' ? router.push(`/drivers/active/${driver.userId}?fallbackUrl=${router.asPath}`) : router.push(`/riders/${driver.userId}?fallbackUrl=${router.asPath}`)}}>Click to view profile</p>
      </div>
    </Card>
  )
}

const MapOverlay: React.FC<MapOverlayProps> = ({ onlineStatus }) => {
  const { setModalContent } = useModalContext();
  const [directions, setDirections] = useState<any>(null);
  const [map, setMap] = React.useState(null);
  const [coordinates, setCoordinates] = React.useState<any[]>([]);
  const [riderCoordinates, setRiderCoordinates] = React.useState<any[]>([]);
  const [iconUrl, setIconUrl] = useState('/taxiOnline.svg')

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
      limit: 50,
      page: 1,
      search: '',
      order: 'newest_first',
      onlineStatus: onlineStatus
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const { isLoaded } = useLoadScript({
      googleMapsApiKey: 'AIzaSyAsBegv3npV0vvqFzyeYYEtWDGYGyEu3TI',
  });

  const mapContainerStyle = {
      height: '90vh',
      width: '100%',
  };

  useEffect(() => {
    if (drivers) {
      const theCoordinates = drivers?.data?.map((d: any) => {
        if (d.coordinate) return {lat: d.coordinate[0], lng: d.coordinate[1], personnel: d, type: 'driver'}
      });

      const testDriver = {
        driverId: '65a84224f92e6d865316d80d',
        fullName: 'full name',
        location: `driver state`,
        imageUrl: 'https://res.cloudinary.com/dv6dky6rb/image/upload/v1705525900/ride_service_images/mgcooi0vbsb21bmnoqa2.web',
        driverType: "Regular Driver",
        totalTrips: 30,
        walletBalance: "0",
        status: 'active',
        userId: '65a841e9f92e6d865316d7ee',
        statusRemark: 'approved',
        dateDeleted: "NOT DONE",
        deletionReason: '',
        inspectionCode: '',
        onlineStatus: 'online',
        onboardStep: 6,
        coordinate: undefined
      }

      const zeeCoordinates = [
        { lat: 6.5244, lng: 3.3792, personnel: testDriver, type: 'driver' },
        { lat: 6.5761, lng: 3.3431, personnel: testDriver, type: 'driver'  },
        { lat: 6.4281, lng: 3.4215, personnel: testDriver, type: 'driver'  },
        { lat: 6.5833, lng: 3.3433, personnel: testDriver, type: 'driver'  },
        { lat: 6.5951, lng: 3.3423, personnel: testDriver, type: 'driver'  },
        { lat: 6.5244, lng: 3.3792, personnel: testDriver, type: 'driver'  },
        { lat: 6.5244, lng: 3.3792, personnel: testDriver, type: 'driver'  },
        { lat: 6.5645, lng: 3.3434, personnel: testDriver, type: 'driver'  },
        { lat: 6.4654, lng: 3.4064, personnel: testDriver, type: 'driver'  },
        { lat: 6.5244, lng: 3.3792, personnel: testDriver, type: 'driver'  },
        { lat: 6.5054, lng: 3.3581, personnel: testDriver, type: 'driver'  },
        { lat: 6.4281, lng: 3.4215, personnel: testDriver, type: 'driver'  },
        { lat: 6.5244, lng: 3.3792, personnel: testDriver, type: 'driver'  },
        { lat: 6.5244, lng: 3.3792, personnel: testDriver, type: 'driver'  },
        { lat: 6.5244, lng: 3.3792, personnel: testDriver, type: 'driver'  },
        { lat: 6.5244, lng: 3.3792, personnel: testDriver, type: 'driver'  },
        { lat: 6.5244, lng: 3.3792, personnel: testDriver, type: 'driver'  }
      ]
      
      const testRider = testDriver;

      const zeeCoordinatesTwo = [
        { lat: 6.5244, lng: 3.3792, personnel: testRider, type: 'rider' },
        { lat: 6.5210, lng: 3.3792, personnel: testRider, type: 'rider' },
        { lat: 6.4281, lng: 3.4215, personnel: testRider, type: 'rider' },
        { lat: 6.5346, lng: 3.3615, personnel: testRider, type: 'rider' },
        { lat: 6.5241, lng: 3.3795, personnel: testRider, type: 'rider' },
        { lat: 6.5248, lng: 3.3788, personnel: testRider, type: 'rider' },
        { lat: 6.4549, lng: 3.4246, personnel: testRider, type: 'rider' },
        { lat: 6.6039, lng: 3.3515, personnel: testRider, type: 'rider' },
        { lat: 6.4971, lng: 3.3456, personnel: testRider, type: 'rider' },
        { lat: 6.4924, lng: 3.3528, personnel: testRider, type: 'rider' },
        { lat: 6.5039, lng: 3.3795, personnel: testRider, type: 'rider' },
        { lat: 6.4418, lng: 3.4177, personnel: testRider, type: 'rider' },
        { lat: 6.5341, lng: 3.3637, personnel: testRider, type: 'rider' },
      ];

      //const newZeeCoordinates = zeeCoordinates.concat(zeeCoordinatesTwo)

      const newZeeCoordinates = theCoordinates.concat(zeeCoordinatesTwo)
      
      //setCoordinates(theCoordinates);
      setCoordinates(newZeeCoordinates);
    }
  }, [drivers]);

  const center = coordinates.length > 0 ? coordinates[0] : { lat: 6.5244, lng: 3.3792 };

  const handleMarkerClick = (index: any, coord: any) => {
    // Perform actions when a marker is clicked
    console.log(`Marker ${index + 1} clicked!`, coord);
    // You can run any specified function here

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
                  url: coord.type === 'driver' ? iconUrl : '/riderOnline.svg', // Replace with the actual path to your custom icon
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
