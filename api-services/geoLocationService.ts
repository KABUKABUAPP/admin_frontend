import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";

import { logout, secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import { LookUp } from "@/models/LookUp";
import {
  GetNigerianCitiesQuery,
  GetNigerianCitiesResponse,
  GetNigerianStatesResponse,
} from "@/models/GeoLocation";

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

export const geoLocationApi = createApi({
  reducerPath: "geoLocationApi",
  baseQuery: baseQueryWithLogoutOnTokenExpiration,
  tagTypes: ["states"],
  endpoints: (build) => ({
    getNigerianStates: build.query<LookUp[], null>({
      query: () => ({
        url: `/trip/get-states?limit=50&page=1`,
      }),
      providesTags: ["states"],
      transformResponse: (response: GetNigerianStatesResponse) => {
        if (!response) return <LookUp[]>[];
        else {
          return response.data.data.map((state) => {
            return {
              label: state?.name,
              value: state?._id,
            };
          });
        }
      },
    }),
    getNigerianCityByState: build.query<LookUp[], GetNigerianCitiesQuery>({
      query: ({ id }) => ({
        url: `/trip/get-cities/${id}?limit=5000&page=1`,
      }),
      transformResponse: (response: GetNigerianCitiesResponse) => {
        if (!response) return <LookUp[]>[];
        else {
          return response.data.data.map((city) => {
            return {
              label: city?.name,
              value: city?._id,
            };
          });
        }
      },
    }),
  }),
});

export const { useGetNigerianCityByStateQuery, useGetNigerianStatesQuery } =
  geoLocationApi;
