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
  MappedViewHub,
  ViewHubQuery,
  ViewHubResponse,
  Car,
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
                hubName: hub?.name,
                dateCreated: new Date(hub.created_at).toDateString(),
                inspector: `${hub.inspector?.last_name} ${hub.inspector?.first_name}`,
                stateCountry: `${hub?.state}, ${hub?.country}`,
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
    viewHub: build.query<MappedViewHub, ViewHubQuery>({
      query: ({ hubId }) => ({
        url: `admin/hub/get-one/${hubId}`,
      }),
      transformResponse: (response: ViewHubResponse) => {
        if (!response) return <MappedViewHub>{};
        else {
          const mapped: MappedViewHub = {
            inspectionCars: [] as Car[],
            hubCars: response.data.hub_images.map((item) => {
              return {
                carColor: "",
                carId: "",
                carImage: item,
                plateNumber: "",
                carModel: ""
              };
            }),
            inspectionCenterId: response.data._id,
            inspectionCenterImages: [],
            inspectorFullname: response.data.inspector?.last_name || '' + ' ' + response.data.inspector?.first_name || '',
            inspectionCenterDateAdded:new Date(response.data.created_at).toDateString(),
            inspectionCenterTitle: response.data.name,
            approved: 0,
            declined: 0,
            processed: 0,
            inspectorAddress: response.data.inspector?.house_address,
            inspectorPhone: response.data.inspector?.phone_number,
            inspectionCenterLocation: `${response.data.state}, ${response.data.city}, ${response.data.country}`,
          };
          return mapped;
        }
      },
    }),
  }),
});

export const { useGetAllHubsQuery, useViewHubQuery } = hubsApi;
