import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";
import {
  GetTripInsightsResponse,
  TripInsightsMappedResponse,
  GetTripChartResponse,
  GetTripChartsQuery,
  GetActiveTripsResponse,
  GetActiveTripsQuery,
  GetPendingApplicationsResponse,
  GetPendingApplicationsQuery,
  GetPendingSharpApplicationsResponse,
  GetPendingSharpApplicationsQuery,
  PendingApplicationsMappedResponse,
  GetTripChartData,
} from "@/models/Dashboard";

import { secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import { Trip } from "@/models/Trips";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${RIDES_BASE_URL}`,
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
    getInsights: build.query<Omit<TripInsightsMappedResponse, "icon">[], "">({
      query: () => ({
        url: `/admin/trip/trip-insights`,
      }),
      transformResponse: (response: GetTripInsightsResponse) => {
        if (!response) return [];
        return [
          {
            title: "Total trips",
            value: response.data.total_trips,
            iconBg: "#FFBF00",
          },
          {
            title: "Active trips",
            value: response.data.active_trips,
            iconBg: "#2C3FEF",
          },
          {
            title: "SOS",
            value: response.data.sos,
            iconBg: "#EF2C5B",
          },
          {
            title: "Pending trips",
            value: response.data.pending_trips,
            iconBg: "#FFBF00",
          },
          {
            title: "Total Earnings",
            value: response.data.total_earnings,
            iconBg: "#FFBF00",
          },
        ];
      },
    }),

    getTripChartData: build.query<GetTripChartData[], GetTripChartsQuery>({
      query: ({ range }) => ({
        url: `/admin/trip/get-trips-chart?range=${range}`,
      }),
      transformResponse: (response: GetTripChartResponse)=>{
        return response.data.map((item)=>{
          return {
            day: item.day,
            trips: item.trips
          }
        })
      }
    }),

    getActiveTrips: build.query<Trip[], GetActiveTripsQuery>({
      query: ({ page, limit }) => ({
        url: `/admin/trip/dashboard/get-active-trips?page=${page}&limit=${limit}`,
      }),
      transformResponse: (response: GetActiveTripsResponse) => {
        if (!response.data.data.length) return [] as Trip[];
        else {
          return response.data.data.map((trip) => {
            return {
              from: trip.start_address.city,
              to: trip.end_address.city,
              rider: trip.user.full_name,
              driver: trip.driver.full_name,
              id: trip._id,
            };
          });
        }
      },
    }),

    getPendingDriverApplications: build.query<
      PendingApplicationsMappedResponse[],
      GetPendingApplicationsQuery
    >({
      query: ({ page, limit }) => ({
        url: `/admin/driver/dashboard/pending-driver-applications?page=${page}&limit=${limit}`,
      }),
      transformResponse: (response: GetPendingApplicationsResponse) => {
        if (!response.data.data.length)
          return [] as PendingApplicationsMappedResponse[];
        else {
          return response.data.data.map((application) => {
            return {
              fullName: application.user.full_name,
              location: `${application.state}, ${application.city}`,
              image: "",
            };
          });
        }
      },
    }),

    getPendingSharpApplications: build.query<
      PendingApplicationsMappedResponse[],
      GetPendingSharpApplicationsQuery
    >({
      query: ({ page, limit }) => ({
        url: `/admin/driver/dashboard/pending-sharp-applications?page=${page}&limit=${limit}`,
      }),
      transformResponse: (response: GetPendingSharpApplicationsResponse) => {
        if (!response.data.data.length)
          return [] as PendingApplicationsMappedResponse[];
        else {
          return response.data.data.map((application) => {
            return {
              fullName: application.user.full_name,
              location: `${application.state}, ${application.city}`,
              image: "",
            };
          });
        }
      },
    }),
  }),
});

export const {
  useGetInsightsQuery,
  useGetTripChartDataQuery,
  useGetActiveTripsQuery,
  useGetPendingDriverApplicationsQuery,
  useGetPendingSharpApplicationsQuery,
} = dashboardApi;
