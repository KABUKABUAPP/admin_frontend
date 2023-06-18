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
