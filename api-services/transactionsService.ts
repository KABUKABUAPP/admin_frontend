import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";

import { logout, secondsToMilliSeconds } from "@/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";
import {
  TransactionsDataModel,
  TransactionsModel,
  GetAllTransactionsQuery,
  GetAllTransactions,
  MappedTransactionsCard,
  GetTransactionsCardReponse,
  GetTransactionCardQuery,
} from "@/models/Transactions";

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

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: baseQueryWithLogoutOnTokenExpiration,
  endpoints: (build) => ({
    getAllTransactions: build.query<TransactionsModel, GetAllTransactionsQuery>(
      {
        query: ({ limit, page, search, filter, order }) => ({
          url: `/admin/transaction/all?limit=${limit}&page=${page}&search=${search}&filter=${filter}&order=${order}`,
        }),
        transformResponse: (response: GetAllTransactions) => {
          if (!response) return response as TransactionsModel;
          else {
            console.log('response', response)
            const mappedData = response.data.data.rows.map((tx) => {
              return {
                date: tx?.createdAt,
                narration: tx?.narration,
                price: `${tx?.currency}${tx?.amount}`,
                transactionId: String(tx?.id),
                type: tx?.type,
                user: tx?.user_id,
                amountRemaining: "",
                tripId: tx?.narration_id,
                userType: tx?.user_type,
                name: tx?.full_name
              } as TransactionsDataModel;
            });

            return { totalCount: response.data.total, data: mappedData };
          }
        },
      }
    ),
    getTransactionsCard: build.query<
      MappedTransactionsCard[],
      GetTransactionCardQuery
    >({
      query: ({ range }) => ({
        url: `admin/transaction/cards?range=${range}`,
      }),
      transformResponse: (response: GetTransactionsCardReponse) => {
        if (!response) return <MappedTransactionsCard[]>[];
        else {
          const mapped: MappedTransactionsCard[] = [
            {
              title: "Total Transactions",
              amount: response?.data?.total_transactions || 0,
              isActive: true,
            },
            {
              title: "Money in escrow",
              amount: response?.data?.money_in_escrow || 0,
              isActive: false,
            },
            {
              title: "Active Trip",
              amount: response?.data?.active_trips || 0,
              isActive: false,
            },
            {
              title: "Net income",
              amount: response?.data?.net_income || 0,
              isActive: false,
            },
          ];

          return mapped;
        }
      },
    }),
  }),
});

export const { useGetAllTransactionsQuery, useGetTransactionsCardQuery } =
  transactionsApi;
