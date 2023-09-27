export interface GetOrdersResponse {
  status: string;
  code: number;
  data: {
    data: Order[];
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

export interface Order {
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
  user: {
    _id: string;
    full_name: string;
  };
  status: string;
  status_remark: string;
  driver: {
    _id: string;
    full_name: string;
    driver: {
      _id: string;
      current_car: {
        _id: string;
        brand_name: string;
        model: string;
        year: string;
        color: string;
        plate_number: string;
      };
    };
  };
}

export interface ViewOrderResponse {
  status: string;
  code: number;
  data: {
    order_id: string;
    start_point: [number, number];
    end_point: [number, number];
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
    estimated_price: [number, number];
    payment_type: string;
    status: string;
    status_remark: string;
    start_time: string;
    trip_completion_time: string;
    rider_rating: number;
    rider_details: {
      average_rating: {
        value: number;
        count: number;
      };
      _id: string;
      full_name: string;
      state: string;
      total_trips: number;
      profile_image: string;
    };
    driver_details: string;
    car: null;
  };
  message: string;
}

export interface GetAllOrdersQuery {
  limit: number;
  page: number;
  status: "cancelled" | "pending";
  search: string;
  order: string;
}

export interface ViewOrderQuery {
  id: string;
}

export interface MappedViewOrdersResponse {
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
  riderComment?: string;
  endPoint: [number, number];
  startPoint: [number, number];
}
