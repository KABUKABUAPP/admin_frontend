// components/MapOverlay.tsx
import React, { useEffect, useState } from 'react';
import { 
    GoogleMap,
    useLoadScript,
    Marker
} from '@react-google-maps/api';
import { useGetAllDriversQuery } from '@/api-services/driversService';

interface MapOverlayProps {
  onlineStatus: string;
}

const MapOverlay: React.FC<MapOverlayProps> = ({ onlineStatus }) => {
    const [directions, setDirections] = useState<any>(null);
    const [map, setMap] = React.useState(null);
    const [coordinates, setCoordinates] = React.useState<any[]>([]);
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
          if (d.coordinate) return {lat: d.coordinate[0], lng: d.coordinate[1]}
        });

        const zeeCoordinates = [
          { lat: 6.5244, lng: 3.3792 },
          { lat: 6.5761, lng: 3.3431 },
          { lat: 6.4281, lng: 3.4215 },
          { lat: 6.5833, lng: 3.3433 },
          { lat: 6.5951, lng: 3.3423 },
          { lat: 6.5244, lng: 3.3792 },
          { lat: 6.5244, lng: 3.3792 },
          { lat: 6.5645, lng: 3.3434 },
          { lat: 6.4654, lng: 3.4064 },
          { lat: 6.5244, lng: 3.3792 },
          { lat: 6.5054, lng: 3.3581 },
          { lat: 6.4281, lng: 3.4215 },
          { lat: 6.5244, lng: 3.3792 },
          { lat: 6.5244, lng: 3.3792 },
          { lat: 6.5244, lng: 3.3792 },
          { lat: 6.5244, lng: 3.3792 },
          { lat: 6.5244, lng: 3.3792 }
        ]
        setCoordinates(theCoordinates);
        //setCoordinates(zeeCoordinates);

        if (onlineStatus === 'offline') {
          setIconUrl('/taxiOffline.svg')
        }
    
        if (onlineStatus === 'online') {
          setIconUrl('/taxiOnline.svg')
        }
      }
    }, [drivers]);

    const center = coordinates.length > 0 ? coordinates[0] : { lat: 6.5244, lng: 3.3792 };

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
              <Marker
                key={index}
                position={coord}
                icon={{
                  url: iconUrl, // Replace with the actual path to your custom icon
                  scaledSize: new window.google.maps.Size(40, 40), // Adjust the size as needed
                }} 
              />
            ))}
          </GoogleMap>
      )}
    </div>
    );
};

export default MapOverlay;
