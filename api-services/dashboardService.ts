import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

import { logout, secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import { ActiveTripsMappedResponse, Trip } from "@/models/Trips";

const baseQuery = fetchBaseQuery({
  baseUrl: `${RIDES_BASE_URL}`,
  timeout: secondsToMilliSeconds(30),
  prepareHeaders(headers) {
    const token = Cookies.get(ACCESS_TOKEN);

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
})

const baseQueryWithLogoutOnTokenExpiration: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    logout(()=>{
      window.location.pathname = '/auth/login'
    });
  }
  return result;
};


export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: baseQueryWithLogoutOnTokenExpiration,
  endpoints: (build) => ({
    getInsights: build.query<Omit<TripInsightsMappedResponse, "icon">[], "">({
      query: () => ({
        url: `/admin/trip/trip-insights`,
      }),
      transformResponse: (response: GetTripInsightsResponse) => {
        console.log('res', response)
        if (!response) return [];
        return [
          {
            title: "Total trips",
            value: response?.data?.total_trips,
            iconBg: "#FFBF00",
            
          },
          {
            title: "Active trips",
            value: response?.data?.active_trips,
            iconBg: "#2C3FEF",
            
          },
          {
            title: "SOS",
            value: response?.data?.sos,
            iconBg: "#EF2C5B",
            
          },
          {
            title: "Pending trips",
            value: response?.data?.pending_trips,
            iconBg: "#FFBF00",
            
          },
          {
            title: "Total Earnings",
            value: response?.data?.total_earnings,
            iconBg: "#FFBF00",
            
          },
          {
            title: "Total Drivers",
            value: 0,
            iconBg: "#FFBF00",
            
          },
          {
            title: "Total Riders",
            value: 0,
            iconBg: "#FFBF00",
            
          },
        ];
      },
    }),

    getTripChartData: build.query<GetTripChartData[], GetTripChartsQuery>({
      query: ({ range }) => ({
        url: `/admin/trip/get-trips-chart?range=${range}`,
      }),
      transformResponse: (response: GetTripChartResponse) => {
        return response.data.map((item) => {
          return {
            day: item.day ? item.day : item.month,
            trips: item.trips,
          };
        });
      },
    }),

    getActiveTrips: build.query<
      ActiveTripsMappedResponse,
      GetActiveTripsQuery
    >({
      query: ({ page, limit,type }) => ({
        url: `/admin/trip/dashboard/get-active-trips?page=${page}&limit=${limit}&type=${type}`,
      }),
      transformResponse: (response: GetActiveTripsResponse) => {
        if (!response.data.data.length) return {} as ActiveTripsMappedResponse;
        else {
          const mappedResponse = response.data.data.map((trip) => {
            return {
              from: trip.start_address.city,
              to: trip.end_address.city,
              rider: trip.user.full_name,
              driver: trip.driver ? trip.driver.full_name : "",
              id: trip._id,
            };
          });
          return {
            data: mappedResponse,
            totalCount: response.data.pagination.totalCount,
          };
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
              id: application._id
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
              id: application._id
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
} = dashboardApi;

export const pendingTripsApi = createApi({
  reducerPath: "pendingTripsApi",
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
              fullName: application.user?.full_name || '',
              location: `${application.state}, ${application.city}`,
              image: "",
              id: application?.user?._id
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
              fullName: application.user?.full_name,
              location: `${application.state}, ${application.city}`,
              image: "",
              id: application.user._id
            };
          });
        }
      },
    }),
  }),
});

export const {
  useGetPendingDriverApplicationsQuery,
  useGetPendingSharpApplicationsQuery,
} = pendingTripsApi;
