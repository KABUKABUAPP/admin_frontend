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
  statusRemark?: string;
  dateDeleted?: string;
  deletionReason?: string;
  inspectionCode?: string;
  onlineStatus: any;
  currentCar: any;
  onboardStep: any;
}

export interface DriversMappedResponse {
  data: DriversTableBodyData[];
  totalCount: number;
}

export interface ReactivateDriverQuery {
  driverId: string
}

export interface Driver {
  current_car: any;
  inspection_code: any;
  _id: string;
  user: {
    coordinate: any;
    onboarding_step: any;
    online_status: any;
    _id: string;
    full_name: string;
    total_trips: 0;
    profile_image: string;
    reason_for_delete?: string;
  };
  car_owner: true;
  state: string;
  country: string;
  approval_status: string;
  wallet_balance: number;
  status_remark: string;
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
  order: string;
  status?: string;
  statusRemark?: string;
  deleted?: string;
  onlineStatus?: string;
  onboardStatus?: string;
  sharpApprovalStatus?: string;
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
      approve_or_decline_date: any;
      referral_history: any;
      referrer_details: any;
      approval_status: string;
      status_remark: string;
      _id: string;
      user: {
        approve_or_decline_date: any;
        referral_code: any;
        offline_switch_date: any;
        online_switch_date: any;
        online_status: any;
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
        isBlocked: boolean;
        _id: string;
        full_name: string;
        phone_number: string;
        guarantor_status: "pending" | "approved" | "declined";
        guarantor_response: boolean;
        total_trips: number;
        email: string;
        profile_image: string;
        admin_approval_remark: string;
        status_remark: string;
      };
      house_address: string;
      admin_decline_count: number;
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
    total_earned: number;
    wallet_balance: number;
    subscription_due: number;
  };
  message: string;
}

export interface MappedDocument {
  title?: string | undefined;
  docImage?: string | undefined;
  docId?: string | undefined;
  status?: string | undefined;
  id: string;
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
    isBlocked: boolean;
    declineCount: number;
    declineReason: string;
    approvalStatus: string;
    statusRemark: string;
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
    reason: string;
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
  onlineStatus: any;
  onlineSwitch: any;
  offlineSwitch: any;
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
    _id: string;
    full_name: string;
    phone_number: string;
    email: string;
    image: string;
    relationship: string;
    address: string;
    city: string;
    state: string;
    occupation: string;
    status: string;
    driver: string;
    created_at: string;
    updated_at: string;
    __v: string;
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

export interface BlockDriverQuery {
  reason: string;
  driverId: string;
}
