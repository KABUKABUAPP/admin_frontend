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

export interface GetAllFarePricesQuery {
  search: string
}

export interface ViewFarePriceResponse {
  status: string;
  code: number;
  data: {
    driver_fee: {
      monthly_payment: number;
      sharp_payment: number;
    };
    payment_types_available: {
      cash: boolean;
      wallet: boolean;
      card: boolean;
    };
    _id: string;
    state: string;
    country: string;
    base_fare: number;
    distance_per_km: number;
    time_per_min: number;
    state_levy: number;
    booking_fee: number;
    waiting_time_per_min: number;
    surge_multiplier: number;
    surge_status: boolean;
    currency: string;
    created_at: string;
    updated_at: string;
    __v: number;
  };
  message: string;
}

export interface ViewFareQuery {
  id: string;
}
