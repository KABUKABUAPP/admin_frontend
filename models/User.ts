export interface User {
  _id: string;
  full_name: string;
  phone_number: string;
  email: string;
  role: string;
  isBlocked: boolean;
  hasResetDefaultPassword: boolean;
  created_at: Date | string;
  updated_at: Date | string;
  permissions: UserPermissions;
  referral_code: string | null;
}

export interface UserPermissions {
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
}
