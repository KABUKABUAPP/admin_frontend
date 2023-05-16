import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HUBS_BASE_URL } from "@/constants";
import { secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import {
  GetAllInspectorsQuery,
  GetAllInspectorsResponse,
  InspectorsMappedData,
  InspectorsTableBodyData,
} from "@/models/Inspectors";

export const inspectorsApi = createApi({
  reducerPath: "inspectorsApi",
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
    getAllInspectors: build.query<InspectorsMappedData, GetAllInspectorsQuery>({
      query: ({ limit, page }) => ({
        url: `admin/inspector/all?limit=${limit}&page=${page}`,
      }),
      transformResponse: (response: GetAllInspectorsResponse) => {
        if (!response) return {} as InspectorsMappedData;
        else {
          const totalCount = response.data.pagination.totalCount;
          const mappedReponse: InspectorsTableBodyData[] =
            response.data.data.map((inspector) => {
              return {
                carsInHub: 0,
                fullName: `${inspector.last_name} ${inspector.first_name}`,
                hub: ``,
                imageUrl: '',
                inspectorId: inspector._id,
                location: `${inspector.city}, ${inspector.state}, ${inspector.country}`,
                totalCarsProcessed: 0,
              };
            });

          return { data: mappedReponse, totalCount: totalCount };
        }
      },
    }),
  }),
});

export const { useGetAllInspectorsQuery } = inspectorsApi