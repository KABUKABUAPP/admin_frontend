export interface RidersTableBodyData {
  riderId: string;
  fullName: string;
  location: string;
  totalTrips: number;
  walletBalance: number;
  status: string;
  imageUrl: string;
  deletedReason?: string;
  dateDeleted?: string;
  phoneNumber?: string;
  email?: string;
}

export interface MappedRider extends RidersTableBodyData {
  isBlocked: boolean;
}

export interface Rider {
  email: any;
  phone_number: any;
  coordinate: any;
  state: any;
  _id: string;
  full_name: string;
  type: string;
  isBlocked: boolean;
  total_trips: number;
  created_at: string;
  profile_image: string;
  wallet_balance: number;
  reason_for_delete: string;
  date_deleted: "2023-06-07T13:46:38.251Z";
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
  search: string;
  order: string;
  status: string;
  onlineStatus: string;
}

export interface MappedRidersData {
  data: MappedRider[];
  totalCount: number;
}

export interface ViewRiderResponse {
  data: {
    referral_history: any;
    referral_code: any;
    referrer_details: any;
    state: string;
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
    isBlocked: boolean;
    total_trips: number;
    total_spent: number;
    profile_image: string;
    wallet_balance: number;
  };
}

export interface ViewRiderQuery {
  id: string;
  status?: string;
}

export interface MappedViewRider {
  driver: {
    fullName: string;
    address: string;
    tripCount: number;
    rating: number;
    isBlocked: boolean;
    id: string;
  };
  financials: {
    total: string;
    walletBalance: string;
  };
  nextOfKin: {
    fullname: string;
    relationship: string;
    phone: string;
  };
}
