import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}` || '';

interface RouteMapTwoProps {
  start: [number, number];
  end: [number, number];
}

const RouteMapThree: React.FC<RouteMapTwoProps> = ({ start, end }) => {
  const mapWrapper = useRef(null);

  useEffect(() => {
    if (!mapWrapper.current) return;

    // Creates new map instance
    const map = new mapboxgl.Map({
      container: mapWrapper.current,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: start,
      zoom: 7
    });

    // Creates new directions control instance
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
    });

    // Set the start and end points
    directions.setOrigin(start);
    directions.setDestination(end);

    // Fetch route and display it on the map
    map.on('load', () => {
      directions.setOrigin(start);
      directions.setDestination(end);
      directions.on('route', (e: any) => {
        const route = e.route[0].geometry.coordinates;
        if (map.getSource('route')) {
          (map.getSource('route') as mapboxgl.GeoJSONSource).setData({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route,
            },
          });
        } else {
          map.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: route,
                },
              },
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#888',
              'line-width': 8,
            },
          });
        }
      });
    });

    // Integrates directions control with map
    map.addControl(directions, 'top-left');

    return () => {
      map.remove();
    };
  }, []);

  return (
    // Populates map by referencing map's container property
    <div ref={mapWrapper} className="mapWrapper" style={{width: '100vw', height: '70vh'}} />
  );
}

export default RouteMapThree;
