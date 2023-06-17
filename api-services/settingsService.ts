import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";
import { secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import {
  CreateAdminPayload,
  CreateAdminResponse,
  MappedPromoResponse,
  UpdatePasswordPayload,
  ViewAllPromosQuery,
  ViewAllPromosResponse,
} from "@/models/Settings";

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${RIDES_BASE_URL}/`,
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
    createAdmin: build.mutation<CreateAdminResponse, CreateAdminPayload>({
      query: (payload) => ({
        url: "admin/auth/sign-up",
        method: "POST",
        body: { ...payload },
      }),
    }),
    updatePassword: build.mutation<any, UpdatePasswordPayload>({
      query: (body) => ({
        url: "admin/auth/update-password",
        body,
        method: "PUT",
      }),
    }),
    viewAllPromos: build.query<MappedPromoResponse, ViewAllPromosQuery>({
      query: ({ limit, page, status }) => ({
        url: `admin/promotions/all/${status}?limit=${limit}&page=${page}`,
      }),
      transformResponse: (response: ViewAllPromosResponse) => {
        if (!response) return <MappedPromoResponse>{};
        else {
          const mapped = response.data.data.map((res) => {
            return {
              promoCode: res?.code,
              amount: res.value,
              status: res.active_status,
              createdDate: res.createdAt,
              expiryDate: res.expiry_date,
              totalSubscribers: res.total_subscribers,
              id: res._id
            };
          });

          return {
            totalCount: response.data.pagination.totalCount,
            data: mapped,
          };
        }
      },
    }),
  }),
});

export const { useCreateAdminMutation, useUpdatePasswordMutation, useViewAllPromosQuery } =
  settingsApi;
