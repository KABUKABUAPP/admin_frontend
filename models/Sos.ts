export interface SosTableData {
  id: string;
  origin: string;
  destination: string;
  rider: string;
  driver: string;
  carModel: string;
  plateNumber: string;
  status: string;
  raisedBy: string;
  reason: string;
}

export interface Sos {
  _id: string;
  trip: {
    start_address: {
      country: string;
      state: string;
      city: string;
    };
    end_address: {
      country: string;
      state: string;
      city: string;
    };
    _id: string;
    user: {
      _id: string;
      full_name: string;
    };
    driver: {
      _id: string;
      full_name: string;
    };
    car: {
      _id: string;
      brand_name: string;
      model: string;
      year: string;
      color: string;
      plate_number: string;
    };
    id: string;
  };
  time_of_action: Date;
  status: string;
  reason: string;
  createdAt: string;
  id: string;
}

export interface GetAllSOSResponse {
  status: string;
  data: {
    data: Sos[];
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

export interface GetAllSosQuery {
    limit: number;
    date: string;
    page: number;
    startDate?: string;
    endDate?: string;
    search: string;
    order: string
}

export interface MappedSosResponse {
    data: SosTableData[];
    totalCount: number;
}
