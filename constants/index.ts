import { PermissionLabel } from "@/models/Permission";

export const AUTH_BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL;
export const RIDES_BASE_URL = process.env.NEXT_PUBLIC_RIDE_BASE_URL;
export const HUBS_BASE_URL = process.env.NEXT_PUBLIC_HUBS_BASE_URL;
export const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
export const DEV_MONITOR_URL = process.env.NEXT_PUBLIC_DEV_MONITOR_URL;
export const TRANSACTION_BASE_URL = process.env.NEXT_PUBLIC_TRANSACTION_BASE_URL
export const milliSecondToSecondConversionRate = 1000;
export const ACCESS_TOKEN = "AUTH_TOKEN__ACESS-$";
export const USER_TOKEN = "USER_stoRED_$##";


export const rolesOptionsArr: {
  title: string;
  label: string;
  isChecked: boolean;
  read: boolean;
  write: boolean;
}[] = [
  {
    title: "Dashboard",
    label: "dashboard_permissions",
    read: false,
    write: false,
    isChecked: false,
  },
  {
    title: "Trips",
    label: "trips_permissions",
    read: false,
    write: false,
    isChecked: false,
  },
  {
    title: "SOS",
    label: "sos_permisions",
    read: false,
    write: false,
    isChecked: false,
  },
  {
    title: "Transactions",
    label: "transactions_permissions",
    read: false,
    write: false,
    isChecked: false,
  },
  {
    title: "Riders",
    label: "riders_permissions",
    read: false,
    write: false,
    isChecked: false,
  },
  {
    title: "Drivers",
    label: "drivers_permissions",
    read: false,
    write: false,
    isChecked: false,
  },
  {
    title: "Inspectors",
    label: "inspectors_permissions",
    read: false,
    write: false,
    isChecked: false,
  },
  {
    title: "Fare Prices",
    label: "fare_prices_permissions",
    read: false,
    write: false,
    isChecked: false,
  },
  {
    title: "Hubs",
    label: "hubs_permissions",
    read: false,
    write: false,
    isChecked: false,
  },
  {
    title: "Staff",
    label: "staffs_permissions",
    read: false,
    write: false,
    isChecked: false,
  },
  {
    title: "Roles",
    label: "roles_permissions",
    read: false,
    write: false,
    isChecked: false,
  },
  {
    title: "Promotions",
    label: "promotions_permissions",
    read: false,
    write: false,
    isChecked: false,
  },
  {
    title: "Sharp Cars",
    label: "sharp_program_permissions",
    read: false,
    write: false,
    isChecked: false,
  },
];

export const routePermissionsMapping: {
  route: string;
  permissionLabel: PermissionLabel;
}[] = [
  {
    route: '/dashboard',
    permissionLabel: 'dashboard_permissions'
  },
  {
    route: '/trips',
    permissionLabel: 'trips_permissions'
  },
  {
    route: '/sos',
    permissionLabel: 'sos_permisions'
  },
  {
    route: '/transactions',
    permissionLabel: 'transactions_permissions'
  },
  {
    route: '/riders',
    permissionLabel: 'riders_permissions'
  },
  {
    route: '/drivers',
    permissionLabel: 'drivers_permissions'
  },
  {
    route: '/sharp-cars',
    permissionLabel: 'sharp_program_permissions'
  },
  {
    route: '/inspectors',
    permissionLabel: 'inspectors_permissions'
  },
  {
    route: '/fare-prices',
    permissionLabel: 'fare_prices_permissions'
  },
  {
    route: '/hubs',
    permissionLabel: 'hubs_permissions'
  },
  {
    route: '/staffs',
    permissionLabel: 'staffs_permissions'
  },
  {
    route: '/messages',
    permissionLabel: ''
  },
  {
    route: '/settings',
    permissionLabel: ''
  },
  {
    route: '/live-map',
    permissionLabel: ''
  },
  {
    route: '/car-owners',
    permissionLabel: ''
  },
  {
    route: '/car-repair-loan',
    permissionLabel: ''
  },
  {
    route: '/campaigns',
    permissionLabel: ''
  }
];

export const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];
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
    title: "Pending Orders",
    isActive: false,
    keyVal: "pending_orders",
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
    title: "Cancelled Trips",
    isActive: false,
    keyVal: "cancelled_orders",
  },
  {
    title: "Cancelled Orders",
    isActive: false,
    keyVal: "declined",
  },
  {
    title: "Scheduled Trips",
    isActive: false,
    keyVal: "scheduled_trips",
  }
];

export const driverOptionBarData = [
  {
    title: "Active Drivers",
    isActive: true,
    keyVal: "active",
  },
  {
    title: "Pending Drivers",
    isActive: false,
    keyVal: "pending",
  },
  {
    title: "Declined Drivers",
    isActive: false,
    keyVal: "declined",
  },
  {
    title: "Deleted Drivers",
    isActive: false,
    keyVal: "deleted",
  },
  {
    title: "Online Consistency",
    isActive: false,
    keyVal: "online-monitor",
  }
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
    keyVal: "",
  },
  {
    title: "Pending Cars",
    isActive: false,
    keyVal: "pending",
  },
  {
    title: "Car Deliveries",
    isActive: false,
    keyVal: "car-deliveries",
  },
  {
    title: "Pending Drivers",
    isActive: false,
    keyVal: "pending-drivers",
  }
];

export const transactionsOptionsBar = [
  {
    title: "All Transactions",
    isActive: true,
    keyVal: "",
  },
  {
    title: "Trip Payments",
    isActive: false,
    keyVal: "trip_payments",
  },
  {
    title: "Trip Charges",
    isActive: false,
    keyVal: "trip_charges",
  },
  {
    title: "Top Up",
    isActive: false,
    keyVal: "top_up",
  },
  {
    title: "Withdrawals",
    isActive: false,
    keyVal: "withdrawals",
  },
  {
    title: "Manual Wallet Credit",
    isActive: false,
    keyVal: "manual_credit",
  },
  {
    title: "Subscriptions",
    isActive: false,
    keyVal: "subscriptions",
  },
  {
    title: "Sharp Payments",
    isActive: false,
    keyVal: "sharp_payments",
  },
];

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
