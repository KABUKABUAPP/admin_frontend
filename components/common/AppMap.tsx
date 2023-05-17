import React, { FC } from "react";
import CarIcon from "../icons/CarIcon";
import DestinationIcon from "../icons/DestinationIcon";
import GoogleMapReact from "google-map-react";

interface Props {
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  zoom: number;
}

const AppMap: FC<Props> = ({ location }) => {
  const directionReqObj = {
    origin: "Chicago, IL",
    destination: "Los Angeles, CA",
    travelMode: "DRIVING",
  };

  const key = "AIzaSyDYJFRC6Hn7pHOLdLEJgPvjUHTa-XHs8Kw";

  return (
    <div className="w-full h-full rounded-lg overflow-hidden" id="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key }}
        defaultCenter={location}
        defaultZoom={11}
        onGoogleApiLoaded={({ map, maps }) => {
          const directionsService = new maps.DirectionsService();

          directionsService.route(directionReqObj, (res: any, stat: any) => {
            console.log(res);

            if (stat == "OK") {
              console.log(res);
            }
          });
        }}
      >
        <StartMarker
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
    </div>
  );
};

export default AppMap;

const StartMarker: FC<any> = ({ text }) => {
  return (
    <div>
      <span style={{ color: "#FFBF00" }}>
        <CarIcon />
      </span>
      <p>{text}</p>
    </div>
  );
};

const EndMarker: FC = () => {
  return (
    <div>
      <span style={{ color: "#FFBF00" }}>
        <DestinationIcon />
      </span>
    </div>
  );
};
