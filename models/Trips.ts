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
  cancel_trip_reason: string;
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
      count: number;
      value: number;
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
  status: "disputed" | "cancelled" | "completed" | "initiated" | "started" | "pending" | "scheduled";
  search: string;
  order: string;
  type: 'order' | 'trip'
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
    order_id: string;
    origin: {
      country: string;
      state: string;
      city: string;
      street: string;
    };
    destination: {
      country: string;
      state: string;
      city: string;
      street: string;
    };
    estimated_price: number;
    payment_type: string;
    rider_rating: number;
    driver_rating: number;
    trip_rating: number;
    rider_comment: string;
    driver_comment: string;

    rider_details: {
      average_rating: {
        value: number;
        count: number;
      };
      _id: string;
      full_name: string;
      total_trips: number;
      profile_image: string;
      state: string;
    };
    driver_details: {
      average_rating: {
        value: number;
        count: number;
      };
      _id: string;
      full_name: string;
      total_trips: number;
      driver: {
        _id: string;
        city: string;
        state: string;
        country: string;
      };
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
    start_time: string;
    end_point: [number, number];
    start_point: [number, number];
    trip_completion_time: string;
    time_of_cancel: string;
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
  driverTripRating: number;
  riderTripRating: number;
  orderId: string;
  tripRating?: number;
  riderComment?: string
  endPoint: [number, number];
  startPoint: [number, number];
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
