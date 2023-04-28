import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { AUTH_BASE_URL, RIDES_BASE_URL } from "@/constants";
import { secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import {
  FarePricesMappedData,
  FarePricesTableData,
  GetAllFarePricesResponse,
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
  endpoints: (build) => ({
    getAllFarePrices: build.query<FarePricesMappedData, "">({
      query: () => ({
        url: `admin/price/all`,
      }),
      transformResponse: (response: GetAllFarePricesResponse) => {
        if (!response) return {} as FarePricesMappedData;
        else {
          const mappedReponse: FarePricesTableData[] = response.data.data.map(
            (price) => {
              return {
                city: price.city,
                dateCreated: price.created_at,
                profileId: price._id,
                stateCountry: `${price.state}, ${price.country}`,
                totalFares: 0,
              };
            }
          );

          return { data: mappedReponse };
        }
      },
    }),
  }),
});

export const { useGetAllFarePricesQuery } = farePricesApi
