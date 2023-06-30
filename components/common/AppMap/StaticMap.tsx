import React, { FC, useEffect } from "react";
import CarIcon from "../../icons/CarIcon";
import DestinationIcon from "../../icons/DestinationIcon";
import GoogleMapReact from "google-map-react";
import s from "./styles.module.css";
import LocationPinIcon from "@/components/icons/LocationPinIcon";

interface Props {
  startPoint: [number, number];
  endPoint: [number, number];
}

const StaticMap: FC<Props> = ({ startPoint, endPoint }) => {
  const mapRef = React.createRef<any>();

  const key = "";
  // AIzaSyDYJFRC6Hn7pHOLdLEJgPvjUHTa-XHs8Kw

  useEffect(() => {
    console.log(startPoint, endPoint);
  }, [JSON.stringify(startPoint), endPoint]);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden" id="map">
      <GoogleMapReact
        ref={mapRef}
        bootstrapURLKeys={{ key }}
        defaultCenter={{ lat: startPoint[0], lng: startPoint[1] }}
        // layerTypes={["TrafficLayer", "TransitLayer"]}
        defaultZoom={12}
      >
        {startPoint.length && (
          <StartMarker lat={startPoint[0]} lng={startPoint[1]} />
        )}
        {endPoint.length && <EndMarker lat={endPoint[0]} lng={endPoint[1]} />}
      </GoogleMapReact>
    </div>
  );
};

export default StaticMap;

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

const EndMarker: FC<any> = ({ text, lat, lng }) => {
  return (
    <div>
      <span style={{ color: "#FFBF00" }}>
        <LocationPinIcon fill="#FFBF00" />
      </span>
    </div>
  );
};
