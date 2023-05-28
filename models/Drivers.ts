export interface DriversTableBodyData {
  driverId?: string;
  fullName?: string;
  location?: string;
  imageUrl?: string;
  driverType?: string;
  totalTrips?: number;
  walletBalance?: string;
  status?: string;
  userId?: string;
}

export interface DriversMappedResponse {
  data: DriversTableBodyData[];
  totalCount: number;
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
  search: string;
}

export interface Document {
  status: string;
  _id: string;
  title: string;
  doc_number: string;
  url: string;
  owner: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface ViewDriverResponse {
  status: string;
  code: number;
  data: {
    driver: {
      _id: string;
      user: {
        guarantor: {
          isVerified: false;
          name: string;
          relationship: string;
          address: string;
          city: string;
          state: string;
          phone_number: string;
          image: string;
        };
        _id: string;
        full_name: string;
        phone_number: string;
        email: string;
        total_trips: number;
      };
      house_address: string;
      city: string;
      state: string;
      country: string;
      current_car: string;
    };
    car_details: {
      camera: {
        isSynched: boolean;
        serial_number: string;
      };
      location_tracker: {
        isSynched: boolean;
        serial_number: string;
      };
      _id: string;
      brand_name: string;
      user: string;
      driver_owned: boolean;
      model: string;
      year: string;
      color: string;
      images: string[];
      plate_number: string;
      isVerified: boolean;
      on_a_trip: false;
      assigned: false;
      coordinate: number[];
      created_at: string;
      updated_at: string;
      __v: 0;
    };
    car_documents: Document[];
    wallet_balance: number;
    total_earned: number;
  };
  message: string;
}

export interface MappedDocument {
  title?: string | undefined;
  docImage?: string | undefined;
  docId?: string | undefined;
}

export interface ViewDriverQuery {
  id: string;
}

export interface MappedViewDriver {
  driverInfo: {
    image: string;
    fullName: string;
    address: string;
    email: string;
    phone: string;
    tripCount: number;
    rating: number;
    id: string;
  };
  carDetails: {
    carImages: string[];
    carModel: string;
    carColor: string;
    plateNumber: string;
  };
  financials: {
    walletBalance: string;
    total: string;
    subscriptionDue: string;
  };
  guarantor: {
    address: string;
    fullname: string;
    image?: string;
    phone: string;
    relationship: string;
  };
  carDocs: {
    totalDocs: number;
    documents: MappedDocument[];
  };
}

export interface ApproveDeclineDriverQuery {
  driverId: string;
  reason?: string;
  status: "decline" | "approve";
}

export interface ApproveDeclineDriverResponse {
  status: string;
  message: string;
}
