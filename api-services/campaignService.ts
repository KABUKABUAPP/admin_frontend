import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";

import { logout, secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";

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


export const campaignApi = createApi({
  reducerPath: "campaignApi",
  baseQuery: baseQueryWithLogoutOnTokenExpiration,
  endpoints: (build) => ({
    createCampaign: build.mutation<any, any>({
        query: (body)=>({
          url: 'admin/campaign/create',
          method: 'POST',
          body
        })
    }),
    editCampaign: build.mutation<any, any>({
      query: ({body, id})=>({
        url: `admin/campaign/update/${id}`,
        method: 'PUT',
        body
      })
    }),
    getCampaigns: build.query<any, any>({
      query: ({ start_date, end_date }) => ({
        url: `admin/campaign/get-all?${start_date.length > 0 ? `start_date=${start_date}` : ''}${end_date.length > 0 ? `&end_date=${end_date}` : ''}`
      }),
      transformResponse: (response: any) => {
        if (!response) return [];
        return response.data;
      }
    }),
    getMarketingStaffs: build.query<any, any>({
      query: ({search}) => ({
        url: `admin/staff/all?limit=1000&page=1&order=newest_first&role=temporary_marketer&search=${search}`
      }),
      transformResponse: (response: any) => {
        if (!response) return <any>{};
        else {
          const mapped = response.data.data.map((staff: any) => {
            return {
              staffId: staff?.staff_id,
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
              id: staff?._id,
              street: staff?.address?.street,
              city: staff?.address?.city,
              state: staff?.address?.state
            };
          });

          return {
            totalCount: response?.data?.pagination?.totalCount,
            data: mapped,
          };
        }
      }
    }),
    viewCampaign: build.query<any, any>({
      query: ({ id }) => ({
        url: `admin/campaign/view/${id}?page=1&limit=1000`
      }),
      transformResponse: (response: any) => {
        if (!response) return [];
        return response.data;
      }
    })
  }),
});

export const {
    useCreateCampaignMutation,
    useGetCampaignsQuery,
    useGetMarketingStaffsQuery,
    useViewCampaignQuery,
    useEditCampaignMutation
} = campaignApi;

