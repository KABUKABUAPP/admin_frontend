import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}` || '';

interface RouteMapTwoProps {
  start: [number, number];
  end: [number, number];
  routeCoordinates?: [number, number][];
}

const RouteMapThree: React.FC<RouteMapTwoProps> = ({ start, end, routeCoordinates }) => {
  const mapWrapper = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const directionsRef = useRef<MapboxDirections | null>(null);
  const routeHandlerRef = useRef<((e: any) => void) | null>(null);

  useEffect(() => {
    if (!mapWrapper.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapWrapper.current,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: start,
      zoom: 7
    });
    mapRef.current = map;

    map.on('load', () => {
      if (!map.getSource('route')) {
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
                coordinates: [],
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

      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving',
      });
      directionsRef.current = directions;

      const handler = (e: any) => {
        const route = e.route?.[0]?.geometry?.coordinates;
        if (!Array.isArray(route)) return;
        const source = map.getSource('route') as mapboxgl.GeoJSONSource | undefined;
        if (source) {
          source.setData({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route,
            },
          });
        }
      };
      routeHandlerRef.current = handler;
      directions.on('route', handler);
      map.addControl(directions, 'top-left');
    });

    return () => {
      mapRef.current = null;
      directionsRef.current = null;
      routeHandlerRef.current = null;
      map.remove();
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const hasRouteHistory = Array.isArray(routeCoordinates) && routeCoordinates.length > 1;
    const source = map.getSource('route') as mapboxgl.GeoJSONSource | undefined;
    if (hasRouteHistory) {
      if (source) {
        source.setData({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: routeCoordinates as [number, number][],
          },
        });
      }
      return;
    }

    const directions = directionsRef.current;
    if (directions) {
      directions.setOrigin(start);
      directions.setDestination(end);
    }
  }, [start, end, routeCoordinates]);

  return (
    // Populates map by referencing map's container property
    <div ref={mapWrapper} className="mapWrapper" style={{width: '100vw', height: '70vh'}} />
  );
}

export default RouteMapThree;
