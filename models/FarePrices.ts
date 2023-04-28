export interface FarePricesTableData {
  profileId: string;
  city: string;
  stateCountry: string;
  totalFares: number;
  dateCreated: Date;
}

export interface FarePrice {
  _id: string;
  city: string;
  state: string;
  country: string;
  currency: string;
  created_at: Date;
  updated_at: Date;
  __v: 0;
}

export interface GetAllFarePricesResponse {
  status: string;
  data: { data: FarePrice[] };
  message: string;
  pagination: {
    pageSize: number;
    totalCount: number;
    pageCount: number;
    currentPage: number;
    hasNext: boolean;
  };
}

export interface FarePricesMappedData {
  data: FarePricesTableData[];
}
