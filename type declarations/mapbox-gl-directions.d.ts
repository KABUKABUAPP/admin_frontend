// src/types/mapbox-gl-directions.d.ts
declare module '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions' {
    import { IControl, LngLatLike, Map } from 'mapbox-gl';

    interface MapboxDirectionsOptions {
        accessToken: string;
        unit?: 'imperial' | 'metric';
        profile?: 'mapbox/driving' | 'mapbox/walking' | 'mapbox/cycling';
        alternatives?: boolean;
        congestion?: boolean;
    }

    class MapboxDirections implements IControl {
        on: any;
        constructor(options?: MapboxDirectionsOptions);
        onAdd(map: Map): HTMLElement;
        onRemove(): void;
        setOrigin(origin: LngLatLike | string): void;
        setDestination(destination: LngLatLike | string): void;
    }

    export default MapboxDirections;
}
