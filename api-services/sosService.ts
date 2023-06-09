import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {  RIDES_BASE_URL } from "@/constants";
import { secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import {
  GetAllSOSResponse,
  GetAllSosQuery,
  MappedSosResponse,
  SosTableData,
} from "@/models/Sos";

export const sosApi = createApi({
  reducerPath: "sosApi",
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
    getAllSos: build.query<MappedSosResponse, GetAllSosQuery>({
      query: ({ limit, page, date, dateRange , search}) => ({
        url: `admin/sos/get-all?limit=${limit}&page=${page}&date=${date}&search=${search}`,
      }),
      transformResponse: (response: GetAllSOSResponse) => {
        if (!response) return {} as MappedSosResponse;
        else {
          const totalCount = response.data.pagination.totalCount;
          const mappedReponse: SosTableData[] = response.data.data.map(
            (sos) => {
              return {
                carModel: sos.trip?.car?.model,
                destination: `${sos?.trip?.end_address.city}, ${sos.trip?.end_address?.state}, ${sos.trip?.end_address?.country}`,
                driver: sos.trip?.driver?.full_name,
                id: sos?._id,
                origin: `${sos.trip?.start_address.city}, ${sos.trip?.start_address.state}, ${sos.trip?.start_address.country}`,
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
  }),
});

export const { useGetAllSosQuery } = sosApi;
