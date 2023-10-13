export interface GetMarketerResponse {
    status: string;
    code: 200;
    data: {
        total_drivers_onboarded_today: number;
        total_drivers_onboarded_this_week: number;
        total_earnings: number;
        total_no_referred: number;
        referal_chart: ReferralChartData[];
        data: DriverData[];
        pagination: {
        pageSize: number;
        totalCount: number;
        pageCount: number;
        currentPage: number;
        hasNext: boolean;
        }
    }
    message: string;
}

export interface ReferralChartData {
    month: string;
    drivers: number;
}

export interface DriverData {
    _id: string;
    full_name: string;
    phone_number: string;
    type: string;
    isBlocked: boolean;
    total_trips: number;
    deleted: boolean;
    created_at: string;
    email: string;
    profile_image: string;
    referred_by: string;
}

export interface GetMarketerQuery {
    limit: string;
    page: string;
}