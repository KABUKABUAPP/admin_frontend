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

import { capitalizeAllFirstLetters, logout, secondsToMilliSeconds } from "@/utils";
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
    getInsights: build.query<any, any>({
      query: ({ filter }) => ({
        url: `/admin/trip/trip-insights?filter=${filter.toUpperCase()}`,
      }),
      transformResponse: (response: any) => {
        if (!response) return [];
        else {
          const headerCard = [
            {
              title: "SOS",
              value: response?.data?.sos,
              iconBg: "#EF2C5B",
              
            },
            {
              title: "Total Earnings",
              value: response?.data?.total_earnings,
              iconBg: "#FFBF00",
              
            },
            {
              title: "Total Riders",
              value: response?.data?.total_riders,
              iconBg: "#FFBF00",
              
            }
          ]

          const driversChart = {
            pendingDrivers: response?.data?.pending_drivers,
            onboardedDrivers: response?.data?.onboarded_drivers,
            onlineDrivers: response?.data?.online_drivers,
            totalDrivers: response?.data?.total_drivers
          }

          const tripsChart = {
            activeTrips: response?.data?.active_trips,
            completedTrips: response?.data?.completed_trips,
            totalTrips: response?.data?.total_trips
          }

          const onlineStatusChart = {
            online: response?.data?.online_drivers,
            offline: response?.data?.offline_drivers,
            onlineRiders: response?.data?.online_riders,
            offlineRiders: response?.data?.offline_riders
          }

          return { headerCard, driversChart, tripsChart, onlineStatusChart }
        }
        
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

    getConcentratedOrders: build.query<any, any>({
      query: () => ({
        url: `/admin/order/dashboard/concentrated-orders`,
      }),
      transformResponse: (response: any) => {
        if (!response?.data) return {}
        else {
          const areas = response?.data.map((one: any) => {
            return capitalizeAllFirstLetters(one._id)
          })

          const orders = response?.data.map((one: any) => {
            return one.orders
          })
          return {areas, orders}
        }
      }
    }),

    getConcentratedDrivers: build.query<any, any>({
      query: () => ({
        url: `/admin/driver/dashboard/concentrated-drivers`,
      }),
      transformResponse: (response: any) => {
        if (!response?.data) return {}
        else {
          const areas = response?.data.map((one: any) => {
            return capitalizeAllFirstLetters(one._id)
          })

          const drivers = response?.data.map((one: any) => {
            return one.drivers
          })
          return {areas, drivers}
        }
      }
    }),

    getOnboardData: build.query<any, any>({
      query: ({range, type}) => ({
        url: `/admin/driver/dashboard/onboard-data?range=${range}&type=${type}`,
      }),
      transformResponse: (response: any) => {
        if (!response?.data) return {}
        else {
          const thePeriod = response?.data.map((one: any) => {
            if (one.day) return one.day;
            if (one.month) return one.month;
          })

          const theData = response?.data.map((one: any) => {
            return one.drivers
          })
          return {thePeriod, theData}
        }
      }
    })

  }),
});

export const {
  useGetInsightsQuery,
  useGetTripChartDataQuery,
  useGetActiveTripsQuery,
  useGetConcentratedOrdersQuery,
  useGetConcentratedDriversQuery,
  useGetOnboardDataQuery
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
