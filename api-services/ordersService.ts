import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";

import {
  GetOrdersResponse,
  ViewOrderResponse,
  ViewOrderQuery,
  GetAllOrdersQuery,
} from "@/models/Orders";

import { logout, secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import {
  GetAllTripsQuery,
  GetAllTripsResponse,
  MappedViewTripResponse,
  TripData,
  ViewTripQuery,
} from "@/models/Trips";

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
});
const baseQueryWithLogoutOnTokenExpiration: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    logout(() => {
      window.location.pathname = "/auth/login";
    });
  }
  return result;
};

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQueryWithLogoutOnTokenExpiration,
  endpoints: (build) => ({
    getAllOrdersQuery: build.query<GetAllTripsResponse, any>({
      query: ({ limit, order, page, search, status, dashboard_state }) => ({
        url: `admin/order/get-all-trip-orders?limit=${limit}&page=${page}&status=${status}&search=${search}${dashboard_state !== 'all' ? `&dashboard_state=${dashboard_state}` : ''}`,
      }),
      transformResponse: (response: GetOrdersResponse) => {
        if (!response) return <GetAllTripsResponse>{};
        else {
          const status = response.status;
          const pagination = response.data.pagination;
          const mappedData = response.data.data.map((o) => {
            return <TripData>{
              _id: o._id,
              cancel_trip_reason: o?.status_remark,
              car: {
                _id: o?.driver?.driver?.current_car?._id,
                brand_name: o?.driver?.driver?.current_car?.brand_name,
                color: o?.driver?.driver?.current_car?.color,
                model: o?.driver?.driver?.current_car?.color,
                plate_number: o?.driver?.driver?.current_car?.plate_number,
                year: o?.driver?.driver?.current_car?.plate_number,
              },
              createdAt: "NOT DONE",
              driver: {
                _id: o?.driver?.driver?._id,
                average_rating: { count: 0, value: 0 },
                full_name: o?.driver?.full_name,
                profile_image: "",
              },
              end_address: {
                city: o?.end_address?.city,
                country: o?.end_address?.country,
                state: o?.end_address?.city,
                street: o?.end_address?.street,
              },
              start_address: {
                city: o?.start_address?.city,
                country: o?.start_address?.country,
                state: o?.start_address?.city,
                street: o?.start_address?.street,
              },
              end_time: "NOT DONE",
              id: o?._id,
              price: 0,
              price_details: {
                base_fare: 0,
                booking_fee: 0,
                distace: 0,
                driver_earned: 0,
                kabu_split: 0,
                price_after_coupon: 0,
                state_levy: 0,
                time: 0,
                total_charge: 0,
                wait_time: 0,
              },
              rating: { count: 0, value: 0 },
              status: o?.status,
              user: {
                _id: o?.user?._id,
                full_name: o?.user?.full_name,
              },
            };
          });

          return {
            status,
            data: {
              data: mappedData,
              pagination,
            },
            message: response.message,
          };
        }
      },
    }),
    // viewOrder: build.query<MappedViewTripResponse, ViewTripQuery>({
    //   query: ({ id }) => ({
    //     url: `admin/order/view/${id}`,
    //   }),
    //   transformResponse: (response: ViewOrderResponse) => {
    //     if (!response) return {} as MappedViewTripResponse;
    //     return {
    //      carModel: `${response?.data?.car}`,
    //      destination: `${response?.data?.destination.street}, ${response?.data?.destination?.city}, ${response?.data?.destination.state}, ${response?.data?.destination.country}`,
    //      driverFullname: `${response?.data?.driver_details}`,
    //      driverId: 
    //     } as MappedViewTripResponse;
    //   },
    // }),
  }),
});

export const { useGetAllOrdersQueryQuery } = ordersApi;
