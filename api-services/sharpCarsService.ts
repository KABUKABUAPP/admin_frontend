import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";
import { secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import {
  GetAllSharpCarsQuery,
  GetAllSharpCarsResponse,
  MappedSharpCarsData,
  SharpCarsTableBodyData,
} from "@/models/SharpCars";

export const sharpCarsApi = createApi({
  reducerPath: "sharpCarsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${RIDES_BASE_URL}/`,
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
                carBrandModel: car.brand_name,
                carId: car._id,
                dateTimeAdded: car.created_at.toDateString(),
                driver: "",
                licenseNumber: car.plate_number,
              };
            });

          return {
            data: mappedReponse,
            totalCount: response.data.pagination.totalCount,
          };
        }
      },
    }),
  }),
});

export const { useGetAllSharpCarsQuery } = sharpCarsApi;
