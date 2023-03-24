import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";
import { GetAllTripsResponse } from "@/models/Trips";
import { GetAllTripsQuery } from "@/models/Trips";

import { secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";

export const tripsApi = createApi({
  reducerPath: "tripsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${RIDES_BASE_URL}/`,
    timeout: secondsToMilliSeconds(30),
    prepareHeaders(headers) {
      const token = Cookies.get(ACCESS_TOKEN)

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getAllTrips: build.query<GetAllTripsResponse, GetAllTripsQuery>({
      query: ({ limit, page, status }) => ({
        url: `/admin/trip/get-all?limit=${limit}&page=${page}&status=${status}`,
      }),
    }),
  }),
});

export const { useGetAllTripsQuery } = tripsApi;
