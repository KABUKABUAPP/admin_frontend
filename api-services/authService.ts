import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { AUTH_BASE_URL, RIDES_BASE_URL } from "@/constants";
import {
  LoginPayload,
  LoginResponse,
  CreateAdminPayload,
  CreateAdminResponse,
} from "@/models/Auth";
import { secondsToMilliSeconds } from "@/utils";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${RIDES_BASE_URL}/`,
    timeout: secondsToMilliSeconds(30),
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
  }),
});

export const { useCreateAdminMutation, useLoginMutation } = authApi;
