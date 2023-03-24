export interface Trip {
  from: string;
  to: string;
  rider: string;
  driver: string;
}

export interface TripData {
  start_address: {
    country: string;
    state: string;
    city: string;
  };
  end_address: {
    country: string;
    state: string;
    city: string;
  };
  _id: string;
  start_point: [number, number];
  end_point: [number, number];
  kabu_type: string;
  user: {
    next_of_kin: {
      full_name: string;
      relationship: string;
      phone_number: string;
    };
    coordinate: [];
    _id: string;
    full_name: string;
    phone_number: string;
    email: string;
    profile_image: string;
    type: string;
    isBlocked: boolean;
    onboarding_step: number;
    is_onboarding_complete: boolean;
    created_at: Date;
    updated_at: Date;
    __v: number;
    total_trips: number;
  };
  driver: {
    bvn: {
      number: string;
      inputed: boolean;
    };
    nin: {
      number: string;
      inputed: boolean;
    };
    _id: string;
    user: string;
    house_address: string;
    isVerified: boolean;
    created_at: Date;
    updated_at: Date;
    __v: number;
    total_trips: number;
    monthly_charge: string;
  };
  order: {
    start_address: {
      country: string;
      state: string;
      city: string;
      street: string;
    };
    end_address: {
      country: string;
      state: string;
      city: string;
      street: string;
    };
    _id: string;
    start_point: [number, number];
    end_point: [number, number];
    kabu_type: string;
    payment_type: string;
    user: string;
    price_range: [number, number];
    currency: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    __v: number;
    driver: string;
  };
  price: number;
  price_range: [number, number];
  payment_type: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  start_time: Date;
  id: string;
}

export interface GetAllTripsResponse {
  status: string;
  data: {
    data: TripData[];
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

export interface GetAllTripsQuery {
  limit: number;
  page: number;
  status: "completed" | "pending" | "active" | "cancelled"
}
