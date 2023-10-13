import React, { FC, useEffect } from "react";
import CarIcon from "../../icons/CarIcon";
import DestinationIcon from "../../icons/DestinationIcon";
import GoogleMapReact from "google-map-react";
import s from "./styles.module.css";

interface Props {
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  zoom: number;
}

const AppMap: FC<Props> = ({ location }) => {
  const mapRef = React.createRef<any>();
  const directionReqObj = {
    origin: "Chicago, IL",
    destination: "Los Angeles, CA",
    travelMode: "DRIVING",
  };

  const key = "";
  // AIzaSyDYJFRC6Hn7pHOLdLEJgPvjUHTa-XHs8Kw

  useEffect(() => {
    const map = mapRef.current?.map_;
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(new window.google.maps.LatLng(location.lat, location.lng));
      map.fitBounds(bounds);
    }
  }, [JSON.stringify(location)]);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden" id="map">
      <GoogleMapReact
        ref={mapRef}
        bootstrapURLKeys={{ key }}
        defaultCenter={location}
        layerTypes={["TrafficLayer", "TransitLayer"]}
        defaultZoom={11}
        // onGoogleApiLoaded={({ map, maps }) => {
        //   const directionsService = new maps.DirectionsService();

        //   directionsService.route(directionReqObj, (res: any, stat: any) => {
        //     console.log(res);

        //     if (stat == "OK") {
        //       console.log(res);
        //     }
        //   });
        // }}
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

const StartMarker: FC<any> = ({ text, lat, lng }) => {
  return (
    <div
      className={s["car-marker"]}
      style={{ top: `${lat}px`, left: `${lng}px` }}
    >
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
