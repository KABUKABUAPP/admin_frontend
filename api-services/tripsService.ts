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

import { capitalizeAllFirstLetters, logout, secondsToMilliSeconds } from "@/utils";
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
      query: ({ limit, page, status, search, order,type }) => ({
        url: `/admin/trip/get-all?limit=${limit}&page=${page}&status=${status}&search=${search}&order=${order}&type=${type}`,
      }),
    }),
    viewTrip: build.query<any, any>({
      query: ({ id }) => ({
        url: `/admin/trip/view/${id}`,
      }),
      transformResponse: (response: any) => {
        if (!response) return {} as any;
        const tripData = response?.data ?? {};
        const tripCar =
          tripData?.car ||
          tripData?.driver_details?.driver?.current_car ||
          tripData?.driver?.driver?.current_car ||
          tripData?.driver?.current_car ||
          {};

        const formatJoined = (
          parts: Array<string | number | null | undefined>,
          separator: string
        ) =>
          parts
            .map((part) => (typeof part === "string" ? part.trim() : part))
            .filter((part) => part !== undefined && part !== null && part !== "")
            .join(separator);

        const rawCarModel = formatJoined(
          [tripCar?.brand_name, tripCar?.model],
          " "
        );
        const tripPrice =
          tripData?.price ?? tripData?.trip_price ?? tripData?.estimated_price;
        const tripStartedTime =
          tripData?.start_time ??
          tripData?.trip_start_time ??
          tripData?.startTime ??
          null;
        const pickupTimeRaw =
          tripData?.actual_start_time ??
          tripData?.actualStartTime ??
          tripData?.pickup_time ??
          tripData?.pickupTime ??
          tripData?.pick_up_time ??
          tripData?.time_of_pickup ??
          tripData?.pickup_at ??
          null;
        const tripEndedTime = tripData?.time_of_cancel
          ? tripData?.time_of_cancel
          : tripData?.trip_completion_time;

        const actualStartPointRaw =
          tripData?.actual_start_point || tripData?.actualStartPoint || null;
        const isZeroCoordinatePoint = (point: any) => {
          if (!Array.isArray(point) || point.length < 2) return false;
          const first = Number(point[0]);
          const second = Number(point[1]);
          return !Number.isNaN(first) && !Number.isNaN(second) && first === 0 && second === 0;
        };
        const actualStartPoint = isZeroCoordinatePoint(actualStartPointRaw)
          ? null
          : actualStartPointRaw;

        return {
          carModel: capitalizeAllFirstLetters(rawCarModel),
          destination: formatJoined(
            [
              tripData?.destination?.city,
              tripData?.destination?.state,
              tripData?.destination?.country,
            ],
            ", "
          ),
          driverFullname: tripData?.driver_details?.full_name || "",
          driverId: tripData?.driver_details?._id || "",
          driverLocation: formatJoined(
            [
              tripData?.driver_details?.driver?.city,
              tripData?.driver_details?.driver?.state,
              tripData?.driver_details?.driver?.country,
            ],
            ", "
          ),
          driverRating: tripData?.driver_rating,
          driverTripCount: tripData?.driver_details?.total_trips,
          tripPrice,
          estimatedPrice: tripData?.estimated_price,
          origin: capitalizeAllFirstLetters(
            formatJoined(
              [
                tripData?.origin?.city,
                tripData?.origin?.state,
                tripData?.origin?.country,
              ],
              ", "
            )
          ),
          paymentType: capitalizeAllFirstLetters(tripData?.payment_type),
          plateNumber:
            tripCar?.plate_number ||
            tripData?.plate_number ||
            tripData?.plateNumber ||
            "",
          riderFullName: tripData?.rider_details?.full_name || "",
          riderId: tripData?.rider_details?._id || "",
          riderLocation: tripData?.rider_details?.state || "",
          riderRating: tripData?.rider_details?.average_rating?.value,
          riderTripCount: tripData?.rider_details?.total_trips,
          tripEnded: tripEndedTime,
          tripStarted: tripStartedTime,
          pickupTime: pickupTimeRaw,
          status: tripData?.status,
          driverImage: tripData?.driver_details?.profile_image,
          riderImage: tripData?.rider_details?.profile_image,
          orderId: tripData?.order_id,
          startPoint: tripData?.start_point,
          actualStartPoint,
          pickupPoint: actualStartPoint,
          endPoint: tripData?.end_point,
          tripHistory: (() => {
            if (!Array.isArray(tripData?.trip_history)) return null;
            const history = tripData.trip_history
              .map((item: any) => {
                const coord =
                  item?.coordinate ??
                  item?.coordinates ??
                  item?.location?.coordinates ??
                  item?.point ??
                  null;
                if (!coord) return null;
                if (Array.isArray(coord) && coord.length >= 2) {
                  return [coord[0], coord[1]];
                }
                if (typeof coord === "object") {
                  const lng =
                    coord?.lng ??
                    coord?.long ??
                    coord?.longitude ??
                    coord?.x;
                  const lat = coord?.lat ?? coord?.latitude ?? coord?.y;
                  if (
                    lng !== undefined &&
                    lng !== null &&
                    lat !== undefined &&
                    lat !== null
                  ) {
                    return [lng, lat];
                  }
                }
                if (typeof coord === "string") {
                  const split = coord
                    .split(",")
                    .map((value: string) => value.trim())
                    .filter(Boolean);
                  if (split.length >= 2) {
                    return [split[0], split[1]];
                  }
                }
                return null;
              })
              .filter(Boolean);
            return history.length > 0 ? history : null;
          })(),
          driverTripRating: tripData?.driver_rating,
          riderTripRating: tripData?.rider_rating,
          tripRating: tripData?.trip_rating,
          riderComment: tripData?.rider_comment,
          couponDetails: tripData?.coupon_details ? tripData?.coupon_details : null,
          createdAt: tripData?.created_at ? tripData?.created_at : null,
          paymentDetails: tripData?.payment_details ? tripData?.payment_details : null
        } as any;
      },
    }),
    getDriverTripHistory: build.query<
      DriverTripHistory,
      GetDriverTripHistoryQuery
    >({
      query: ({ driverId, limit, page }) => ({
        url: `admin/trip/for-a-driver/${driverId}?limit=${limit}&page=${page}&type=trip`,
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
