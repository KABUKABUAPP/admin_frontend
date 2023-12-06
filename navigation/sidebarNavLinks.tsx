import { SidebarLink } from "@/models/SidebarLink";
import DashboardIcon from "@/components/icons/DashboardIcon";
import TripsIcon from "@/components/icons/TripsIcon";
import SosIcon from "@/components/icons/SosIcon";
import TransactionsIcon from "@/components/icons/TransactionsIcon";
import UserIcon from "@/components/icons/UserIcon";
import UserSquareIcon from "@/components/icons/UserSquareIcon";
import CarIcon from "@/components/icons/CarIcon";
import UserGroupIcon from "@/components/icons/UserGroupIcon";
import WithdrawalIcon from "@/components/icons/WithdrawalIcon";
import BuildingIcon from "@/components/icons/BuildingIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import MessageIcon from "@/components/icons/MessageIcon";

const sidebarNavLinks: SidebarLink[] = [
  {
    title: "Dashboard",
    link: "/dashboard",
    isActive: false,
    icon: <DashboardIcon />,
  },
  {
    title: "Trips",
    link: "/trips",
    isActive: false,
    icon: <TripsIcon />,
  },
  {
    title: "SOS",
    link: "/sos",
    isActive: false,
    icon: <SosIcon />,
  },
  {
    title: "Transactions",
    link: "/transactions",
    isActive: false,
    icon: <TransactionsIcon />,
  },
  {
    title: "Riders",
    link: "/riders",
    isActive: false,
    icon: <UserIcon />,
  },
  {
    title: "Drivers",
    link: "/drivers/active",
    isActive: false,
    icon: <UserSquareIcon />,
    subLinks: ['drivers/pending', '/drivers/declined', '/drivers/deleted']
  },
  {
    title: "Sharp Cars",
    link: "/sharp-cars",
    isActive: false,
    icon: <CarIcon />,
  },
  {
    title: "Inspectors",
    link: "/inspectors",
    isActive: false,
    icon: <UserGroupIcon />,
  },
  {
    title: "Fare Prices",
    link: "/fare-prices",
    isActive: false,
    icon: <WithdrawalIcon />,
  },
  {
    title: "Hubs",
    link: "/hubs",
    isActive: false,
    icon: <BuildingIcon />,
  },
  {
    title: "Staffs",
    link: "/staffs",
    isActive: false,
    icon: <UserGroupIcon />,
  },
  {
    title: "Messages",
    link: "/messages",
    isActive: false,
    icon: <MessageIcon />,
  },
  {
    title: "Settings",
    link: "/settings",
    isActive: false,
    icon: <SettingsIcon />,
  },
];

export default sidebarNavLinks;
