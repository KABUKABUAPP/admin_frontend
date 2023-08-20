import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";
import { secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import {
  CreateFarePricePayload,
  CreateFarePriceResponse,
  FarePricesMappedData,
  FarePricesTableData,
  GetAllFarePricesQuery,
  GetAllFarePricesResponse,
  UpdateDriverFeeQuery,
  UpdateFareQuery,
  ViewFarePriceResponse,
  ViewFareQuery,
} from "@/models/FarePrices";

export const farePricesApi = createApi({
  reducerPath: "farePricesApi",
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
  tagTypes: ["fare-prices", "fare-price"],
  endpoints: (build) => ({
    getAllFarePrices: build.query<FarePricesMappedData, GetAllFarePricesQuery>({
      query: ({ search, order }) => ({
        url: `admin/price/all?search=${search}&order=${order}`,
      }),
      transformResponse: (response: GetAllFarePricesResponse) => {
        if (!response) return {} as FarePricesMappedData;
        else {
          const mappedReponse: FarePricesTableData[] = response.data.data.map(
            (price) => {
              return {
                city: price?.city,
                dateCreated: price?.created_at?.toString(),
                profileId: price?._id,
                stateCountry: `${price?.state}, ${price?.country}`,
                totalFares: 0,
              } as FarePricesTableData;
            }
          );

          return { data: mappedReponse };
        }
      },
    }),

    viewFarePrice: build.query<ViewFarePriceResponse, ViewFareQuery>({
      query: ({ id }) => ({
        url: `admin/price/view/${id}`,
      }),
      providesTags: ["fare-price"],
    }),
    createFarePrice: build.mutation<
      CreateFarePriceResponse,
      CreateFarePricePayload
    >({
      query: (body) => ({
        url: "admin/price/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["fare-prices", "fare-price"],
    }),
    toggleSurge: build.mutation({
      query: () => ({
        url: `admin/price/toggle-surge/644398d4b0480f78a891ba96`,
        method: "",
      }),
    }),
    updateDriverFee: build.mutation<any, UpdateDriverFeeQuery>({
      query: ({ id, payload: body }) => ({
        url: `admin/price/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ['fare-price', 'fare-prices']
    }),
    updateFarePrice: build.mutation<any, UpdateFareQuery>({
      query: ({ id, payload: body }) => ({
        url: `admin/price/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ['fare-price', 'fare-prices']
    }),
  }),
});

export const {
  useGetAllFarePricesQuery,
  useViewFarePriceQuery,
  useCreateFarePriceMutation,
  useUpdateDriverFeeMutation,
  useUpdateFarePriceMutation,
} = farePricesApi;
