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
  message: string
}

export interface InspectorsMappedData {
  data: InspectorsTableBodyData[],
  totalCount: number
}

export interface GetAllInspectorsQuery {
  limit: number;
  page: number
}
