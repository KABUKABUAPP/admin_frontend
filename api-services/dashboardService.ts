import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  GetTripInsightsResponse,
  GetTripChartResponse,
  GetTripChartsQuery,
  GetActiveTripsResponse,
  GetActiveTripsQuery,
  GetPendingApplicationsResponse,
  GetPendingApplicationsQuery,
  GetPendingSharpApplicationsResponse,
  GetPendingSharpApplicationsQuery,
} from "@/models/Dashboard";

import { secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ``,
    timeout: secondsToMilliSeconds(30),
    prepareHeaders(headers) {
      const token = Cookies.get(ACCESS_TOKEN);

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getInsights: build.query<GetTripInsightsResponse, null>({
      query: () => ({
        url: `/admin/trip/trip-insights`,
      }),
    }),

    getTripChartData: build.query<GetTripChartResponse, GetTripChartsQuery>({
      query: ({ range }) => ({
        url: `/admin/trip/get-trips-chart?range=${range}`,
      }),
    }),

    getActiveTrips: build.query<GetActiveTripsResponse, GetActiveTripsQuery>({
      query: ({ page, limit }) => ({
        url: `/admin/trip/dashboard/get-active-trips?page=${page}&limit=${limit}`,
      }),
    }),

    getPendingApplications: build.query<
      GetPendingApplicationsResponse,
      GetPendingApplicationsQuery
    >({
      query: ({ page, limit }) => ({
        url: `/admin/driver/dashboard/pending-driver-applications?page=${page}&limit=${limit}`,
      }),
    }),

    getPendingSharpApplications: build.query<
      GetPendingSharpApplicationsResponse,
      GetPendingSharpApplicationsQuery
    >({
      query: ({ page, limit }) => ({
        url: `/admin/driver/dashboard/pending-sharp-applications?page=${page}&limit=${limit}`,
      }),
    }),
  }),
});

export const {
  useGetInsightsQuery,
  useGetTripChartDataQuery,
  useGetActiveTripsQuery,
  useGetPendingApplicationsQuery,
  useGetPendingSharpApplicationsQuery
} = dashboardApi;
