import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";
import { logout, secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import {
  GetAllSharpCarsQuery,
  GetAllSharpCarsResponse,
  MappedSharpCarsData,
  SharpCarsTableBodyData,
} from "@/models/SharpCars";

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

export const sharpCarsApi = createApi({
  reducerPath: "sharpCarsApi",
  baseQuery: baseQueryWithLogoutOnTokenExpiration,
  endpoints: (build) => ({
    getAllSharpCars: build.query<MappedSharpCarsData, GetAllSharpCarsQuery>({
      query: ({ limit, page }) => ({
        url: `admin/car/get-all=${limit}&page=${page}`,
      }),
      transformResponse: (response: GetAllSharpCarsResponse) => {
        if (!response) return {} as MappedSharpCarsData;
        else {
          const mappedReponse: SharpCarsTableBodyData[] =
            response.data.data.map((car) => {
              return {
                carBrandModel: car?.brand_name,
                carId: car?._id,
                dateTimeAdded: car?.created_at.toDateString(),
                driver: "",
                licenseNumber: car?.plate_number,
              };
            });

          return {
            data: mappedReponse,
            totalCount: response?.data?.pagination?.totalCount,
          };
        }
      },
    }),
  }),
});

export const { useGetAllSharpCarsQuery } = sharpCarsApi;
