import { GoogleMap, DirectionsRenderer, useLoadScript } from '@react-google-maps/api';
import React, { FC } from 'react';

interface Props {
    start: any;
    end: any;
}

const RouteMap: FC<Props> = ({ start, end }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBKw_APHMTRn37FXj0dd7_CptLColGP4Gc' // ensure you add your API key in the .env.local file
  });

  const [directions, setDirections] = React.useState(null);

  const fetchDirections = React.useCallback(() => {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route({
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING
    }, (result: any, status: any) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setDirections(result);
      } else {
        console.error(`Error fetching directions ${result}`);
      }
    });
  }, [start, end]);

  React.useEffect(() => {
    if (isLoaded && start && end) {
      fetchDirections();
    }
  }, [isLoaded, start, end, fetchDirections]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;


  const containerStyle = {
    width: "100%",
    height: "90%",
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={start}
      zoom={10}
    >
      {
        directions && 
        <DirectionsRenderer 
            directions={directions}
            options={{
                polylineOptions: {
                  strokeColor: "#000000",
                  strokeOpacity: 0.8,
                  strokeWeight: 4,
                }
            }} 
        />
    }
    </GoogleMap>
  ) : <div>Loading...</div>;
}

export default RouteMap;
