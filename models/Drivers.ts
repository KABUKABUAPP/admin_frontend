export interface DriversTableBodyData {
  driverId?: string;
  fullName?: string;
  location?: string;
  imageUrl?: string;
  driverType?: string;
  totalTrips?: number;
  walletBalance?: string;
  status?: string;
}

export interface DriversMappedResponse {
  data: DriversTableBodyData[],
  totalCount: number
}

export interface Driver {
  total_trips: number;
  _id: string;
  user: {
    _id: string;
    full_name: string;
  };
  car_owner: boolean;
  state: string;
  country: string;
  wallet_balance: string;
}

export interface GetAllDriversResponse {
  status: string;
  data: {
    drivers: Driver[];
    pagination: {
      pageSize: number;
      totalCount: number;
      pageCount: number;
      currentPage: number;
      hasNext: boolean;
    };
  };
  message: string;
}

export interface GetAllDriversQuery {
  limit: number;
  page: number;
  driverStatus: string;
  carOwner: boolean;
}
