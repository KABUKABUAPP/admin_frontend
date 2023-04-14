import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { authApi } from "@/api-services/authService";
import { tripsApi } from "@/api-services/tripsService";
import { dashboardApi } from "@/api-services/dashboardService";

export const reduxStore = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [tripsApi.reducerPath]: tripsApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      tripsApi.middleware,
      dashboardApi.middleware,
    ]),
});

export const persistedStore = reduxStore;

export type RootState = ReturnType<typeof reduxStore.getState>;

export type AppDispatch = typeof reduxStore.dispatch;

setupListeners(reduxStore.dispatch);
