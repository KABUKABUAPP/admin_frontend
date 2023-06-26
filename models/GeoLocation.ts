export interface State {
  _id: string;
  name: string;
  country: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface City {
  _id: string;
  name: string;
  state: {
    _id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface GetNigerianStatesResponse {
  status: string;
  code: number;
  data: {
    data: State[];
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

export interface GetNigerianCitiesResponse {
  status: string;
  code: number;
  data: {
    data: City[];
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

export interface GetNigerianCitiesQuery {
  id: string;
}
