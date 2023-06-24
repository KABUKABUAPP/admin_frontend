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
  ApproveDeclineDriverResponse,
  ApproveDeclineDriverQuery,
  InspectDocumentQuery,
  ViewGuarantorQuery,
  VerifyGuarantorPayloadModel,
  MappedViewGuarantorResponse,
  ViewGuarantorResponse,
  DriversTableBodyData,
  BlockDriverQuery,
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
  tagTypes: ["drivers", "driver"],
  endpoints: (build) => ({
    getAllDrivers: build.query<DriversMappedResponse, GetAllDriversQuery>({
      query: ({ limit, page, carOwner, driverStatus, search, order, status }) => ({
        url: `admin/driver/all?limit=${limit}&page=${page}&driver_status=${driverStatus}&car_owner=${carOwner}&search=${search}&order=${order}&status=${status ? status : ''}`,
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
              imageUrl: driver?.user?.profile_image,
              driverType: driver?.car_owner ===true
                ? "Regular Driver"
                : "Sharp Car Driver",
              totalTrips: driver?.user?.total_trips,
              walletBalance: driver?.wallet_balance || '0',
              status: driver?.approval_status,
              userId: driver.user._id,
              statusRemark: driver?.status_remark
            } as DriversTableBodyData;
          });

          return { data: mappedReponse, totalCount: totalCount };
        }
      },
    }),
    viewDriver: build.query<MappedViewDriver, ViewDriverQuery>({
      query: ({ id }) => ({
        url: `admin/driver/view/${id}`,
      }),
      providesTags: ["driver"],
      transformResponse: (response: ViewDriverResponse) => {
        if (!response) return <MappedViewDriver>{};
        else {
          const { data } = response;
          const mapped: MappedViewDriver = {
            driverInfo: {
              image: data?.driver?.user?.profile_image,
              fullName: data.driver?.user?.full_name,
              address: data?.driver?.house_address,
              email: data?.driver?.user.email,
              phone: data.driver?.user?.phone_number,
              tripCount: data?.driver?.user?.total_trips,
              rating: 0,
              id: data?.driver?._id,
              isBlocked: data?.driver?.user?.isBlocked,
              declineCount: data?.driver?.admin_decline_count
            },
            carDetails: {
              carImages: data?.car_details.images,
              carModel: data.car_details?.model,
              carColor: data.car_details?.color,
              plateNumber: data.car_details?.plate_number,
            },
            financials: {
              walletBalance: data?.wallet_balance?.toLocaleString(),
              total: '',
              subscriptionDue: data?.total_earned?.toLocaleString(),
            },
            guarantor: {
              reason: data.driver?.admin_approval_remark,
              address: data.driver?.user?.guarantor?.address,
              fullname: data.driver?.user?.guarantor?.name,
              image: data.driver?.user?.guarantor?.image,
              phone: data.driver?.user?.guarantor?.phone_number,
              relationship: data.driver?.user?.guarantor?.relationship,
              responded: data.driver?.user?.guarantor_response,
              responseStatus: data.driver?.user?.guarantor_status,
            },
            carDocs: {
              totalDocs: data.car_documents.length,
              documents: data.car_documents?.map((doc) => {
                return {
                  title: doc.title,
                  docImage: doc.url,
                  docId: doc?.doc_number,
                  status: doc.status,
                  id: doc._id
                };
              }),
            },
          };

          return mapped;
        }
      },
    }),
    approveDeclineDriver: build.mutation<
      ApproveDeclineDriverResponse,
      ApproveDeclineDriverQuery
    >({
      query: ({ driverId, reason, status }) => ({
        url: `admin/driver/approve-decline/${driverId}`,
        method: "PUT",
        body: { reason, status },
      }),
    }),
    inspectDocument: build.mutation<any, InspectDocumentQuery>({
      query: ({ docId, status }) => ({
        url: `admin/driver/inspect-document/${docId}?status=${status}`,
        method: "PUT",
      }),
      invalidatesTags: ["driver"],
    }),
    viewGuarantor: build.query<MappedViewGuarantorResponse, ViewGuarantorQuery>(
      {
        query: ({ id }) => ({
          url: `admin/driver/view-a-guarantor/${id}`,
        }),
        transformResponse: (response: ViewGuarantorResponse) => {
          if (!response) return <MappedViewGuarantorResponse>{};
          else {
            return {
              address: response.data?.address,
              fullname: response?.data?.full_name,
              phone: response.data?.phone_number,
              relationship: response.data?.relationship,
              image: response?.data?.image,
            } as MappedViewGuarantorResponse;
          }
        },
      }
    ),
    verifyGuarantor: build.mutation<any, VerifyGuarantorPayloadModel>({
      query: ({ id, ...rest }) => ({
        url: `admin/driver/verify-a-guarantor/${id}`,
        method: "PUT",
        body: { ...rest },
      }),
    }),
    toggleBlockDriver: build.mutation<any, BlockDriverQuery>({
      query: ({ reason, driverId })=>({
        url: `admin/driver/block-unblock/${driverId}?reason=${reason}`,
        method: 'PUT'
      }),
      invalidatesTags: ['driver']
    })
  }),
});

export const {
  useGetAllDriversQuery,
  useViewDriverQuery,
  useApproveDeclineDriverMutation,
  useInspectDocumentMutation,
  useViewGuarantorQuery,
  useVerifyGuarantorMutation,
  useToggleBlockDriverMutation
} = driversApi;
