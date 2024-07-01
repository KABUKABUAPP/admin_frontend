import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";
import { logout, secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: `${RIDES_BASE_URL}/`,
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
    console.log({result})
    logout(()=>{
      window.location.pathname = '/auth/login'
    });
  }
  return result;
};

export const redemptionApi = createApi({
  reducerPath: "redemptionApi",
  baseQuery: baseQueryWithLogoutOnTokenExpiration,
  endpoints: (build) => ({
    viewAllPromosNew: build.query<any, any>({
      query: ({ limit, page, status, category }) => ({
        url: `admin/promotions/all-promos/${status}?limit=${limit}&page=${page}&category=${category}`
      }),
      transformResponse: (response: any) => {
        if (!response) return <any>{};
        else {
          return response.data;
        }
      },
    }),
    viewVoucher: build.query<any, any>({
        query: ({ code }) => ({
          url: `admin/promotions/check-voucher?code=${code}`
        }),
        transformResponse: (response: any) => {
          if (!response) return <any>{};
          else {
            return response.data;
          }
        },
    }),
    updateValidate: build.mutation<any, any>({
        query: ({id, body}) => ({
          url: `admin/promotions/validate-voucher/${id}`,
          body,
          method: "PUT",
        })
    })
  })
});

export const {
  useViewAllPromosNewQuery,
  useViewVoucherQuery,
  useUpdateValidateMutation
} = redemptionApi;
