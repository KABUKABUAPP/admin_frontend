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
    })
  }),
});

export const {
  useGetOnlineMonitorQuery
} = onlineMonitorApi;

