import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";

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


export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: baseQueryWithLogoutOnTokenExpiration,
  endpoints: (build) => ({
    broadcastMessage:  build.mutation<any, any>({
        query: (body)=>({
          url: '/admin/broadcast/create',
          method: 'POST',
          body
        })
    }),
    getAllBroadcasts: build.query<any, any>({
      query: ({ limit, page, type }) => ({
        url: `/admin/broadcast/all?limit=${limit}&page=${page}&type=${type}`
      }),
      transformResponse: (response: any) => {
        if (!response) return [];
        return response.data;
      }
    })
  }),
});

export const {
    useBroadcastMessageMutation,
    useGetAllBroadcastsQuery
} = messageApi;

