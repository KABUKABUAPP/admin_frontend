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
  status: string
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
  id: string
  totalSubscribers: number;
}

export interface MappedPromoResponse {
  totalCount: number;
  data: MappedPromo[]
}