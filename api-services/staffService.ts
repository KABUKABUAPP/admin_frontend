import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";

import { logout, secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import {
  CreateStaffPayload,
  DisableStaffQuery,
  GetAllStaffQuery,
  GetAllStaffResponse,
  MappedGetAllStaff,
  MappedViewStaff,
  ResetStaffPasswordQuery,
  ViewStaffQuery,
  ViewStaffResponse,
} from "@/models/Staffs";

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

export const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery: baseQueryWithLogoutOnTokenExpiration,
  tagTypes: ["view-staff", "all-staff"],
  endpoints: (build) => ({
    getAllStaff: build.query<MappedGetAllStaff, GetAllStaffQuery>({
      query: ({ limit, order, page, status, search }) => ({
        url: `admin/staff/all?limit=${limit}&page=${page}&order=${order}&status=${status}&search=${search}`,
      }),
      providesTags: ["all-staff"],
      transformResponse: (response: GetAllStaffResponse) => {
        if (!response) return <MappedGetAllStaff>{};
        else {
          const mapped = response.data.data.map((staff) => {
            return {
              staffId: staff?._id,
              fullName: staff?.full_name,
              role: staff?.role?.name,
              location: `${staff?.address?.street}, ${staff?.address?.city} ${staff?.address?.state}`,
              status: `${
                staff?.isBlocked
                  ? "blocked"
                  : staff?.status === true
                  ? "active"
                  : "inactive"
              }`,
            };
          });

          return {
            totalCount: response?.data?.pagination?.totalCount,
            data: mapped,
          };
        }
      },
    }),
    createStaff: build.mutation<any, CreateStaffPayload>({
      query: (body) => ({
        url: "admin/staff/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["all-staff"],
    }),
    disableStaff: build.mutation<any, DisableStaffQuery>({
      query: ({ staffId }) => ({
        url: `admin/staff/disable-staff/${staffId}`,
        method: "PUT",
      }),
      invalidatesTags: ["view-staff", "all-staff"],
    }),
    viewStaff: build.query<MappedViewStaff, ViewStaffQuery>({
      query: ({ staffId }) => ({
        url: `admin/staff/view/${staffId}`,
      }),
      providesTags: ["view-staff"],
      transformResponse: (response: ViewStaffResponse) => {
        if (!response) return <MappedViewStaff>{};
        else {
          const mappedStaff = {
            fullName: response?.data?.full_name,
            email: response?.data?.email,
            phone: response?.data?.phone_number,
            address: response?.data?.address?.city,
            role: response?.data?.role.name,
            image: response?.data?.profile_image,
          };

          const isBlocked = response?.data?.isBlocked;

          return { userInfo: mappedStaff, isBlocked };
        }
      },
    }),
    resetStaffPassword: build.mutation<any, ResetStaffPasswordQuery>({
      query: ({ staffId }) => ({
        url: `admin/staff/reset-staff-password/${staffId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetAllStaffQuery,
  useCreateStaffMutation,
  useDisableStaffMutation,
  useViewStaffQuery,
  useResetStaffPasswordMutation,
} = staffApi;
