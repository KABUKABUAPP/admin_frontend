import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";

import { secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import {
  CreateStaffPayload,
  DisableStaffQuery,
  GetAllStaffQuery,
  GetAllStaffResponse,
  MappedGetAllStaff,
  MappedViewStaff,
  ViewStaffQuery,
} from "@/models/Staffs";

export const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${RIDES_BASE_URL}`,
    timeout: secondsToMilliSeconds(30),
    prepareHeaders(headers) {
      const token = Cookies.get(ACCESS_TOKEN);

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getAllStaff: build.query<MappedGetAllStaff, GetAllStaffQuery>({
      query: ({ limit, order, page, status }) => ({
        url: `admin/staff/all?limit=${limit}&page=${page}&order=${order}&status=${status}`,
      }),
      transformResponse: (response: GetAllStaffResponse) => {
        if (!response) return <MappedGetAllStaff>{};
        else {
          const mapped = response.data.data.map((staff) => {
            return {
              staffId: staff._id,
              fullName: staff.full_name,
              role: staff.role.name,
              location: `${staff?.address?.street}, ${staff?.address?.city} ${staff?.address?.state}`,
              status: `${staff.isBlocked === true ? "blocked" : "active"}`,
            };
          });

          return {
            totalCount: response.data.pagination.totalCount,
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
    }),
    disableStaff: build.mutation<any, DisableStaffQuery>({
      query: ({ staffId }) => ({
        url: `admin/staff/disable-staff/${staffId}`,
        method: "PUT",
      }),
    }),
    viewStaff: build.query<MappedViewStaff, ViewStaffQuery>({
      query: ({ staffId }) => ({
        url: `admin/staff/view/${staffId}`,
      }),
    }),
  }),
});

export const {
  useGetAllStaffQuery,
  useCreateStaffMutation,
  useDisableStaffMutation,
  useViewStaffQuery
} = staffApi;
