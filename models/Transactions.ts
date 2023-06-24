export interface TransactionsDataModel {
  transactionId: string;
  user: string;
  type: string;
  narration: string;
  price: string;
  date: string;
  amountRemaining: string;
  userType: string;
  tripId: string;
}

export interface TransactionsModel {
  data: TransactionsDataModel[];
  totalCount: number;
}

export interface GetAllTransactionsQuery {
  limit: number;
  page: number;
  search: string;
  filter: string;
  order: string;
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
  user_type: string;
  narration_id: string;
}

export interface GetTransactionsCardReponse {
  status: string;
  code: number;
  data: {
    total_transactions: number;
    net_income: number;
    active_trips: number;
    money_in_escrow: number;
  };
  message: string;
}

export interface MappedTransactionsCard {
  title: string;
  amount: number;
  isActive: boolean;
}

export interface GetTransactionCardQuery {
  range: string
}
