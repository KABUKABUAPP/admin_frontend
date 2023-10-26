import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";

import { logout, secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import moment from 'moment';
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

function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

const formattedDate = getFormattedDate();

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

export const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: baseQueryWithLogoutOnTokenExpiration,
  endpoints: (build) => ({
    getAllTeam: build.query<any, any>({
      query: ({ limit, order, page, status, audience, search }) => ({
        url: `admin/team/all?limit=${limit}&page=${page}&order=${order}&status=${status}&audience=${audience}&search=${search}`
      }),
      transformResponse: (response: any) => {
        if (!response) return <any>{};
        else {
            const mapped = response.data.data.map((team: any) => {
                return {
                  teamId: team?.team_id,
                  teamName: team?.name,
                  totalMembers: team?.total_members,
                  audience: team?.audience,
                  users_onboarded: team?.total_onboarded,
                  created: team?.created_at,
                  id: team?._id
                };
            });

            return {
                totalCount: response?.data?.pagination?.totalCount,
                data: mapped
            };
        }
      },
    }),
    createTeam: build.mutation<any, any>({
      query: (body) => ({
        url: "admin/team/create",
        method: "POST",
        body,
      }),
      //invalidatesTags: ["all-staff"],
    }),
    deleteTeam: build.mutation<any, any>({
      query: ({ staffId }) => ({
        url: `admin/team/delete/${staffId}`,
        method: "PUT",
      }),
    }),
    viewTeam: build.query<any, any>({
      query: ({ teamId,  }) => ({
        url: `admin/team/view/${teamId}?limit=5&page=1&start_date=2023-06-18&end_date=${formattedDate}`,
      }),
      transformResponse: (response: any) => {
        if (!response) return <any>{};
        else {
          return response?.data
        }
      }
    })
  }),
});

export const {
  useGetAllTeamQuery,
  useCreateTeamMutation,
  useDeleteTeamMutation,
  useViewTeamQuery
} = teamApi;
