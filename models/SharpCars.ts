export interface SharpCarsTableBodyData {
  carId: string;
  carBrandModel: string;
  driver: string;
  licenseNumber: string;
  dateTimeAdded: string;
}

export interface SharpCar {
  camera: {
    isSynched: boolean;
  };
  location_tracker: {
    isSynched: boolean;
  };
  _id: string;
  brand_name: string;
  driver_owned: boolean;
  model: string;
  year: string;
  color: string;
  images: [string, string];
  plate_number: string;
  insurance_number: string;
  isVerified: boolean;
  on_a_trip: boolean;
  coordinate: [];
  created_at: Date;
  updated_at: Date;
  __v: number;
}

export interface GetAllSharpCarsResponse {
  status: string;
  data: {
    data: SharpCar[];
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

export interface MappedSharpCarsData {
  data: SharpCarsTableBodyData[];
  totalCount: number
}

export interface GetAllSharpCarsQuery {
  limit: number;
  page: number;
  activeStatus: string;
  assignedStatus: string;
  search: string;
}