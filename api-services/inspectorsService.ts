import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HUBS_BASE_URL } from "@/constants";
import { logout, secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import {
  AddNewInspectorPayload,
  AddNewInspectorResponse,
  GetAllInspectorsQuery,
  GetAllInspectorsResponse,
  GetInspectedCarsPayload,
  GetInspectedCarsResponse,
  GetInspectedCarsResponseMapped,
  InspectorsMappedData,
  InspectorsTableBodyData,
  MappedViewInspector,
  ViewInspectorQuery,
  ViewInspectorResponse,
} from "@/models/Inspectors";

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

export const inspectorsApi = createApi({
  reducerPath: "inspectorsApi",
  baseQuery: baseQueryWithLogoutOnTokenExpiration,
  endpoints: (build) => ({
    getAllInspectors: build.query<InspectorsMappedData, GetAllInspectorsQuery>({
      query: ({ limit, page, search, order }) => ({
        url: `admin/inspector/all?limit=${limit}&page=${page}&search=${search}&order=${order}`,
      }),
      transformResponse: (response: GetAllInspectorsResponse) => {
        if (!response) return {} as InspectorsMappedData;
        else {
          const totalCount = response?.data?.pagination?.totalCount;
          const mappedReponse: InspectorsTableBodyData[] =
            response?.data?.data?.map((inspector) => {
              return {
                carsInHub: 0,
                fullName: `${inspector?.last_name} ${inspector?.first_name}`,
                hub: ``,
                imageUrl: "",
                inspectorId: inspector?._id,
                location: `${inspector?.city}, ${inspector?.state}, ${inspector?.country}`,
                totalCarsProcessed: 0,
              };
            });

          return { data: mappedReponse, totalCount: totalCount };
        }
      },
    }),
    viewInspector: build.query<MappedViewInspector, ViewInspectorQuery>({
      query: ({ inspectorId }) => ({
        url: `admin/inspector/get-one/${inspectorId}`,
      }),
      transformResponse: (response: ViewInspectorResponse) => {
        if (!response) return <MappedViewInspector>{};
        else {
          const { data } = response
          const mapped: MappedViewInspector = {
            fullname: `${data?.last_name} ${data?.first_name}`,
            address: `${data?.house_address}`,
            email: data?.email,
            phone: data?.phone_number,
            totalCarsProcessed: 0,
            approved: 0,
            declined: 0,
            carsInHub: 0,
          };

          return mapped;
        }
      },
    }),
    addNewInspector: build.mutation<AddNewInspectorResponse, AddNewInspectorPayload>({
      query: (body)=>({
        url: 'admin/inspector/add-new',
        method: 'POST',
        body
      })
    }),
    getInspectedCars: build.query<any, GetInspectedCarsPayload>({
      query: ({limit, page, id, status})=>({
        url: `admin/inspector/view-inspected-cars/${id}?limit=${limit}&page=${page}&status=${status}`,
        method: 'GET'
      }),
      transformResponse: (response: any) => {
        
        if (response?.data?.data?.length === 0) return [];


        return response?.data?.data?.map((resp: any) => {
          return {
            id: resp._id,
            car_model: `${resp.brand_name} ${resp.year}, ${resp.color}`,
            plate_no: resp.plate_number,
            image: resp.images.length > 0 ? resp.image[0] : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          }
        })
      }
    }),
    getInspectedCarsPagination: build.query<any, GetInspectedCarsPayload>({
      query: ({limit, page, id, status})=>({
        url: `admin/inspector/view-inspected-cars/${id}?limit=${limit}&page=${page}&status=${status}`,
        method: 'GET'
      }),
      transformResponse: (response: any) => {
        
        if (!response) return {};
        console.log(response?.data?.pagination);
        return response?.data?.pagination;
      }
    })
  })
});

export const { useGetAllInspectorsQuery, useViewInspectorQuery, useAddNewInspectorMutation, useGetInspectedCarsQuery, useGetInspectedCarsPaginationQuery } = inspectorsApi;
