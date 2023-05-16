import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HUBS_BASE_URL } from "@/constants";
import { secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import {
  GetAllHubsQuery,
  GetAllHubsResponse,
  HubsTableBodyData,
  MappedHubData,
} from "@/models/Hubs";

export const hubsApi = createApi({
  reducerPath: "hubsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${HUBS_BASE_URL}/`,
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
    getAllHubs: build.query<MappedHubData, GetAllHubsQuery>({
      query: ({ limit, page }) => ({
        url: `admin/hub/all?limit=${limit}&page=${page}`,
      }),
      transformResponse: (response: GetAllHubsResponse) => {
        if (!response) return {} as MappedHubData;
        else {
          const mappedReponse: HubsTableBodyData[] = response.data.data.map(
            (hub) => {
              return {
                hubId: hub._id,
                hubName: hub.name,
                dateCreated: hub.created_at.toDateString(),
                inspector: `${hub.inspector.last_name} ${hub.inspector.first_name}`,
                stateCountry: `${hub.state}, ${hub.country}`,
                totalCarsProcessed: 0,
              };
            }
          );

          return {
            data: mappedReponse,
            totalCount: response.data.pagination.totalCount,
          };
        }
      },
    }),
  }),
});

export const { useGetAllHubsQuery } = hubsApi;
