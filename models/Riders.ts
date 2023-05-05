export interface RidersTableBodyData {
  riderId: string;
  fullName: string;
  location: string;
  totalTrips: number;
  walletBalance: number;
  status: string;
  imageUrl: string;
}

export interface Rider {
  _id: string;
  full_name: string;
  is_onboarding_complete: boolean;
  wallet_balance: number;
}

export interface GetAllRidersResponse {
  data: {
    drivers: Rider[]
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

export interface GetAllRidersQuery {
  limit: number;
  page: number;
}

export interface MappedRidersData {
  data:RidersTableBodyData[];
  totalCount: number
}
