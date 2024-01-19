import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";
import {
  GetMarketerQuery,
  GetMarketerResponse,
} from "@/models/Marketer";

import { logout, secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";

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


export const marketerApi = createApi({
  reducerPath: "marketerApi",
  baseQuery: baseQueryWithLogoutOnTokenExpiration,
  endpoints: (build) => ({
    getMarketer: build.query<any, any>({
      query: ({ limit, page, user_type }) => ({
        url: `/admin/staff/get-my-referrals-data?limit=${limit}&page=${page}&user_type=${user_type}`
      }),
      transformResponse: (response: GetMarketerResponse) => {
        if (!response) return [];
        return response.data;
      }
    }),
    
    getPerformanceChartData: build.query<any, any>({
      query: ({ limit, page, user_type }) => ({
        url: `/admin/staff/get-my-referrals-data?limit=${limit}&page=${page}&user_type=${user_type}`
      }),
      transformResponse: (response: GetMarketerResponse) => {
        if (!response) return [];
        return response.data.referal_chart.map((item) => {
          return {
            month: item.month,
            drivers: item.drivers,
          };
        });
      }
    }),

    getOnboardedDrivers: build.query<any, any>({
      query: ({ limit, page, user_type }) => ({
        url: `/admin/staff/get-my-referrals-data?limit=${limit}&page=${page}&user_type=${user_type}`
      }),
      transformResponse: (response: GetMarketerResponse) => {
        if (!response) return [];
        const mappedData = response.data.data.map((d) => {
          return {
            fullName: d.full_name,
            type: d.type,
            image: d.profile_image,
            id: d._id
          };
        });

        const totalCount =  response.data.pagination.totalCount

        return { data: mappedData, totalCount }
      }
    }),
  }),
});

export const {
  useGetMarketerQuery,
  useGetPerformanceChartDataQuery,
  useGetOnboardedDriversQuery
} = marketerApi;

