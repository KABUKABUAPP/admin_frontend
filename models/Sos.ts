export interface SosTableData {
  id: string;
  origin: string;
  destination: string;
  rider: string;
  driver: string;
  carModel: string;
  plateNumber: string;
  status: string;
  raisedBy: string;
  reason: string;
}

export interface Sos {
  _id: string;
  trip: {
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
    user: {
      _id: string;
      full_name: string;
    };
    driver: {
      _id: string;
      full_name: string;
    };
    car: {
      _id: string;
      brand_name: string;
      model: string;
      year: string;
      color: string;
      plate_number: string;
    };
    id: string;
  };
  time_of_action: Date;
  status: string;
  reason: string;
  createdAt: string;
  id: string;
}

export interface GetAllSOSResponse {
  status: string;
  data: {
    data: Sos[];
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

export interface GetAllSosQuery {
  limit: number;
  date: string;
  page: number;
  startDate?: string;
  endDate?: string;
  search: string;
  order: string;
}

export interface MappedSosResponse {
  data: SosTableData[];
  totalCount: number;
}

export interface ViewSOSResponse {
  status: string;
  code: number;
  data: {
    trip_details: {
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
      status: string;
      payment_type: string;
      start_time: string;
      end_time: string;
    };
    raised_by: string;
    reason: string;
    rider_details: {
      average_rating: {
        value: number;
        count: number;
      };
      _id: string;
      full_name: string;
      profile_image: string;
      total_trips: number;
    };
    driver_details: {
      average_rating: {
        value: number;
        count: number;
      };
      _id: string;
      full_name: string;
      driver: {
        _id: string;
        house_address: string;
        city: string;
        state: string;
        country: string;
      };
      coordinate: [number, number];
      total_trips: number;
    };
  };
  message: string;
}

export interface ViewSOSQuery {
  id: string;
}

export interface MappedViewSOSResponse {
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
  raisedBy: string;
  reason: string;
}
