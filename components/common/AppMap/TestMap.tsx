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
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAsBegv3npV0vvqFzyeYYEtWDGYGyEu3TI',
  });

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

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
          <GoogleMap mapContainerStyle={containerStyle} zoom={10} center={center}>
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