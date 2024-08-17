export interface AuthSlice {
  accessToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface CreatePasswordPayload {
  new_password: string;
  otp: string;
}

export interface LoginResponse {
  status: string;
  code: 200;
  data: {
    loggedInAdmin: {
      referral_code: string | null;
      _id: string;
      full_name: string;
      phone_number: string;
      email: string;
      role: {
        _id: string;
        name: string;
        updated_at: string;
        __v: number;
        level: number;
        dashboard_permissions: {
          read: boolean;
          write: boolean;
        };
        trips_permissions: {
          read: boolean;
          write: boolean;
        };
        sos_permisions: {
          read: boolean;
          write: boolean;
        };
        transactions_permissions: {
          read: boolean;
          write: boolean;
        };
        riders_permissions: {
          read: boolean;
          write: boolean;
        };
        drivers_permissions: {
          read: boolean;
          write: boolean;
        };
        sharp_program_permissions: {
          read: boolean;
          write: boolean;
        };
        inspectors_permissions: {
          read: boolean;
          write: boolean;
        };
        fare_prices_permissions: {
          read: boolean;
          write: boolean;
        };
        hubs_permissions: {
          read: boolean;
          write: boolean;
        };
        staffs_permissions: {
          read: boolean;
          write: boolean;
        };
        promotions_permissions: {
          read: boolean;
          write: boolean;
        };
        "": {
          read: boolean;
          write: boolean;
        };
        roles_permissions: {
          read: boolean;
          write: boolean;
        };
        settings_permissions: {
          read: boolean;
          write: boolean;
        };
        push_notifications_permissions: {
          read: boolean;
          write: boolean;
        };
      };
      isBlocked: boolean;
      status: boolean;
      created_at: string;
      updated_at: string;
      __v: 0;
      accessTokens: string;
    };
    accessTokens: string;
  };
  message: string;
}
