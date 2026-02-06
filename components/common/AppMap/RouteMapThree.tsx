import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
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
  const [mapLoaded, setMapLoaded] = React.useState(false);
  const routeRequestRef = useRef(0);

  const normalizePoints = (points: [number, number][]) => {
    const result: [number, number][] = [];
    points.forEach((point) => {
      const last = result[result.length - 1];
      if (!last || last[0] !== point[0] || last[1] !== point[1]) {
        result.push(point);
      }
    });
    return result;
  };

  const clampPoints = (points: [number, number][], maxPoints = 25) => {
    if (points.length <= maxPoints) return points;
    const trimmed: [number, number][] = [];
    const step = (points.length - 1) / (maxPoints - 1);
    for (let i = 0; i < maxPoints; i += 1) {
      const index = Math.round(i * step);
      trimmed.push(points[index]);
    }
    return trimmed;
  };

  const buildWaypoints = () => {
    if (!Array.isArray(routeCoordinates) || routeCoordinates.length === 0) return [];
    const cleaned = normalizePoints(routeCoordinates as [number, number][]);
    const withoutStart = cleaned.filter(
      (point) => !(point[0] === start[0] && point[1] === start[1])
    );
    const withoutEnd = withoutStart.filter(
      (point) => !(point[0] === end[0] && point[1] === end[1])
    );
    return clampPoints(withoutEnd);
  };

  const ensureRouteLayer = (map: mapboxgl.Map) => {
    if (!map.getSource('route-source')) {
      map.addSource('route-source', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [],
          },
        },
      });
    }
    if (!map.getLayer('route-layer')) {
      map.addLayer({
        id: 'route-layer',
        type: 'line',
        source: 'route-source',
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
  };

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
      ensureRouteLayer(map);
      setMapLoaded(true);
    });

    return () => {
      mapRef.current = null;
      setMapLoaded(false);
      map.remove();
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;
    if (!start || !end) return;
    const bounds = new mapboxgl.LngLatBounds(start, start);
    bounds.extend(end);
    map.fitBounds(bounds, {
      padding: 80,
      duration: 0,
      maxZoom: 14,
    });
    map.setCenter(start);
  }, [start, end, mapLoaded]);

  const fetchRouteWithWaypoints = async (points: [number, number][]) => {
    if (!mapboxgl.accessToken || points.length < 2) return null;
    const cleaned = clampPoints(normalizePoints(points));
    if (cleaned.length < 2) return null;
    const coordString = cleaned.map((point) => `${point[0]},${point[1]}`).join(';');
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordString}?geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`;
    try {
      const response = await fetch(url);
      if (!response.ok) return null;
      const data = await response.json();
      const coordinates = data?.routes?.[0]?.geometry?.coordinates;
      if (!Array.isArray(coordinates)) return null;
      return coordinates as [number, number][];
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;
    ensureRouteLayer(map);
    const waypoints = buildWaypoints();
    const requestId = ++routeRequestRef.current;

    const loadRoute = async () => {
      const route = await fetchRouteWithWaypoints([start, ...waypoints, end]);
      if (routeRequestRef.current !== requestId) return;
      const source = map.getSource('route-source') as mapboxgl.GeoJSONSource | undefined;
      if (!source) return;
      source.setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route || [start, end],
        },
      });
    };

    loadRoute();
  }, [start, end, routeCoordinates, mapLoaded]);

  return (
    // Populates map by referencing map's container property
    <div ref={mapWrapper} className="mapWrapper" style={{width: '100vw', height: '70vh'}} />
  );
}

export default RouteMapThree;
