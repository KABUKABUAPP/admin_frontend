export interface AuthSlice {
  accessToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string
  code: 200;
  data: {
    loggedInAdmin: {
      _id: string;
      full_name: string
      phone_number: string
      email: string
      role: {
        _id: string
        name: string
      };
      isBlocked: boolean;
      status: boolean;
      created_at: string
      updated_at: string
      __v: 0;
      accessTokens: string
    };
    accessTokens: string
  };
  message: string
}

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
