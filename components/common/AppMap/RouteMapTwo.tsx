import React, { useEffect, useState } from 'react';
import ReactMapboxGl, { Layer, Feature, Source } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

interface RouteMapTwoProps {
  start: [number, number];
  end: [number, number];
}

const Map = ReactMapboxGl({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '',
});

const RouteMapTwo: React.FC<RouteMapTwoProps> = ({ start, end }) => {
  const [route, setRoute] = useState<any>(null);

  useEffect(() => {
    const getRoute = async () => {
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(',')};${end.join(',')}.json?geometries=geojson&steps=true&overview=full&language=en&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
      try {
        const response = await axios.get(url);
        if (response.data.routes && response.data.routes.length > 0) {
          console.log('Route fetched:', response.data.routes[0].geometry);
          setRoute(response.data.routes[0].geometry);
        } else {
          console.error('No routes found:', response.data);
        }
      } catch (error) {
        console.error('Error fetching directions:', error);
      }
    };

    getRoute();
  }, [start, end]);

  return (
    <div className="w-full h-full">
      <Map
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}
        center={start}
        zoom={[10]}
      >
        {route && (
          <Source id="route" geoJsonSource={{ type: 'geojson', data: route }}>
            <Layer
              id="route"
              type="line"
              paint={{
                'line-color': '#3b9ddd',
                'line-width': 4,
              }}
            />
          </Source>
        )}
        <Layer type="symbol" id="start-marker" layout={{ 'icon-image': 'marker-15' }}>
          <Feature coordinates={start} />
        </Layer>
        <Layer type="symbol" id="end-marker" layout={{ 'icon-image': 'marker-15' }}>
          <Feature coordinates={end} />
        </Layer>
      </Map>
    </div>
  );
};

export default RouteMapTwo;
