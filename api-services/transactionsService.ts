import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";

import { secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import { TransactionsDataModel, TransactionsModel, GetAllTransactionsQuery, GetAllTransactions } from "@/models/Transactions";

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
      query: ({ limit, page, search, filter, order }) => ({
        url: `/admin/transaction/all?limit=${limit}&page=${page}&search=${search}&filter=${filter}&order=${order}`,
      }),
      transformResponse: (response: GetAllTransactions)=>{
        if(!response) return response as TransactionsModel
        else {
            const mappedData = response.data.data.rows.map((tx)=>{
                return {
                  date: tx?.createdAt,
                  narration: tx?.narration,
                  price: `${tx?.currency}${tx?.amount}`,
                  transactionId: String(tx.id),
                  type: tx?.type,
                  user: tx?.user_id,
                  amountRemaining: '',
                  tripId: tx?.narration_id,
                  userType: tx?.user_type
                } as TransactionsDataModel
            })

            return { totalCount: response.data.total, data: mappedData}
        }
      }
    }),
  }),
});

export const { useGetAllTransactionsQuery } = transactionsApi;
