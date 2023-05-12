export interface TransactionsDataModel {
  transactionId: string;
  origin: string;
  destination: string;
  riderName: string;
  driverName: string;
  carModel: string;
  plateNumber: string;
  status: string;
  price: number;
}

export interface TransactionsModel {
  data: TransactionsDataModel[];
  totalCount: number;
}

export interface GetAllTransactionsQuery {
    limit: number;
    page: number;
}
