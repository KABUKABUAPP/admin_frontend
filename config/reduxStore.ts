import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { authApi } from "@/api-services/authService";
import { tripsApi } from "@/api-services/tripsService";
import authReducer from "./features/auth/authSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { combineReducers } from "@reduxjs/toolkit";
import { CookieStorage } from 'redux-persist-cookie-storage' 
import Cookies from 'js-cookie'
import userReducer from "./features/user/userSlice"

const authPersistConfig = {
  key: "auth",
  storage: new CookieStorage(Cookies)
};

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ['auth']
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  user: userReducer
});
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const reduxStore = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [tripsApi.reducerPath]: tripsApi.reducer,
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([authApi.middleware, tripsApi.middleware, thunk]),
});

export const persistedStore = persistStore(reduxStore);

export type RootState = ReturnType<typeof reduxStore.getState>;

export type AppDispatch = typeof reduxStore.dispatch;

setupListeners(reduxStore.dispatch);
