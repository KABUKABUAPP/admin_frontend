export interface AuthSlice {
  accessToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  code: 200;
  data: {
    loggedInAdmin: {
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
      updated_at: string;
      __v: 0;
      accessTokens: string;
    };
    accessTokens: string;
  };
  message: string;
}


