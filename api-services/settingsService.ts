import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";
import { logout, secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import {
  CreateAdminPayload,
  CreateAdminResponse,
  CreateRolePayload,
  DeletePromoQuery,
  DeleteRoleQuery,
  GenerateAutomaticPromoPayload,
  GenerateManualPromoPayload,
  GetRolesQuery,
  GetRolesResponse,
  MappedGetRoles,
  MappedPromoResponse,
  MappedViewResponse,
  MappedViewRole,
  UpdatePasswordPayload,
  UpdateRoleQuery,
  ViewAllPromosQuery,
  ViewAllPromosResponse,
  ViewPromotionQuery,
  ViewPromotionResponse,
  ViewRoleQuery,
  ViewRoleResponse,
} from "@/models/Settings";

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
    logout(()=>{
      window.location.pathname = '/auth/login'
    });
  }
  return result;
};

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery: baseQueryWithLogoutOnTokenExpiration,
  tagTypes: ["roles", "all-promos"],
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
      providesTags: ["all-promos"],
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
              name: res.name,
              amount_type: res.amount_type
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
            promoCode: response?.data?.promotion.code,
            status: response?.data?.promotion?.active_status,
            createdDate: response?.data?.promotion?.createdAt,
            expiryDate: response?.data?.promotion?.expiry_date,
            totalSubscribers:
              response?.data?.subscribers?.pagination?.totalCount,
            promotionType: response?.data?.promotion?.auto_or_manual,
            id: response?.data?.promotion?._id,
            name: response?.data?.promotion?.name,
            amount_type: response?.data?.promotion?.amount_type,
            amount: response?.data?.promotion?.value
          };

          const mappedSubscribers = response.data.subscribers.data.map(
            (sub) => {
              return {
                fullname: sub?.user?.full_name,
                image: sub?.user?.profile_image,
                id: sub?.user?._id,
              };
            }
          );

          const totalCount =
            response?.data?.subscribers?.pagination?.totalCount;

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
    createManualPromo: build.mutation<any, GenerateManualPromoPayload>({
      query: (body) => ({
        url: "admin/promotions/create-general",
        body,
        method: "POST",
      }),
    }),
    createAutomaticPromo: build.mutation<any, GenerateAutomaticPromoPayload>({
      query: (body) => ({
        url: "admin/promotions/create-general",
        body,
        method: "POST",
      }),
    }),
    deletePromo: build.mutation<any, DeletePromoQuery>({
      query: ({ promoId }) => ({
        url: `admin/promotions/delete/${promoId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["all-promos"],
    }),
    getRoles: build.query<MappedGetRoles, GetRolesQuery>({
      query: ({ limit, page }) => ({
        url: `admin/role/all?limit=${limit}&page=${page}&search=`,
      }),
      providesTags: ["roles"],
      transformResponse: (response: GetRolesResponse) => {
        if (!response) return <MappedGetRoles>{};
        else {
          const mappedRoles = response.data.data.map((role) => ({
            id: role?._id,
            title: role?.name,
            roleCount: role?.total_number_of_permissions,
          }));

          const totalCount = response?.data?.pagination?.totalCount;

          return { data: mappedRoles, totalCount };
        }
      },
    }),
    viewRole: build.query<MappedViewRole, ViewRoleQuery>({
      query: ({ roleId }) => ({
        url: `admin/role/view/${roleId}`,
      }),
      transformResponse: (response: ViewRoleResponse) => {
        if (!response) return <MappedViewRole>{};
        else {
          const {
            _id,
            created_at,
            created_by,
            updated_at,
            __v,
            last_edited_by,
            ...rest
          } = response.data;

          return { ...rest, id: _id };
        }
      },
    }),
    createRole: build.mutation<any, CreateRolePayload>({
      query: (body) => ({
        url: "admin/role/create",
        body,
        method: "POST",
      }),
      invalidatesTags: ["roles"],
    }),
    updateRole: build.mutation<any, UpdateRoleQuery>({
      query: ({ roleId, payload }) => ({
        url: `admin/role/update/${roleId}`,
        body: payload,
        method: "PUT",
      }),
      invalidatesTags: ["roles"],
    }),
    deleteRole: build.mutation<any, DeleteRoleQuery>({
      query: ({ roleId }) => ({
        url: `admin/role/delete/${roleId}`,
        method: "POST",
        invalidatesTags: ["roles"],
      }),
    }),
    getDriverSettings: build.query<any, any>({
      query: () => ({
        url: `admin/settings/view`
      }),
      transformResponse: (response: any) => {
        if (!response) return {}
        else {
          return response?.data
        }
      }
    }),
    updateDriverSettings: build.mutation<any, any>({
      query: (body) => ({
        url: `admin/settings/update`,
        body,
        method: "PUT"
      }),
      transformResponse: (response: any) => {
        if (!response) return {}
        else {
          console.log(response?.data)
        }
      }
    })
  })
});

export const {
  useCreateAdminMutation,
  useUpdatePasswordMutation,
  useViewAllPromosQuery,
  useViewPromoQuery,
  useGetRolesQuery,
  useViewRoleQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useCreateAutomaticPromoMutation,
  useCreateManualPromoMutation,
  useDeletePromoMutation,
  useDeleteRoleMutation,
  useGetDriverSettingsQuery,
  useUpdateDriverSettingsMutation
} = settingsApi;
