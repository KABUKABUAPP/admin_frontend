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
    drivers: Rider[];
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
  search: string
}

export interface MappedRidersData {
  data: RidersTableBodyData[];
  totalCount: number;
}

export interface ViewRiderResponse {
  status: string;
  code: number;
  data: {
    _id: string;
    next_of_kin: {
      full_name: string;
      relationship: string;
      phone_number: string;
    };
    average_rating: {
      value: number;
      count: number;
    };
    full_name: string;
    phone_number: string;
    email: string;
    total_trips: number;
    profile_image: string;
    total_spent: number;
    wallet_balance: number;
  };
  message: string;
}

export interface ViewRiderQuery {
  id: string;
  status?: string 
}

export interface MappedViewRider {
  driver: {
    fullname: string;
    address: string;
    tripCount: number;
    rating: number
  };
  financials: {
    total: string;
    walletBalance: string;
  }
  nextOfKin: {
    fullname: string;
    relationship: string;
    phone: string
  }
}
