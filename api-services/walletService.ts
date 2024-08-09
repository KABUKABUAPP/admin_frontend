import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { TRANSACTION_BASE_URL } from "@/constants";

import { capitalizeAllFirstLetters, logout, secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: `${TRANSACTION_BASE_URL}`,
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

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: baseQueryWithLogoutOnTokenExpiration,
  endpoints: (build) => ({
    getWalletBalances: build.query<any, any>(
      {
        query: ({ }) => ({
          url: `/admin/transaction/total-wallet-balances`
        }),
        transformResponse: (response: any) => {
          if (!response) return response as any;
          else {

            return response;
          }
        },
      }
    )
  }),
});

export const { useGetWalletBalancesQuery } = walletApi;
