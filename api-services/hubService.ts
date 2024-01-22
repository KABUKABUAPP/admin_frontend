import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HUBS_BASE_URL } from "@/constants";
import { logout, secondsToMilliSeconds } from "@/utils";
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
  MappedInspectionHistory,
  GetCarInspectionHistoryQuery,
  GetCarsInHubQuery,
  MappedCarInHubs,
  GetCarInspectionHistoryRepsonse,
  CarInHub,
  CarDescription,
  GetCarsInHubResponse,
} from "@/models/Hubs";

const baseQuery = fetchBaseQuery({
  baseUrl: `${HUBS_BASE_URL}/`,
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


export const hubsApi = createApi({
  reducerPath: "hubsApi",
  baseQuery: baseQueryWithLogoutOnTokenExpiration,
  endpoints: (build) => ({
    getAllHubs: build.query<MappedHubData, GetAllHubsQuery>({
      query: ({ limit, page, order, search }) => ({
        url: `admin/hub/all?limit=${limit}&page=${page}&search=${search}&order=${order}`,
      }),
      transformResponse: (response: GetAllHubsResponse) => {
        if (!response) return {} as MappedHubData;
        else {
          const mappedReponse: HubsTableBodyData[] = response.data.data.map(
            (hub) => {
              return {
                hubId: hub?._id,
                hubName: hub?.name,
                dateCreated: new Date(hub?.created_at)?.toDateString(),
                inspector: `${hub.inspector?.last_name} ${hub.inspector?.first_name}`,
                inspectorId: `${hub.inspector?._id}`,
                stateCountry: `${hub?.state}, ${hub?.country}`,
                totalCarsProcessed: hub?.cars_processed || 0,
                address: `${hub.address}, ${hub?.state}, ${hub?.country}`
              };
            }
          );

          return {
            data: mappedReponse,
            totalCount: response?.data?.pagination?.totalCount,
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
            hubCars: response?.data?.hub_images,
            inspectionCenterId: response?.data?._id,
            inspectionCenterImages: [],
            inspectorFullname:
              response?.data.inspector?.last_name ||
              "" + " " + response?.data.inspector?.first_name ||
              "",
            inspectionCenterDateAdded: new Date(
              response?.data.created_at
            ).toDateString(),
            inspectionCenterTitle: response?.data.name,
            approved: response?.data?.cars_approved,
            declined: response?.data?.cars_declined,
            processed: response?.data?.cars_processed,
            inspectorAddress: response?.data.inspector?.house_address,
            inspectorPhone: response?.data.inspector?.phone_number,
            inspectionCenterLocation: `${response?.data?.state}, ${response?.data?.city}, ${response?.data?.country}`,
            inspectorId: response?.data?.inspector?._id,
          };
          return mapped;
        }
      },
    }),
    addHub: build.mutation<any, FormData>({
      query: (body) => ({
        url: `admin/hub/add-new`,
        method: "POST",
        body,
      }),
    }),
    getCarInspectionHistory: build.query<
      MappedInspectionHistory,
      GetCarInspectionHistoryQuery
    >({
      query: ({ id, limit, page, status }) => ({
        url: `admin/inspector/view-inspected-cars/${id}?limit=${limit}&page=${page}&status=${status}`,
      }),
      transformResponse: (response: GetCarInspectionHistoryRepsonse) => {
        if (!response) return <MappedInspectionHistory>{};
        else {
          const mappedData = response?.data?.data?.map((car) => {
            return {
              carColor: car?.brand_name,
              carId: car?._id,
              carImage: car?.images[0],
              carModel: car?.model,
              plateNumber: car?.plate_number,
            } as CarDescription;
          });
          return {
            totalCount: response?.data?.pagination?.totalCount,
            data: mappedData,
          };
        }
      },
    }),
    getCarsInHub: build.query<MappedCarInHubs, GetCarsInHubQuery>({
      query: ({ id, limit, page, status }) => ({
        url: `admin/hub/view-inspected-cars/${id}?limit=${limit}&page=${page}&status=${status}`,
      }),
      transformResponse: (response: GetCarsInHubResponse) => {
        if (!response) return <MappedInspectionHistory>{};
        else {
          const mappedData = response?.data?.data?.map((car) => {
            return {
              carColor: car?.brand_name,
              carId: car?._id,
              carImage: car?.images[0],
              carModel: car?.model,
              plateNumber: car?.plate_number,
            } as CarDescription;
          });
          return {
            totalCount: response?.data?.pagination?.totalCount,
            data: mappedData,
          };
        }
      },
    }),
  }),
});

export const {
  useGetAllHubsQuery,
  useViewHubQuery,
  useAddHubMutation,
  useGetCarInspectionHistoryQuery,
  useGetCarsInHubQuery,
} = hubsApi;
