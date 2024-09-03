import { useViewDriverQuery } from "@/api-services/driversService";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}` || '';
//const socket = io(`${DEV_MONITOR_URL}`);

const SingleDriverMap = () => {
    const router = useRouter();
    const [iconUrlDriver, setIconUrlDriver] = useState('');
    const [coordinates, setCoordinates] = useState<any>([]);

    const { id } = router.query;

    const { data, isLoading, isError, refetch } = useViewDriverQuery(
        { id: String(id) },
        { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
    );

    
  useEffect(() => {
    if (data) {
        const driverIcon = data?.onlineStatus === 'offline' ? '/taxiOffline.svg' : '/taxiOnline.svg';
        setIconUrlDriver(driverIcon);
        setCoordinates(data?.carDetails?.coordinates)
        console.log('mentally', {data});
    }
  }, [data])
  

  const mapContainerRef = useRef<any>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // Initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: coordinates && coordinates.length ? [coordinates[0], coordinates[1]] : [3.3792, 6.5244], // Center map on first coordinate or [0, 0] if empty
      zoom: 12, // Initial zoom level
    });

    // Add markers if there are coordinates
    if (coordinates && coordinates.length) {
      new mapboxgl.Marker({ element: createMarkerElement(coordinates) }).setLngLat(coordinates).addTo(mapRef.current).getElement();
    }

    return () => mapRef.current.remove(); // Cleanup map on unmount
  }, [coordinates]);

  const createMarkerElement = (coord: any) => {
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = `url(${iconUrlDriver})`;
    el.style.width = '50px';
    el.style.height = `${'70px'}`;
    el.style.backgroundSize = '100%';
    el.dataset.id = coord._id;
    return el;
  };

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: '100%',
        height: '400px', // Adjust height as needed
      }}
    />
  );

}

export default SingleDriverMap;