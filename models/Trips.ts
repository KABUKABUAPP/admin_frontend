export interface Trip {
  from: string;
  to: string;
  rider: string;
  driver: string;
}

export interface TripData {
  start_address: {
    country: " Nigeria";
    state: " Lagos";
    city: " Agege Alagbado 102213";
  };
  end_address: {
    country: " Nigeria";
    state: " Ogun State";
    city: " Ota 112104";
  };
  _id: "63fcf8e6a111661eb184e89e";
  start_point: [6.663326, 3.2496994];
  end_point: [6.678502, 3.1667424];
  kabu_type: "sharp";
  user: {
    next_of_kin: {
      full_name: "johnattan kent";
      relationship: " father";
      phone_number: " +2349198765432";
    };
    coordinate: [];
    _id: "63f3403d0d5c1261350bddc2";
    full_name: "clark kent";
    phone_number: "08126853755";
    email: "babafemi.olasunmade@admoni.ng";
    profile_image: "https://res.cloudinary.com/dv6dky6rb/image/upload/v1676886077/kab_images/askbwwrwhez5x8mwhwyq.webp";
    type: "rider";
    isBlocked: false;
    onboarding_step: 0;
    is_onboarding_complete: true;
    created_at: "2023-02-20T09:41:19.926Z";
    updated_at: "2023-02-20T12:11:02.017Z";
    __v: 0;
    total_trips: 2;
  };
  driver: {
    bvn: {
      number: "1234567890";
      inputed: true;
    };
    nin: {
      number: "112233445566";
      inputed: true;
    };
    _id: "63f359eeac1b54abd6a310dd";
    user: "63f359eeac1b54abd6a310db";
    house_address: "1, smallville, metropolis, US";
    isVerified: false;
    created_at: "2023-02-20T11:31:34.138Z";
    updated_at: "2023-02-20T17:57:54.751Z";
    __v: 0;
    total_trips: 2;
    monthly_charge: "63f3a38825f86eaaa8bdb140";
  };
  order: {
    start_address: {
      country: " Nigeria";
      state: " Lagos";
      city: " Agege Alagbado 102213";
      street: "Idowu Babafemi St";
    };
    end_address: {
      country: " Nigeria";
      state: " Ogun State";
      city: " Ota 112104";
      street: "Km. 10 Idiroko Rd";
    };
    _id: "63fcf897a111661eb184e893";
    start_point: [6.663326, 3.2496994];
    end_point: [6.678502, 3.1667424];
    kabu_type: "sharp";
    payment_type: "wallet";
    user: "63f3403d0d5c1261350bddc2";
    price_range: [2100, 2600];
    currency: "NGN";
    status: "accepted";
    created_at: "2023-02-27T18:38:15.224Z";
    updated_at: "2023-02-27T18:39:34.381Z";
    __v: 0;
    driver: "63f359eeac1b54abd6a310dd";
  };
  price: 0;
  price_range: [2100, 2600];
  payment_type: "wallet";
  status: "started";
  createdAt: "2023-02-27T18:39:34.403Z";
  updatedAt: "2023-02-27T18:40:33.085Z";
  __v: 0;
  start_time: "2023-02-27T18:40:33.000Z";
  id: "63fcf8e6a111661eb184e89e";
}

export interface GetAllTripsResponse {
  status: "success";
  data: {
    data: TripData[];
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

export interface GetAllTripsQuery {
  limit: number;
  page: number;
}
