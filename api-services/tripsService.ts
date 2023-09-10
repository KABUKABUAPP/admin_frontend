import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";
import {
  GetAllTripsResponse,
  ViewTripQuery,
  ViewTripResponse,
  MappedViewTripResponse,
  DriverTripHistoryModel,
  GetDriverTripHistoryQuery,
  GetDriverTripHistoryResponse,
  DriverTripHistory,
} from "@/models/Trips";
import { GetAllTripsQuery } from "@/models/Trips";

import { logout, secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";

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


export const tripsApi = createApi({
  reducerPath: "tripsApi",
  baseQuery: baseQueryWithLogoutOnTokenExpiration,
  endpoints: (build) => ({
    getAllTrips: build.query<GetAllTripsResponse, GetAllTripsQuery>({
      query: ({ limit, page, status, search, order }) => ({
        url: `/admin/trip/get-all?limit=${limit}&page=${page}&status=${status}&search=${search}&order=${order}`,
      }),
    }),
    viewTrip: build.query<MappedViewTripResponse, ViewTripQuery>({
      query: ({ id }) => ({
        url: `/admin/trip/view/${id}`,
      }),
      transformResponse: (response: ViewTripResponse) => {
        if (!response) return {} as MappedViewTripResponse;
        return {
          carModel: `${response?.data?.car?.brand_name} ${response?.data?.car?.brand_name}`,
          destination: `${response?.data?.destination?.city}, ${response?.data?.destination?.state}, ${response?.data?.destination?.country}`,
          driverFullname: `${response?.data?.driver_details?.full_name}`,
          driverId: `${response?.data?.driver_details._id}`,
          driverLocation: `${response?.data?.driver_details?.driver?.city}, ${response?.data?.driver_details.driver.state}, ${response.data.driver_details.driver.country}`,
          driverRating: response?.data?.driver_rating,
          driverTripCount: response?.data?.driver_details?.total_trips,
          estimatedPrice: response?.data?.estimated_price,
          origin: `${response?.data?.origin.city}, ${response?.data?.origin.state}, ${response?.data?.origin.country}`,
          paymentType: response?.data?.payment_type,
          plateNumber: response?.data?.car?.plate_number,
          riderFullName: response?.data?.rider_details.full_name,
          riderId: response?.data?.rider_details._id,
          riderLocation: response?.data?.rider_details?.state,
          riderRating: response?.data?.rider_details?.average_rating.value,
          riderTripCount: response.data.rider_details.total_trips,
          tripEnded: response?.data?.trip_completion_time,
          tripStarted: response?.data?.start_time,
          driverImage: response?.data?.driver_details?.profile_image,
          riderImage: response.data.rider_details.profile_image,
          orderId: response.data.order_id,
          startPoint: response?.data?.start_point,
          endPoint: response?.data?.end_point,
          driverTripRating: response?.data?.driver_rating,
          riderTripRating: response?.data?.rider_rating,
          tripRating: response?.data?.trip_rating,
          riderComment: response?.data?.rider_comment
        } as MappedViewTripResponse;
      },
    }),
    getDriverTripHistory: build.query<
      DriverTripHistory,
      GetDriverTripHistoryQuery
    >({
      query: ({ driverId, limit, page }) => ({
        url: `admin/trip/for-a-driver/${driverId}?limit=${limit}&page=${page}`,
        method: "GET",
      }),
      transformResponse: (response: GetDriverTripHistoryResponse) => {
        if (!response) return <DriverTripHistory>{};
        else {
          const history = response.data.data.map((item) => {
            return {
              amount: item?.price,
              date: item?.createdAt,
              destinationTop: item?.end_address.city,
              destinationBottom: `${item?.end_address.state}, ${item?.end_address.country}`,
              id: item._id,
              originTop: `${item?.start_address.city}`,
              originBottom: `${item?.start_address.country}, ${item?.start_address.state}`,
              paymentMethod: item?.payment_type,
            } as DriverTripHistoryModel;
          });

          return {
            totalCount: response.data.pagination.totalCount,
            data: history,
          };
        }
      },
    }),
  }),
});

export const {
  useGetAllTripsQuery,
  useViewTripQuery,
  useGetDriverTripHistoryQuery,
} = tripsApi;
