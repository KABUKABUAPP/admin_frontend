import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";
import { secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import {
  GetAllRidersQuery,
  GetAllRidersResponse,
  MappedRidersData,
  RidersTableBodyData,
} from "@/models/Riders";

export const ridersApi = createApi({
  reducerPath: "ridersApi",
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
  endpoints: (build) => ({
    getAllRides: build.query<MappedRidersData, GetAllRidersQuery>({
      query: ({ limit, page }) => ({
        url: `admin/rider/all?limit=${limit}&page=${page}`,
      }),
      transformResponse: (response: GetAllRidersResponse) => {
        if (!response) return {} as MappedRidersData;
        else {
          const mappedReponse: RidersTableBodyData[] = response.riders.map(
            (rider) => {
              return {
                fullName: rider.full_name,
                imageUrl: "",
                location: "",
                riderId: rider._id,
                status: "",
                totalTrips: 0,
                walletBalance: rider.wallet_balance,
              };
            }
          );

          return {
            data: mappedReponse,
            totalCount: response.paginatedRecords.totalCount,
          };
        }
      },
    }),
  }),
});

export const { useGetAllRidesQuery } = ridersApi;
