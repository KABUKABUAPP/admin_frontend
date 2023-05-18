import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";
import { secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import {
  GetAllDriversResponse,
  GetAllDriversQuery,
  DriversMappedResponse,
  ViewDriverResponse,
  ViewDriverQuery,
  MappedViewDriver,
} from "@/models/Drivers";

export const driversApi = createApi({
  reducerPath: "driversApi",
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
  tagTypes: ["drivers"],
  endpoints: (build) => ({
    getAllDrivers: build.query<DriversMappedResponse, GetAllDriversQuery>({
      query: ({ limit, page, carOwner, driverStatus, search }) => ({
        url: `admin/driver/all?limit=${limit}&page=${page}&driver_status=${driverStatus}&car_owner=${carOwner}&search=${search}`,
      }),
      providesTags: ["drivers"],
      transformResponse: (response: GetAllDriversResponse) => {
        if (!response) return {} as DriversMappedResponse;
        else {
          const totalCount = response.data.pagination.totalCount;
          const mappedReponse = response.data.drivers.map((driver) => {
            return {
              driverId: driver?._id,
              fullName: driver.user?.full_name,
              location: `${driver.country}, ${driver.state}`,
              imageUrl: "",
              driverType: driver?.car_owner
                ? "Regular Driver"
                : "Sharp Car Driver",
              totalTrips: driver?.total_trips,
              walletBalance: driver?.wallet_balance,
              status: "",
              userId: driver.user._id
            };
          });

          return { data: mappedReponse, totalCount: totalCount };
        }
      },
    }),
    viewDriver: build.query<MappedViewDriver, ViewDriverQuery>({
      query: ({ id }) => ({
        url: `admin/driver/view/${id}`,
      }),
      transformResponse: (response: ViewDriverResponse) => {
        if (!response) return <MappedViewDriver>{};
        else {
          const { data } = response;
          const mapped: MappedViewDriver = {
            driverInfo: {
              image: "",
              fullName: data.driver?.user?.full_name,
              address: data?.driver?.house_address,
              email: data?.driver?.user.email,
              phone: data.driver?.user?.phone_number,
              tripCount: data?.driver?.user?.total_trips,
              rating: 0,
            },
            carDetails: {
              carImages: [],
              carModel: data.car_details?.model,
              carColor: data.car_details?.color,
              plateNumber: data.car_details?.plate_number,
            },
            financials: {
              walletBalance: data?.wallet_balance?.toLocaleString(),
              total: data?.total_earned?.toLocaleString(),
              subscriptionDue: "",
            },
            guarantor: {
              address: data.driver?.user?.guarantor?.address,
              fullname: data.driver?.user?.guarantor?.name,
              image: data.driver?.user?.guarantor?.image,
              phone: data.driver?.user?.guarantor?.phone_number,
              relationship: data.driver?.user?.guarantor?.relationship,
            },
            carDocs: {
              totalDocs: data.car_documents.length,
              documents: data.car_documents?.map((doc) => {
                return {
                  title: doc.title,
                  docImage: "",
                  docId: doc._id,
                };
              }),
            },
          };

          return mapped;
        }
      },
    }),
  }),
});

export const { useGetAllDriversQuery, useViewDriverQuery } = driversApi;
