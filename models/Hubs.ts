export interface HubsTableBodyData {
  hubId: string;
  hubName: string;
  stateCountry: string;
  inspector: string;
  totalCarsProcessed: number;
  dateCreated: string;
}

export interface Hub {
  _id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  hub_images: [string, string];
  inspector: {
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
  };
  created_at: Date;
  updated_at: Date;
  __v: number;
}

export interface GetAllHubsResponse {
  status: string;
  data: {
    data: Hub[];
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

export interface MappedHubData {
  data: HubsTableBodyData[];
  totalCount: number;
}

export interface GetAllHubsQuery {
  limit: number;
  page: number;
  order: string;
  search: string
}

export interface ViewHubResponse {
  status: string;
  data: {
    _id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    hub_images: string[];
    inspector: {
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
    created_at: string;
    updated_at: string;
    __v: 0;
  };
  message: string;
}

export interface MappedViewHub {
  inspectionCars: Car[]
  hubCars: string[];
  inspectionCenterId: string;
  inspectionCenterImages: string[]
  inspectorFullname: string;
  inspectionCenterDateAdded: string;
  inspectionCenterLocation: string;
  inspectionCenterTitle: string;
  approved: number;
  declined: number;
  processed: number;
  inspectorAddress: string;
  inspectorPhone: string;
  inspectorId: string
}

export interface ViewHubQuery {
  hubId: string
}

export interface Car {
  carColor: string;
  carId: string;
  carImage: string;
  carModel: string;
  plateNumber: string;
}
