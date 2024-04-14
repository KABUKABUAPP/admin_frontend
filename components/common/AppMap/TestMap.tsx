import React, { FC, useEffect, useState } from "react";

import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  useLoadScript
} from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "@/constants";

interface Props {
  startPoint: [number, number];
  endPoint: [number, number];
}

const StaticMap: FC<Props> = ({ startPoint, endPoint }) => {
  const [directions, setDirections] = useState<any>(null);
  const [map, setMap] = React.useState(null);
  const [showMap, setShowMap] = useState(false);
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBKw_APHMTRn37FXj0dd7_CptLColGP4Gc',
  });

  const containerStyle = {
    width: "100%",
    height: "90%",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  

  const onLoad = React.useCallback(function callback(map: any) {
    const origin = { lat: startPoint[0], lng: startPoint[1] };
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(origin);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  useEffect(() => {
    if (startPoint && endPoint) {
      const origin = { lat: startPoint[0], lng: startPoint[1] };
      const destination = { lat: endPoint[0], lng: endPoint[1] };

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            if (result) setDirections(result);
            setShowMap(true);
          } else {
            console.error("Error fetching directions:", status);
          }
        }
      );
    }
  }, [startPoint, endPoint]);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden" id="map">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
          showMap &&
          <GoogleMap mapContainerStyle={containerStyle} zoom={10} center={{ lat: startPoint[0], lng: startPoint[1] }} onLoad={onLoad}>
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    strokeColor: "#000000",
                    strokeOpacity: 0.8,
                    strokeWeight: 4,
                  },
                }}
              />
            )}
          </GoogleMap>
      )}
    </div>
  );
};

export default StaticMap;
