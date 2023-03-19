import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ADMIN_BASE_URL } from "@/constants";
import { GetAllTripsResponse } from "@/models/Trips";
import { GetAllTripsQuery } from "@/models/Trips";

import { secondsToMilliSeconds } from "@/utils";
import { RootState } from "../config/reduxStore"

export const tripsApi = createApi({
  reducerPath: "tripsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ADMIN_BASE_URL}/`,
    timeout: secondsToMilliSeconds(30),
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).persistedReducer.auth.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getAllTrips: build.query<GetAllTripsResponse, GetAllTripsQuery>({
      query: ({ limit, page, }) => ({
        url: `/admin/trip/get-all?limit=${limit}&page=${page}`,
      }),
    }),
  }),
});

export const { useGetAllTripsQuery } = tripsApi;
