export interface Trip {
  from: string;
  to: string;
  rider: string;
  driver: string;
  id: string;
}

export interface ActiveTripsMappedResponse {
  totalCount: number;
  data: Trip[];
}

export interface FormattedTripOrder {
  id: string;
  origin: string;
  destination: string;
  rider: string;
  driver: string;
  carModel: string;
  plateNumber: string;
  status: string;
}

export interface MappedTripOrderResponse {
  data: FormattedTripOrder[];
  totalCount: number;
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
    price_details: {
      booking_fee: number;
      base_fare: number;
      distace: number;
      time: number;
      wait_time: number;
      driver_earned: number;
      kabu_split: number;
      state_levy: number;
      total_charge: number;
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
  status: "disputed" | "cancelled" | "completed" | "initiated" | "started";
  search: string
}

export interface TripDetail {
  topTitle: string;
  topValue: string | number;
  topIcon: React.ReactNode;
  bottomTitle: string;
  bottomValue: string | number;
  bottomIcon: React.ReactNode;
  isRating?: boolean;
}

export interface ViewTripResponse {
  status: string;
  data: {
    origin: {
      country: string;
      state: string;
      city: string;
    };
    destination: {
      country: string;
      state: string;
      city: string;
    };
    estimated_price: number;
    order_id: string;
    payment_type: string;
    trip_completion_time: string;
    rider_rating: number;
    driver_rating: number;
    rider_details: {
      average_rating: {
        value: number;
        count: number;
      };
      total_trips: number;
      _id: string;
      full_name: string;
      profile_image: string;
    };
    driver_details: {
      average_rating: {
        value: number;
        count: number;
      };
      total_trips: number;
      _id: string;
      full_name: string;
      driver: {
        _id: string;
        city: string;
        state: string;
        country: string;
      };
    };
    car: {
      _id: string;
      brand_name: string;
      model: string;
      year: string;
      color: string;
      plate_number: string;
    };
  };
  message: string;
}

export interface ViewTripQuery {
  id: string;
}

export interface MappedViewTripResponse {
  origin: string;
  destination: string;
  estimatedPrice: number;
  paymentType: string;
  tripStarted: string;
  tripEnded: string;
  riderFullName: string;
  riderLocation: string;
  riderTripCount: number;
  riderRating: number;
  riderId: string;
  driverFullname: string;
  driverLocation: string;
  driverTripCount: number;
  driverRating: number;
  carModel: string;
  plateNumber: string;
  driverId: string;
  riderImage: string;
  driverImage: string;
  orderId: string;
}
