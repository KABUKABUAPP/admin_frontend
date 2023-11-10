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
              let inspectorLocation = ``

              if (inspector?.city) inspectorLocation += inspector?.city + ', ';
              if (inspector?.state) inspectorLocation += inspector?.state + ', ';
              if (inspector?.country) inspectorLocation += inspector?.country;

              return {
                carsInHub: 0,
                fullName: `${inspector?.last_name} ${inspector?.first_name}`,
                hub: ``,
                imageUrl: "",
                inspectorId: inspector?._id,
                location: inspectorLocation,
                totalCarsProcessed: inspector?.cars_processed,
                username: inspector?.username
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
            totalCarsProcessed: data?.cars_processed,
            approved: data?.cars_approved,
            declined: data?.cars_declined
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
    getInspectedCars: build.query<any, any>({
      query: ({limit, page, id, status, search})=>({
        url: `admin/inspector/view-inspected-cars/${id}?limit=${limit}&page=${page}&status=${status}&`,
        method: 'GET'
      }),
      transformResponse: (response: any) => {
        
        //if (response?.data?.data?.length === 0) return [];


        return response?.data?.data?.map((resp: any) => {
          return {
            id: resp._id,
            car_model: `${resp.brand_name} ${resp.year}, ${resp.color}`,
            plate_no: resp.plate_number,
            image: resp.images.length > 0 ? resp.image[0] : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          }
        })

        /*return [
          {
            id: '2348039215852',
            car_model: `Toyota Corolla 2008, Black`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Toyota Avensis 2002, Yellow`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Peugeot 606 2013, Black`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Toyota Venza 2002, Teal`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Pontiac Vibe 2013, Blue`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Toyota Matrix 2003, Black`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Nissan Passat 2013, Black`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Volkswagen Golf 2012, Yellow`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `VBoot Benz 1934, Gold`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Toyota Sienna 1973, Orange`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Brabus Make I No Lie 2013, Red`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Range Rover Sport 1999, Whitesmoke`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `OPEL Something, Yellow`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Toyota Avensis 2002, Yellow`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Toyota Camry 2002, Green`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Lexus C350 2009, Black`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Nissan Primera 2002, White`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Mazda 626 2010, Light Gray`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Peugeot 404 1992, Violet`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Mitsibushi Galant 2013, Gray`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Acura TSX 2013, Black`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Honda City 2004, Indigo`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Mercedez Benz 2014, Yellow`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          },
          {
            id: '2348039215852',
            car_model: `Honda Accord 2002, Green`,
            plate_no: '2348039215852',
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          }
        ]*/
      }
    }),
    getInspectedCarsPagination: build.query<any, GetInspectedCarsPayload>({
      query: ({limit, page, id, status, search})=>({
        url: `admin/inspector/view-inspected-cars/${id}?limit=${limit}&page=${page}&status=${status}`,
        method: 'GET'
      }),
      transformResponse: (response: any) => {
        
        if (!response) return {};
        return response?.data?.pagination;
      }
    })
  })
});

export const { useGetAllInspectorsQuery, useViewInspectorQuery, useAddNewInspectorMutation, useGetInspectedCarsQuery, useGetInspectedCarsPaginationQuery } = inspectorsApi;
