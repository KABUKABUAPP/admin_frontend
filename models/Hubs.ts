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
  page: number
}
