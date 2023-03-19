import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ADMIN_BASE_URL } from "@/constants";
import { GetAllTripsResponse } from "@/models/Trips";
import { GetAllTripsQuery } from "@/models/Trips";

import { secondsToMilliSeconds } from "@/utils";

export const tripsApi = createApi({
  reducerPath: "tripsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ADMIN_BASE_URL}/`,
    timeout: secondsToMilliSeconds(30),
  }),
  endpoints: (build) => ({
    getAllTrips: build.query<GetAllTripsResponse, GetAllTripsQuery>({
      query: ({ limit, page, token }) => ({
        url: `/admin/trip/get-all?limit=${limit}&page=${page}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useGetAllTripsQuery } = tripsApi;
