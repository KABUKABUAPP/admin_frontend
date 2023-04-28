import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { authApi } from "@/api-services/authService";
import { tripsApi } from "@/api-services/tripsService";
import { dashboardApi } from "@/api-services/dashboardService";
import { driversApi } from "@/api-services/driversService";
import { inspectorsApi } from "@/api-services/inspectorsService";

export const reduxStore = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [tripsApi.reducerPath]: tripsApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [driversApi.reducerPath]: driversApi.reducer,
    [inspectorsApi.reducerPath]: inspectorsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      tripsApi.middleware,
      dashboardApi.middleware,
      driversApi.middleware,
      inspectorsApi.middleware
    ]),
});

export const persistedStore = reduxStore;

export type RootState = ReturnType<typeof reduxStore.getState>;

export type AppDispatch = typeof reduxStore.dispatch;

setupListeners(reduxStore.dispatch);
