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
  _id: string;
  user: {
    _id: string;
    full_name: string;
    total_trips: 0;
    profile_image: string;
  };
  car_owner: true;
  state: string
  country: string;
  approval_status: string;
  wallet_balance: number;
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
  _id: string;
  title: string;
  doc_number: string;
  url: string;
  status: string;
  owner: string;
  created_at: string;
  updated_at: string;
  __v: number;
  approved_by: string;
}

export interface ViewDriverResponse {
  status: string;
  code: number;
  data: {
    driver: {
      _id: string;
      user: {
        guarantor: {
          name: string;
          relationship: string;
          address: string;
          city: string;
          state: string;
          phone_number: string;
          email: string;
          image: string;
        };
        _id: string;
        full_name: string;
        phone_number: string;
        guarantor_status: "pending" | "approved" | "declined";
        guarantor_response: boolean;
        total_trips: number;
        email: string;
        profile_image: string;
      };
      house_address: string;
      city: string;
      state: string;
      country: string;
      admin_approval: string;
      current_car: string;
      admin_approval_remark: string;
    };
    car_details: {
      camera: {
        isSynched: boolean;
      };
      location_tracker: {
        isSynched: boolean;
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
      on_a_trip: boolean;
      assigned: boolean;
      coordinate: (string | number)[];
      created_at: string;
      updated_at: string;
      __v: 0;
    };
    car_documents: Document[];
  };
  message: string;
}

export interface MappedDocument {
  title?: string | undefined;
  docImage?: string | undefined;
  docId?: string | undefined;
  status?: string | undefined;
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
    responded: boolean;
    responseStatus: "pending" | "approved" | "declined";
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

export interface InspectDocumentQuery {
  docId: string;
  status: "DECLINED" | "APPROVED";
}

export interface ViewGuarantorResponse {
  status: string;
  code: number;
  data: {
    guarantor: {
      name: string;
      relationship: string;
      address: string;
      city: string;
      state: string;
      phone_number: string;
      email: string;
      image: string;
    };
    average_rating: {
      value: number;
      count: number;
    };
    _id: string;
    full_name: string;
    phone_number: string;
    type: string;
    isBlocked: boolean;
    reason_to_block: string;
    is_onboarding_complete: boolean;
    onboarding_step: number;
    online_status: string;
    guarantor_status: string;
    guarantor_response: boolean;
    coordinate: any[];
    total_trips: number;
    favourite_locations: any[];
    created_at: string;
    updated_at: string;
    __v: number;
    email: string;
    driver: string;
    accessTokens: string;
  };
  message: string;
}

export interface ViewGuarantorQuery {
  id: string;
}

export interface VerifyGuarantorPayloadModel {
  id: string;
  status: "decline" | "approve";
  reason: string;
}

export interface MappedViewGuarantorResponse {
  address: string;
  fullname: string;
  relationship: string;
  phone: string;
  image: string;
}
