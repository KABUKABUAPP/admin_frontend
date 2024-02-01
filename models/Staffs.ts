export interface StaffsTableData {
  staffId: string;
  fullName: string;
  role: string;
  location: string;
  status: string;
  id: string;
}

export interface MappedGetAllStaff {
  data: StaffsTableData[];
  totalCount: number;
}

export interface GetAllStaffQuery {
  limit: number;
  page: number;
  order: string;
  status: string;
  search: string;
}

export interface Staff {
  staff_id: any;
  _id: string;
  full_name: string;
  phone_number: string;
  email: string;
  role: {
    _id: string;
    name: string;
  };
  isBlocked: boolean;
  status: boolean;
  created_at: string;
  address: {
    street: string;
    city: string;
    state: string;
  };
}

export interface GetAllStaffResponse {
  status: string;
  code: number;
  message: string;
  data: {
    data: Staff[];
    pagination: {
      pageSize: number;
      totalCount: number;
      pageCount: number;
      currentPage: number;
      hasNext: boolean;
    };
  };
}

export interface CreateStaffPayload {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  role: string;
  address: string;
  city: string;
  state: string;
}

export interface DisableStaffQuery {
  staffId: string;
}

export interface ViewStaff {
  _id: string;
  full_name: string;
  phone_number: string;
  email: string;
  role: {
    _id: string;
    name: string;
    total_number_of_permissions: number;
  };
  isBlocked: boolean;
  status: boolean;
  created_at: string;
}

export interface ResetStaffPasswordQuery{
  staffId: string;
}

export interface ViewStaffResponse {
  status: string;
  code: number;
  data: {
    total_drivers_onboarded_list: any;
    total_drivers_onboarded_this_month_list: any;
    total_drivers_onboarded_this_week_list: any;
    total_drivers_onboarded_today_list: any;
    total_riders_onboarded_this_month_list: any;
    total_riders_onboarded_this_week_list: any;
    total_riders_onboarded_today_list: any;
    total_riders_onboarded_list: any;
    total_drivers_onboarded: any;
    total_drivers_onboarded_this_month: any;
    total_drivers_onboarded_this_week: any;
    total_drivers_onboarded_today: any;
    total_riders_onboarded: any;
    total_riders_onboarded_this_month: any;
    total_riders_onboarded_this_week: any;
    total_riders_onboarded_today: any;
    referral_code: any;
    pending_disputes: any;
    total_disputes: any;
    activity_logs: any;
    _id: string;
    full_name: string;
    phone_number: string;
    email: string;
    role: {
      _id: string;
      name: string;
      total_number_of_permissions: number;
    };
    isBlocked: boolean;
    status: boolean;
    created_at: string;
    updated_at: string;
    __v: number;
    accessTokens: string;
    profile_image: string;
    address: {
      street: string;
      city: string;
      state: string;
    };
  };
  message: string;
}

export interface MappedViewStaff {
  onboardDataList: any;
  disputeData: any;
  activityLogs: any[] | undefined;
  userInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    image: string;
    referral_code: string;
  };
  isBlocked: boolean;
  onboardData: any;
}

export interface ViewStaffQuery {
  staffId: string;
}


export interface DeleteStaffQuery {
  
}