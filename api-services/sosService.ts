import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";
import { logout, secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import {
  GetAllSOSResponse,
  GetAllSosQuery,
  MappedSosResponse,
  MappedViewSOSResponse,
  SosTableData,
  ViewSOSQuery,
  ViewSOSResponse,
} from "@/models/Sos";

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

export const sosApi = createApi({
  reducerPath: "sosApi",
  baseQuery: baseQueryWithLogoutOnTokenExpiration,
  endpoints: (build) => ({
    getAllSos: build.query<MappedSosResponse, GetAllSosQuery>({
      query: ({ limit, page, date, startDate, endDate, search, order }) => ({
        url: `admin/sos/get-all?limit=${limit}&page=${page}&date=${date}&search=${search}&order=${order}${
          startDate ? "&dateRange=" : ""
        }${startDate || ""}${endDate ? "&dateRange=" : ""}${endDate || ""}`,
      }),
      transformResponse: (response: GetAllSOSResponse) => {
        if (!response) return {} as MappedSosResponse;
        else {
          const totalCount = response?.data.pagination?.totalCount;
          const mappedReponse: SosTableData[] = response.data.data.map(
            (sos) => {
              return {
                carModel: sos?.trip?.car?.model,
                destination: `${sos?.trip?.end_address.city}, ${sos.trip?.end_address?.state}, ${sos.trip?.end_address?.country}`,
                driver: sos?.trip?.driver?.full_name,
                id: sos?._id,
                origin: `${sos?.trip?.start_address.city}, ${sos?.trip?.start_address.state}, ${sos?.trip?.start_address.country}`,
                plateNumber: sos?.trip?.car?.plate_number,
                raisedBy: sos?.trip?.user?.full_name,
                reason: sos?.reason,
                rider: sos?.trip.user?.full_name,
                status: sos?.status,
              };
            }
          );

          return { data: mappedReponse, totalCount: totalCount };
        }
      },
    }),
    viewSos: build.query<MappedViewSOSResponse, ViewSOSQuery>({
      query: ({ id }) => ({
        url: `admin/sos/view/${id}`,
      }),
      transformResponse: (response: ViewSOSResponse) => {
        if (!response) return <MappedViewSOSResponse>{};
        else
          return <MappedViewSOSResponse>{
            carModel: "",
            destination: `${response?.data?.trip_details?.destination?.city}, ${response?.data?.trip_details?.destination?.state}, ${response?.data?.trip_details?.destination?.country}`,
            driverFullname: response?.data?.driver_details?.full_name,
            driverId: response?.data?.driver_details?._id,
            driverImage: "",
            driverLocation: `${response?.data?.driver_details?.driver?.house_address}, ${response?.data?.driver_details?.driver?.city}, ${response?.data?.driver_details?.driver?.state}, ${response?.data?.driver_details?.driver?.country}`,
            driverRating: response?.data?.driver_details?.average_rating?.value,
            driverTripCount: response?.data?.driver_details?.total_trips,
            driverTripRating: 0,
            endPoint: response?.data?.driver_details?.coordinate,
            estimatedPrice: response?.data?.trip_details?.estimated_price,
            orderId: "",
            origin: `${response?.data?.trip_details?.origin?.city}, ${response?.data?.trip_details?.origin?.country}, ${response?.data?.trip_details?.origin?.country}`,
            paymentType: response?.data?.trip_details?.payment_type,
            plateNumber: ``,
            riderFullName: response?.data?.rider_details?.full_name,
            riderId: response?.data?.rider_details?._id,
            riderImage: response?.data?.rider_details?.profile_image,
            riderLocation: "",
            riderRating: response?.data?.rider_details?.average_rating?.value,
            riderTripCount: response?.data?.rider_details?.total_trips,
            riderTripRating: 0,
            startPoint: response?.data?.driver_details?.coordinate,
            tripEnded: response?.data?.trip_details?.start_time,
            tripStarted: response?.data?.trip_details?.start_time,
            riderComment: "",
            tripRating: 0,
            raisedBy: response?.data?.raised_by,
            reason: response?.data?.reason,
          };
      },
    }),
  }),
});

export const { useGetAllSosQuery, useViewSosQuery } = sosApi;
