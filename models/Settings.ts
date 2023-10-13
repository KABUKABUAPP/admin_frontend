export interface CreateAdminPayload {
  full_name: string;
  phone_number: string;
  email: string;
  password: string;
  role: string;
}

export interface CreateAdminResponse {
  status: string;
  data: {
    full_name: string;
    phone_number: string;
    email: string;
    password: string;
    role: string;
    isBlocked: boolean;
    status: boolean;
    _id: string;
    created_at: Date;
    updated_at: Date;
    __v: number;
  };
  message: string;
}

export interface UpdatePasswordPayload {
  current_password: string;
  new_password: string;
}

export interface ViewAllPromosQuery {
  limit: number;
  page: number;
  status: string;
}

export interface Promo {
  total_subscribers: number;
  _id: string;
  name: string;
  audience: string;
  code: string;
  activation_date: string;
  expiry_date: string;
  total_quantity: number;
  type: string;
  auto_or_manual: string;
  value: number;
  minimum_amount_to_apply: number;
  cap: number;
  active_status: true;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface ViewAllPromosResponse {
  status: string;
  data: {
    data: Promo[];
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

export interface MappedPromo {
  promoCode: string;
  amount: number;
  status: boolean;
  createdDate: string;
  expiryDate: string;
  id: string;
  totalSubscribers: number;
}

export interface MappedPromoResponse {
  totalCount: number;
  data: MappedPromo[];
}

export interface Subscriber {
  _id: string;
  coupon: string;
  activation_date: string;
  expiry_date: string;
  type: string;
  user: {
    _id: string;
    full_name: string;
    phone_number: string;
    email: string;
    profile_image: string;
    type: string;
    accessTokens: string;
    created_at: string;
    updated_at: string;
    __v: number;
    coordinate: [];
  };
  cap: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface ViewPromotionResponse {
  status: string;
  data: {
    promotion: {
      _id: string;
      name: string;
      audience: string;
      code: string;
      activation_date: string;
      expiry_date: string;
      total_quantity: number;
      type: string;
      auto_or_manual: string;
      value: number;
      minimum_amount_to_apply: number;
      cap: number;
      active_status: true;
      createdAt: string;
      updatedAt: string;
      __v: number;
      id: string;
    };
    subscribers: {
      data: Subscriber[];
      pagination: {
        pageSize: number;
        totalCount: number;
        pageCount: number;
        currentPage: number;
        hasNext: boolean;
      };
    };
  };
  message: string;
}

export interface MappedSubscriber {
  fullname: string;
  image: string;
  id: string;
}

export interface MappedViewResponse {
  promo: {
    promoCode: string;
    status: boolean;
    createdDate: string;
    expiryDate: string;
    totalSubscribers: number;
    promotionType: string;
    id: string;
  };
  subscribers: { data: MappedSubscriber[]; totalCount: number };
}

export interface ViewPromotionQuery {
  promoId: string;
  limit: number;
  page: number;
}

export interface Role {
  _id: string;
  name: string;
  level: number;
  created_by: string;
  total_number_of_permissions: number;
}

export interface GetRolesResponse {
  status: string;
  code: number;
  data: {
    data: Role[];
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

export interface MappedRole {
  id: string;
  title: string;
  roleCount: number;
}

export interface MappedGetRoles {
  data: MappedRole[];
  totalCount: number;
}

export interface GetRolesQuery {
  limit: number;
  page: number;
}

export interface ViewRoleQuery {
  roleId: string;
}

export interface Permission {
  read: boolean;
  write: boolean;
}

export interface ViewRoleResponse {
  status: "success";
  code: 200;
  data: {
    dashboard_permissions: Permission;
    trips_permissions: Permission;
    sos_permisions: Permission;
    transactions_permissions: Permission;
    riders_permissions: Permission;
    drivers_permissions: Permission;
    inspectors_permissions: Permission;
    fare_prices_permissions: Permission;
    hubs_permissions: Permission;
    staffs_permissions: Permission;
    settings_permissions: Permission;
    total_number_of_permissions: number;
    _id: string;
    name: string;
    level: number;
    created_by: string;
    created_at: string;
    updated_at: string;
    __v: number;
    last_edited_by: string;
  };
  message: string;
}

export interface MappedViewRole {
  name: string;
  id: string;
  level: number;
  dashboard_permissions: Permission;
  trips_permissions: Permission;
  sos_permisions: Permission;
  transactions_permissions: Permission;
  riders_permissions: Permission;
  drivers_permissions: Permission;
  inspectors_permissions: Permission;
  fare_prices_permissions: Permission;
  hubs_permissions: Permission;
  staffs_permissions: Permission;
  settings_permissions: Permission;
  total_number_of_permissions: number;
}

export interface CreateRolePayload {
  name: string;
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
  settings_permissions: {
    read: boolean;
    write: boolean;
  };
}

export interface UpdateRoleQuery {
  roleId: string;
  payload: CreateRolePayload;
}

export interface DeleteRoleQuery {
  roleId: string
}

export interface GenerateAutomaticPromoPayload {
  name: string;
  audience: string;
  promo_type: string;
  condition: string;
  count: number;
  amount_type: string;
  value: number;
  cap: number;
  start_date: string;
  end_date: string;
}

export interface GenerateManualPromoPayload {
  name: string;
  audience: string;
  promo_type: string;
  amount_type: string;
  value: number;
  cap: number;
  total_quantity: number;
  start_date: string;
  end_date: string;
}

export interface DeletePromoQuery {
  promoId: string
}