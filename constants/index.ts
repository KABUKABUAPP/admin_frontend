export const AUTH_BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL;
export const RIDES_BASE_URL = process.env.NEXT_PUBLIC_RIDE_BASE_URL;
export const milliSecondToSecondConversionRate = 1000;
export const ACCESS_TOKEN = "AUTH_TOKEN__ACESS-$";
export const USER_TOKEN = "USER_stoRED_$##";
export const TripsOptionsBarData = [
  {
    title: "Trip Orders",
    isActive: true,
    keyVal: "",
  },
  {
    title: "Pending Trips",
    isActive: false,
    keyVal: "pending",
  },
  {
    title: "Active Trips",
    isActive: false,
    keyVal: "active",
  },
  {
    title: "Completed Trips",
    isActive: false,
    keyVal: "completed",
  },
  {
    title: "Cancelled Orders",
    isActive: false,
    keyVal: "cancelled",
  },
];

export const driverOptionBarData = [
  {
    title: "Active Drivers",
    isActive: true,
    keyVal: "",
  },
  {
    title: "Pending Drivers",
    isActive: false,
    keyVal: "pending-drivers",
  },
  {
    title: "Declined Drivers",
    isActive: false,
    keyVal: "declined-drivers",
  },
];

export const driverTypeFilterOptionsData = [
  {
    title: "All Drivers",
    isActive: true,
    keyVal: "all-drivers",
  },
  {
    title: "Sharp Drivers",
    isActive: false,
    keyVal: "sharp-drivers",
  },
  {
    title: "Regular Drivers",
    isActive: false,
    keyVal: "regular-drivers",
  },
];

export const sharpCarsOptionsData = [
  {
    title: "Active Cars",
    isActive: true,
    keyVal: ""
  },
  {
    title: "Unassinged Cars",
    isActive: false,
    keyVal: "unassigned-cars"
  },
  {
    title: "Car Deliveries",
    isActive: false,
    keyVal: "car-deliveries"
  },
]

export const tripsRowMockData = [
  {
    id: "12344",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Looking for Driver",
  },
  {
    id: "123444",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Looking for Driver",
  },
  {
    id: "123443",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Looking for Driver",
  },
  {
    id: "123442",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Looking for Driver",
  },
  {
    id: "123414",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Looking for Driver",
  },
];

export const completedTripsRowMockData = [
  {
    id: "12344",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Looking for Driver",
    price: "4000",
    rating: 5,
  },
  {
    id: "1244",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Looking for Driver",
    price: "4000",
    rating: 4,
  },
  {
    id: "14344",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Looking for Driver",
    price: "4000",
    rating: 2.5,
  },
  {
    id: "12345",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Looking for Driver",
    price: "4000",
    rating: 3,
  },
];

export const cancelledTripsRowMockData = [
  {
    id: "12344",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Cancelled",
    reason: "Long waiting time",
  },
  {
    id: "12334",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Cancelled",
    reason: "Long waiting time",
  },
  {
    id: "12644",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Cancelled",
    reason: "Long waiting time",
  },
  {
    id: "12384",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Cancelled",
    reason: "Long waiting time",
  },
];

export const sosTripsRowMockData = [
  {
    id: "12344",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Disputed at 5:53pm",
    raisedBy: "Rider",
    reason: "Long waiting time",
  },
  {
    id: "12344",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Disputed at 5:53pm",
    raisedBy: "Rider",
    reason: "Long waiting time",
  },
  {
    id: "12344",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Disputed at 5:53pm",
    raisedBy: "Rider",
    reason: "Long waiting time",
  },
  {
    id: "12344",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Disputed at 5:53pm",
    raisedBy: "Rider",
    reason: "Long waiting time",
  },
  {
    id: "12344",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Disputed at 5:53pm",
    raisedBy: "Rider",
    reason: "Long waiting time",
  },
  {
    id: "12344",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Disputed at 5:53pm",
    raisedBy: "Rider",
    reason: "Long waiting time",
  },
  {
    id: "12344",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Disputed at 5:53pm",
    raisedBy: "Rider",
    reason: "Long waiting time",
  },
  {
    id: "12344",
    origin: "23, Kuvuki Land, Igando",
    destination: "Filmhouse Cinema, Imax, Lekki 23 Kuviki Land, Igando",
    rider: "John Doe",
    driver: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020, Black",
    plateNumber: "ABC123XYS",
    status: "Disputed at 5:53pm",
    raisedBy: "Rider",
    reason: "Long waiting time",
  },
];

export const transactionsMockData = [
  {
    transactionId: "12344",
    origin: "23 Kuviki Land, Igando",
    destination: "Filmhouse Cinema, lekki 23 Kuviki Land, Igando",
    riderName: "John Doe",
    driverName: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020 Black",
    plateNumber: "ABC12345XSR",
    status: "Disputed at 5:30pm",
    price: 1600,
  },
  {
    transactionId: "12344",
    origin: "23 Kuviki Land, Igando",
    destination: "Filmhouse Cinema, lekki 23 Kuviki Land, Igando",
    riderName: "John Doe",
    driverName: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020 Black",
    plateNumber: "ABC12345XSR",
    status: "Disputed at 5:30pm",
    price: 1600,
  },
  {
    transactionId: "12344",
    origin: "23 Kuviki Land, Igando",
    destination: "Filmhouse Cinema, lekki 23 Kuviki Land, Igando",
    riderName: "John Doe",
    driverName: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020 Black",
    plateNumber: "ABC12345XSR",
    status: "Disputed at 5:30pm",
    price: 1600,
  },
  {
    transactionId: "12344",
    origin: "23 Kuviki Land, Igando",
    destination: "Filmhouse Cinema, lekki 23 Kuviki Land, Igando",
    riderName: "John Doe",
    driverName: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020 Black",
    plateNumber: "ABC12345XSR",
    status: "Disputed at 5:30pm",
    price: 1600,
  },
  {
    transactionId: "12344",
    origin: "23 Kuviki Land, Igando",
    destination: "Filmhouse Cinema, lekki 23 Kuviki Land, Igando",
    riderName: "John Doe",
    driverName: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020 Black",
    plateNumber: "ABC12345XSR",
    status: "Disputed at 5:30pm",
    price: 1600,
  },
  {
    transactionId: "12344",
    origin: "23 Kuviki Land, Igando",
    destination: "Filmhouse Cinema, lekki 23 Kuviki Land, Igando",
    riderName: "John Doe",
    driverName: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020 Black",
    plateNumber: "ABC12345XSR",
    status: "Disputed at 5:30pm",
    price: 1600,
  },
  {
    transactionId: "12344",
    origin: "23 Kuviki Land, Igando",
    destination: "Filmhouse Cinema, lekki 23 Kuviki Land, Igando",
    riderName: "John Doe",
    driverName: "Emeka Anyawu",
    carModel: "Toyota Corolla 2020 Black",
    plateNumber: "ABC12345XSR",
    status: "Disputed at 5:30pm",
    price: 1600,
  },
];
