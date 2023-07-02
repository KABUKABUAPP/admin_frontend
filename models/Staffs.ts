export interface StaffsTableData {
  staffId: string;
  fullName: string;
  role: string;
  location: string;
  status: string;
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

// {
//   "_id": "649e923e68859917795f6bd9",
//   "full_name": "edward cullen",
//   "phone_number": "+2348023208744",
//   "email": "babafemi.olasunmade@onboard.com.ng",
//   "role": {
//       "_id": "6484a32f118f1bbb48966ddd",
//       "name": "dispute resolutor",
//       "total_number_of_permissions": 6
//   },
//   "isBlocked": false,
//   "status": true,
//   "created_at": "2023-06-30T08:28:46.330Z",
//   "updated_at": "2023-07-01T09:07:17.420Z",
//   "__v": 0,
//   "accessTokens": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWU5MjNlNjg4NTk5MTc3OTVmNmJkOSIsImVtYWlsIjoiYmFiYWZlbWkub2xhc3VubWFkZUBvbmJvYXJkLmNvbS5uZyIsImlhdCI6MTY4ODIwMjQzN30.iIJUcj71myefvGIcJpew0ywMB1ZhXhUbJD7AFOLKIMQ"
// }

export interface ViewStaffResponse {
  status: string;
  code: number;
  data: {
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
  userInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    image: string;
  };
  isBlocked: boolean;
}

export interface ViewStaffQuery {
  staffId: string;
}
