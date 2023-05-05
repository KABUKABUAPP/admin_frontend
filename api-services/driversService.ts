import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";
import { secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import {
  GetAllDriversResponse,
  GetAllDriversQuery,
  DriversMappedResponse,
} from "@/models/Drivers";

export const driversApi = createApi({
  reducerPath: "driversApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${RIDES_BASE_URL}/`,
    timeout: secondsToMilliSeconds(30),
    prepareHeaders(headers) {
      const token = Cookies.get(ACCESS_TOKEN);

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['drivers'],
  endpoints: (build) => ({
    getAllDrivers: build.query<DriversMappedResponse, GetAllDriversQuery>({
      query: ({ limit, page, carOwner, driverStatus }) => ({
        url: `admin/driver/all?limit=${limit}&page=${page}&driver_status=${driverStatus}&car_owner=${carOwner}`,
      }),
      providesTags: ['drivers'],
      transformResponse: (response: GetAllDriversResponse) => {
        if (!response) return {} as DriversMappedResponse;
        else {
          const totalCount = response.data.pagination.totalCount
          const mappedReponse = response.data.drivers.map((driver) => {
            return {
              driverId: driver._id,
              fullName: driver.user.full_name,
              location: `${driver.country}, ${driver.state}`,
              imageUrl: '',
              driverType: driver.car_owner ? 'Regular Driver' : 'Sharp Car Driver',
              totalTrips: driver.total_trips,
              walletBalance: driver.wallet_balance,
              status: '',
            };
          });

          return {data: mappedReponse, totalCount: totalCount};
        }
      },
    }),
  }),
});

export const { useGetAllDriversQuery } = driversApi
