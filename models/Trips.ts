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
    street: string;
  };
  end_address: {
    country: string;
    state: string;
    city: string;
    street: string;
  };
  rating: {
    value: 0;
    count: 0;
  };
  _id: string;
  user: {
    _id: string;
    full_name: string;
  };
  driver: {
    average_rating: {
      count: 0;
      value: 3.5;
    };
    _id: string;
    full_name: string;
    profile_image: string;
  };
  car: {
    _id: string;
    brand_name: string;
    model: string;
    year: string;
    color: string;
    plate_number: string;
  };
  price: number;
  status: string;
  createdAt: string;
  end_time: string;
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
    price_after_coupon: number;
  };
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
  search: string;
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
    start_time: string;
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

export interface GetDriverTripHistoryQuery {
  driverId: string;
  limit: number;
  page: number;
}

export interface TripHistoryDTO {
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
  price: number;
  payment_type: string;
  status: string;
  createdAt: string;
  id: string;
}

export interface GetDriverTripHistoryResponse {
  status: string;
  data: {
    data: TripHistoryDTO[];
    pagination: {
      pageSize: number;
      totalCount: number;
      pageCount: number;
      currentPage: number;
      hasNext: boolean;
    };
  };
}

export interface DriverTripHistoryModel {
  originTop?: string;
  originBottom?: string;
  destinationTop?: string;
  destinationBottom?: string;
  paymentMethod?: string;
  date?: string;
  amount?: string | number;
  id?: string;
}

export interface DriverTripHistory {
  data: DriverTripHistoryModel[];
  totalCount: number;
}
