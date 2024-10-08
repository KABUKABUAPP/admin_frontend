import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { DEV_MONITOR_URL } from "@/constants";

import { capitalizeAllFirstLetters, logout, secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: `${DEV_MONITOR_URL}`,
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


export const onlineMonitorApi = createApi({
  reducerPath: "onlineMonitorApi",
  baseQuery: baseQueryWithLogoutOnTokenExpiration,
  endpoints: (build) => ({
    getOnlineMonitor: build.query<any, any>({
      query: ({ id, fixedDate, timeline, dateStart, dateEnd }) => ({
        url: `/admin/online-monitor/view/${id}?${fixedDate.length > 0 ? `fixedDate=${fixedDate}` : ''}${timeline.length > 0 ? `&timeline=${timeline}` : ''}${dateStart.length > 0 ? `&dateStart=${dateStart}` : ''}${dateEnd.length > 0 ? `&dateEnd=${dateEnd}` : ''}`
      }),
      transformResponse: (response: any) => {
        console.log({response})
        if (!response) return {};
        else {
          return response;
        }
      }
    }),
    getOnlineMonitorWithBenchmark: build.query<any, any>({
      query: ({ min_hours, limit, page, dateStart, dateEnd, daysPassed }) => ({
        url: `/admin/online-monitor/total-hours-benchmarks?min_hours=${min_hours}&limit=${limit}&page=${page}${dateStart.length > 0 ? `&dateStart=${dateStart}` : ''}${dateEnd.length > 0 ? `&dateEnd=${dateEnd}` : ''}&days_passed=${daysPassed}`
      }),
      transformResponse: (response: any) => {
        console.log({response})
        if (!response) return {};
        else {
          return response;
        }
      }
    }),
    fetchRewardedUsers: build.query<any, any>({
      query: ({ limit, page, start, stop, beneficiary, year, month }) => ({
        url: `/admin/online-monitor/fetch-rewarded-users?limit=${limit}&page=${page}&start=${start}&stop=${stop}${beneficiary.length > 0 ? `&beneficiary=${beneficiary}` : ''}${month && month.length > 0 ? `&month=${month}` : ''}${year && year.length > 0 ? `&year=${year}` : ''}`
      }),
      transformResponse: (response: any) => {
        if (!response) return {};
        else {
          return response;
        }
      }
    })
  }),
});

export const {
  useGetOnlineMonitorQuery,
  useGetOnlineMonitorWithBenchmarkQuery,
  useFetchRewardedUsersQuery
} = onlineMonitorApi;

