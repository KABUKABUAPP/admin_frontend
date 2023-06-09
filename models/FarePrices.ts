export interface FarePricesTableData {
  profileId: string;
  city: string;
  stateCountry: string;
  totalFares: number;
  dateCreated: string;
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
  search: string;
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
    total_trips_in_state: number;
    __v: number;
  };
  message: string;
}

export interface ViewFareQuery {
  id: string;
}

export interface CreateFarePricePayload {
  state: string;
  country: string;
  base_fare: string;
  distance_per_km: string;
  time_per_min: string;
  state_levy: string;
  booking_fee: string;
  waiting_time_per_min: string;
  surge_multiplier: string;
  driver_fee_monthly_payment: string;
  driver_fee_sharp_payment: string;
  payment_types_available: {
    cash: boolean;
    wallet: boolean;
    card: boolean;
  };
}

export interface CreateFarePriceResponse {
  status: string;
  data: {
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
    driver_fee: {
      monthly_payment: number;
      sharp_payment: number;
    };
    payment_types_available: {
      cash: boolean;
      wallet: boolean;
      card: boolean;
    };
    currency: string;
    _id: string;
    created_at: string;
    updated_at: string;
    __v: 0;
  };
  message: string;
}
