import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { AUTH_BASE_URL, RIDES_BASE_URL } from "@/constants";
import {
  LoginPayload,
  LoginResponse,
  CreateAdminPayload,
  CreateAdminResponse,
  UpdatePasswordPayload,
} from "@/models/Auth";
import { secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";

export const authApi = createApi({
  reducerPath: "authApi",
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
    login: build.mutation<LoginResponse, LoginPayload>({
      query: (payload) => ({
        url: "admin/auth/login",
        method: "POST",
        body: { ...payload },
      }),
    }),
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
  }),
});

export const { useCreateAdminMutation, useLoginMutation, useUpdatePasswordMutation } = authApi;
