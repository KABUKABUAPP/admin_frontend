import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RIDES_BASE_URL } from "@/constants";

import { capitalizeAllFirstLetters, logout, secondsToMilliSeconds } from "@/utils";
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
    getAllTransactions: build.query<any, any>(
      {
        query: ({ limit, page, search, filter, order, dateStart, dateEnd, minAmount, transactionStatus }) => ({
          url: `/admin/transaction/all?limit=${limit}&page=${page}&search=${search}&filter=${filter.toUpperCase()}&order=${order}${dateStart ? `&dateFilter=${dateStart}` : ''}${dateEnd ? `&dateFilter=${dateEnd}` : ''}${minAmount ? `&minAmount=${minAmount}` : ''}&status=${transactionStatus}`
        }),
        transformResponse: (response: any) => {
          if (!response) return response as any;
          else {
            console.log({response})
            const mappedData = response.data.data.rows.map((tx: any) => {
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
                name: capitalizeAllFirstLetters(tx?.full_name),
                status: tx?.status
              };
            });

            return { totalCount: response.data.total, data: mappedData, totalWithdrawalCredit: response?.data?.summation?.credit?.success, totalWithdrawalDebit: response?.data?.summation?.debit?.success };
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
    getSingleTransaction: build.query<any, any>(
      {
        query: ({ narration, narration_id, id }) => ({
          url: `admin/transaction/view/${id}?narration=${narration}&narration_id=${narration_id}`
        }),
        transformResponse: (response: any) => {
          if (!response) return {};
          else {
            return response?.data
          }
        },
      }
    ),
    getTotalWalletBalances: build.query<any, any>(
      {
        query: ({ narration, narration_id, id }) => ({
          url: `admin/transaction/view/${id}?narration=${narration}&narration_id=${narration_id}`
        }),
        transformResponse: (response: any) => {
          if (!response) return {};
          else {
            return response?.data
          }
        },
      }
    )
  }),
});

export const { useGetAllTransactionsQuery, useGetTransactionsCardQuery, useGetSingleTransactionQuery } =
  transactionsApi;
