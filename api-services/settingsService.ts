import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";
import { secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import {
  CreateAdminPayload,
  CreateAdminResponse,
  MappedPromoResponse,
  MappedViewResponse,
  UpdatePasswordPayload,
  ViewAllPromosQuery,
  ViewAllPromosResponse,
  ViewPromotionQuery,
  ViewPromotionResponse,
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
              id: res._id,
            };
          });

          return {
            totalCount: response.data.pagination.totalCount,
            data: mapped,
          };
        }
      },
    }),
    viewPromo: build.query<MappedViewResponse, ViewPromotionQuery>({
      query: ({ limit, page, promoId }) => ({
        url: `admin/promotions/view/${promoId}?limit=${limit}&page=${page}`,
      }),
      transformResponse: (response: ViewPromotionResponse) => {
        if (!response) return <MappedViewResponse>{};
        else {
          const mappedPromo = {
            promoCode: response.data.promotion.code,
            status: response.data.promotion.active_status,
            createdDate: response.data.promotion.createdAt,
            expiryDate: response.data.promotion.expiry_date,
            totalSubscribers: response.data.subscribers.pagination.totalCount,
            promotionType: response.data.promotion.auto_or_manual,
            id: response.data.promotion._id,
          };

          const mappedSubscribers = response.data.subscribers.data.map(
            (sub) => {
              return {
                fullname: sub.user.full_name,
                image: sub.user.profile_image,
                id: sub.user._id,
              };
            }
          );

          const totalCount = response.data.subscribers.pagination.totalCount;

          return {
            promo: mappedPromo,
            subscribers: {
              data: mappedSubscribers,
              totalCount: totalCount,
            },
          };
        }
      },
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useUpdatePasswordMutation,
  useViewAllPromosQuery,
  useViewPromoQuery,
} = settingsApi;
