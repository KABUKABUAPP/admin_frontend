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
  MappedViewRider,
  ViewRiderQuery,
  ViewRiderResponse,
  MappedRider,
} from "@/models/Riders";
import { BlockDriverQuery } from "@/models/Drivers";

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
  tagTypes: ["riders", "rider"],
  endpoints: (build) => ({
    getAllRides: build.query<MappedRidersData, GetAllRidersQuery>({
      query: ({ limit, page, search, order, status }) => ({
        url: `admin/rider/all?limit=${limit}&page=${page}&search=${search}&order=${order}&is_blocked=${
          status === "deleted" ? "no" : status
        }${status === "deleted" ? "&deleted=yes" : ""}`,
      }),
      providesTags: ["riders"],
      transformResponse: (response: GetAllRidersResponse) => {
        if (!response) return {} as MappedRidersData;
        else {
          const mappedReponse: MappedRider[] = response.data.drivers.map(
            (rider) => {
              return {
                fullName: rider?.full_name,
                imageUrl: rider?.profile_image,
                location: "",
                riderId: rider._id,
                status: rider?.isBlocked === true ? "Blocked" : "Active",
                totalTrips: 0,
                walletBalance: rider?.wallet_balance,
                isBlocked: rider?.isBlocked,
                deletedReason: rider?.reason_for_delete,
                dateDeleted: rider?.date_deleted
                  ? new Date(rider?.date_deleted).toDateString()
                  : "",
              };
            }
          );

          return {
            data: mappedReponse,
            totalCount: response?.data?.pagination?.totalCount,
          };
        }
      },
    }),
    viewRider: build.query<MappedViewRider, ViewRiderQuery>({
      query: ({ id, status }) => ({
        url: `admin/rider/view/${id}?status=${status}`,
      }),
      providesTags: ["rider"],
      transformResponse: (response: ViewRiderResponse) => {
        if (!response) return <MappedViewRider>{};
        return {
          driver: {
            fullName: response?.data?.full_name,
            address: "",
            tripCount: response?.data?.total_trips,
            rating: response?.data?.average_rating?.value,
            image: response?.data?.profile_image,
            isBlocked: response?.data?.isBlocked,
            id: response?.data?._id,
          },
          financials: {
            total: response?.data?.total_spent?.toString(),
            walletBalance: response?.data?.wallet_balance?.toString(),
          },
          nextOfKin: {
            fullname: response?.data?.next_of_kin.full_name,
            relationship: response?.data?.next_of_kin?.relationship,
            phone: response?.data?.next_of_kin?.phone_number?.toString(),
          },
        };
      },
    }),
    toggleBlockRider: build.mutation<any, BlockDriverQuery>({
      query: ({ reason, driverId }) => ({
        url: `admin/rider/block-unblock/${driverId}?reason=${reason}`,
        method: "PUT",
      }),
      invalidatesTags: ["riders", "rider"],
    }),
  }),
});

export const {
  useGetAllRidesQuery,
  useViewRiderQuery,
  useToggleBlockRiderMutation,
} = ridersApi;
