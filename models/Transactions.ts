export interface TransactionsDataModel {
  transactionId: string;
  user: string;
  type: string;
  narration: string;
  price: string;
  date: string;
}

export interface TransactionsModel {
  data: TransactionsDataModel[];
  totalCount: number;
}

export interface GetAllTransactionsQuery {
  limit: number;
  page: number;
  search: string
}

export interface GetAllTransactions {
  status: string;
  code: number;
  data: {
    data: {
      count: number;
      rows: TransactionDto[];
    };
    total: number;
    currentPage: number;
    hasNext: number;
    hasPrevious: boolean;
    perPage: number;
    totalPages: number;
  };
}

export interface TransactionDto {
  id: number;
  amount: number;
  type: string;
  user_id: string;
  createdAt: string;
  client_reference: string;
  status: string;
  currency: string;
  narration: string;
  full_name: string;
}
