import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";
import {
  GetAllTripsResponse,
} from "@/models/Trips";

import { secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import { TransactionsDataModel, TransactionsModel, GetAllTransactionsQuery } from "@/models/Transactions";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${RIDES_BASE_URL}`,
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
    getAllTransactions: build.query<TransactionsModel, GetAllTransactionsQuery>({
      query: ({ limit, page,}) => ({
        url: `/admin/trip/get-all?limit=${limit}&page=${page}`,
      }),
      transformResponse: (response: GetAllTripsResponse)=>{
        if(!response) return response as TransactionsModel
        else {
            const mappedData = response.data.data.map((tx)=>{
                return {
                    carModel: '',
                    destination: `${tx?.end_address?.state || ''}, ${tx?.end_address?.city}, ${tx?.end_address?.country}`,
                    driverName: `${tx?.driver?.user || ''}`,
                    origin: `${tx?.start_address?.state}, ${tx?.start_address?.city}, ${tx?.start_address?.country}`,
                    plateNumber: ``,
                    price: tx?.price,
                    riderName:`${tx?.user?.full_name || ''}`,
                    status: tx?.status,
                    transactionId: tx?._id
                } as TransactionsDataModel
            })

            return { totalCount: response.data.pagination.totalCount, data: mappedData}
        }
      }
    }),
  }),
});

export const { useGetAllTransactionsQuery } = transactionsApi;
