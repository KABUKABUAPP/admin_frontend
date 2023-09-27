import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { authApi } from "@/api-services/authService";
import { tripsApi } from "@/api-services/tripsService";
import { dashboardApi, pendingTripsApi } from "@/api-services/dashboardService";
import { driversApi } from "@/api-services/driversService";
import { inspectorsApi } from "@/api-services/inspectorsService";
import { farePricesApi } from "@/api-services/farePricesService";
import { ridersApi } from "@/api-services/ridersService";
import { hubsApi } from "@/api-services/hubService";
import { sharpCarsApi } from "@/api-services/sharpCarsService";
import { sosApi } from "@/api-services/sosService";
import { transactionsApi } from "@/api-services/transactionsService";
import { settingsApi } from "@/api-services/settingsService";
import { staffApi } from "@/api-services/staffService";
import { geoLocationApi } from "@/api-services/geoLocationService";
import { ordersApi } from "@/api-services/ordersService";

export const reduxStore = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [tripsApi.reducerPath]: tripsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [driversApi.reducerPath]: driversApi.reducer,
    [inspectorsApi.reducerPath]: inspectorsApi.reducer,
    [pendingTripsApi.reducerPath]: pendingTripsApi.reducer,
    [farePricesApi.reducerPath]: farePricesApi.reducer,
    [ridersApi.reducerPath]: ridersApi.reducer,
    [hubsApi.reducerPath]: hubsApi.reducer,
    [sharpCarsApi.reducerPath]: sharpCarsApi.reducer,
    [sosApi.reducerPath]: sosApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [staffApi.reducerPath]: staffApi.reducer,
    [geoLocationApi.reducerPath]: geoLocationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      tripsApi.middleware,
      ordersApi.middleware,
      dashboardApi.middleware,
      driversApi.middleware,
      inspectorsApi.middleware,
      pendingTripsApi.middleware,
      farePricesApi.middleware,
      ridersApi.middleware,
      hubsApi.middleware,
      sharpCarsApi.middleware,
      sosApi.middleware,
      transactionsApi.middleware,
      settingsApi.middleware,
      staffApi.middleware,
      geoLocationApi.middleware,
    ]),
});

export const persistedStore = reduxStore;

export type RootState = ReturnType<typeof reduxStore.getState>;

export type AppDispatch = typeof reduxStore.dispatch;

setupListeners(reduxStore.dispatch);
