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
});

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

export const carRepairLoanApi = createApi({
    reducerPath: "carRepairLoanApi",
    baseQuery: baseQueryWithLogoutOnTokenExpiration,
    endpoints: (build) => ({
        getAllCarRepairLoan: build.query<any, any>({
            query: ({ limit, page, status }) => ({
              url: `admin/repair-loan/all?limit=${limit}&page=${page}&status=${status}`
            }),
            transformResponse: (response: any) => {
              if (!response) return {}
              else {
                
                return response?.data;
              }
            }
        }),
        getSingleCarRepairLoan: build.query<any, any>({
            query: ({ id }) => ({
              url: `admin/repair-loan/view/${id}`
            }),
            transformResponse: (response: any) => {
              if (!response) return {}
              else {
                return response?.data;
              }
            },
        }),
        updateCarRepairLoanStatus: build.mutation<any, any>({
            query: ({ id, data: body }) => ({
              url: `admin/repair-loan/update-status/${id}`,
              method: "PUT",
              body
            })
        })
    })
})

export const { useGetAllCarRepairLoanQuery, useGetSingleCarRepairLoanQuery, useUpdateCarRepairLoanStatusMutation } = carRepairLoanApi;