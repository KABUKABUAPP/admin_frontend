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

export const carOwnersApi = createApi({
    reducerPath: "carOwnersApi",
    baseQuery: baseQueryWithLogoutOnTokenExpiration,
    endpoints: (build) => ({
        getAllCarOwners: build.query<any, any>({
          query: ({ limit, page, search }) => ({
            url: `admin/car-owner/all?limit=${limit}&page=${page}${search.length > 0 ? `&search=${search}`: ''}`
          }),
          transformResponse: (response: any) => {
            if (!response) return {}
            else {
              return response?.data;
            }
          },
        }),
        getSingleCarOwner: build.query<any, any>({
          query: ({ id }) => ({
            url: `admin/car-owner/view/${id}`
          }),
          transformResponse: (response: any) => {
            if (!response) return {}
            else {
              return response?.data;
            }
          },
        }),
        getSingleCar: build.query<any, any>({
          query: ({ id }) => ({
            url: `admin/car-owner/view-car/${id}`
          }),
          transformResponse: (response: any) => {
            if (!response) return {}
            else {
              return response?.data;
            }
          },
        }),
        getPendingCarRequests: build.query<any, any>({
          query: ({ limit, page, requestStatus }) => ({
            url: `admin/car-owner/requests?limit=${limit}&page=${page}&status=${requestStatus}`
          }),
          transformResponse: (response: any) => {
            if (!response) return {}
            else {
              return response?.data;
            }
          },
        }),
        approveDeclineCar: build.mutation<any, any>({
          query: ({ id, status, reason, assigned_hub_id }) => ({
            url: `admin/car-owner/approve-decline-car/${id}?status=${status}&reason=${reason}&assigned_hub_id=${assigned_hub_id}`,
            method: "PUT"
          })
        })
    })
})

export const { useGetAllCarOwnersQuery, useGetSingleCarOwnerQuery, useGetSingleCarQuery, useGetPendingCarRequestsQuery, useApproveDeclineCarMutation } = carOwnersApi;