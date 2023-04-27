import { ReactNode } from "react";

export interface GetTripInsightsResponse {
  status: string;
  data: {
    total_trips: number;
    active_trips: number;
    pending_trips: number;
    total_earnings: number;
    sos: number;
  };
  message: string;
}

export interface TripInsightsMappedResponse {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBg?: string;
}

export interface GetTripChartData {
  day?: string;
  month?: string;
  trips: number;
}

export interface GetTripChartResponse {
  success: string;
  data: GetTripChartData[];
  message: string;
}

export interface GetTripChartsQuery {
  range: string;
}

export interface GetActiveTripData {
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
  status: string;
  id: string;
}

export interface GetActiveTripsResponse {
  status: string;
  data: {
    data: GetActiveTripData[];
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

export interface GetActiveTripsQuery {
  page: number;
  limit: number;
}

export interface GetPendingApplicationsData {
  _id: string;
  user: {
    _id: string;
    full_name: string;
  };
  car_owner: boolean;
  house_address: string;
  city: string;
  state: string;
  country: string;
}

export interface GetPendingApplicationsResponse {
  status: string;
  data: {
    data: GetPendingApplicationsData[];
  };
  message: string;
}

export interface GetPendingApplicationsQuery {
  page: number;
  limit: number;
}

export interface PendingApplicationsMappedResponse {
  fullName: string;
  location: string;
  image: string;
}

export interface GetPendingSharpApplicationsData {
  _id: string;
  user: {
    _id: string;
    full_name: string;
  };
  car_owner: false;
  house_address: string;
  city: string;
  state: string;
  country: string;
}

export interface GetPendingSharpApplicationsResponse {
  status: string;
  data: {
    data: GetPendingApplicationsData[];
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

export interface GetPendingSharpApplicationsQuery {
  page: number;
  limit: number;
}
