export interface InspectorsTableBodyData {
  inspectorId: string;
  fullName: string;
  imageUrl: string;
  location: string;
  hub: string;
  carsInHub: number;
  totalCarsProcessed: number;
}

export interface Inspector {
  _id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  house_address: string;
  city: string;
  state: string;
  country: string;
  created_at: Date;
  updated_at: Date;
  __v: number;
}

export interface GetAllInspectorsResponse {
  status: string;
  data: {
    data: Inspector[];
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

export interface InspectorsMappedData {
  data: InspectorsTableBodyData[];
  totalCount: number;
}

export interface GetAllInspectorsQuery {
  limit: number;
  page: number;
  search: string;
}

export interface ViewInspectorResponse {
  status: string;
  data: {
    _id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    house_address: string;
    city: string;
    state: string;
    country: string;
    created_at: string;
    updated_at: string;
    __v: number;
  };
  message: string;
}

export interface MappedViewInspector {
  fullname: string;
  address: string;
  email: string;
  phone: string;
  totalCarsProcessed: number;
  approved: number;
  declined: number;
  carsInHub: number;
}

export interface ViewInspectorQuery {
  inspectorId: string;
}

export interface AddNewInspectorPayload {
  first_name: string;
  last_name: string;
  house_address: string;
  city: string;
  state: string;
  phone_number: string;
  email: string;
}

export interface AddNewInspectorResponse {
  status: string;
  data: {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    house_address: string;
    city: string;
    state: string;
    country: string;
    regCompleted: boolean;
    cars_processed: number;
    cars_approved: number;
    cars_declined: number;
    _id: string;
    created_at: string;
    updated_at: string;
    __v: 0;
  };
  message: string;
}
