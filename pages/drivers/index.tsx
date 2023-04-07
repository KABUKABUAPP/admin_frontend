import { NextPage } from "next";
import React, { useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import DriversTable from "@/components/modules/drivers/DriversTable";
import { DriversTableBodyData } from "@/models/Drivers";
import CountHeader from "@/components/common/CountHeader";
import DriverOptionBar from "@/components/modules/drivers/DriverOptionBar";
import { driverOptionBarData, driverTypeFilterOptionsData } from "@/constants";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import DriverTypeFilterBox from "@/components/modules/drivers/DriverTypeFilterBox";

const Drivers: NextPage = () => {
  const [driverOptions, setDriverOptions] = useState(driverOptionBarData);
  const [driverTypeOptions, setDriverTypeOptions] = useState(
    driverTypeFilterOptionsData
  );

  const handleActiveDriverOption = (keyVal: string) => {
    const mutatedOptions = driverOptions.map((option) => {
      if (option.keyVal === keyVal) return { ...option, isActive: true };
      return { ...option, isActive: false };
    });

    setDriverOptions(() => mutatedOptions);
  };

  const handleDriverTypeOption = (keyVal: string) => {
    const mutatedOptions = driverTypeOptions.map((option) => {
      if (option.keyVal === keyVal) return { ...option, isActive: true };
      return { ...option, isActive: false };
    });

    setDriverTypeOptions(() => mutatedOptions);
  };

  return (
    <AppLayout>
      <CountHeader count={5000} title="Drivers" />
      <SearchFilterBar>
        <DriverTypeFilterBox
          options={driverTypeOptions}
          handleClickOption={(keyVal) => handleDriverTypeOption(keyVal)}
        />
      </SearchFilterBar>
      <DriverOptionBar
        options={driverOptions}
        handleClickOption={(keyVal) => {
          handleActiveDriverOption(keyVal);
        }}
      />
      <div className="mt-5">
        <DriversTable tableData={mockData} />
      </div>
    </AppLayout>
  );
};

export default Drivers;

const mockData: DriversTableBodyData[] = [
  {
    driverId: "1234",
    fullName: "John Doe",
    location: "Lagos, Nigeria",
    totalTrips: 300,
    walletBalance: 5000,
    status: "Active",
    driverType: "Regular Driver",
    imageUrl: "/testUser.jpg",
  },
  {
    driverId: "1234",
    fullName: "John Doe",
    location: "Lagos, Nigeria",
    totalTrips: 300,
    walletBalance: 5000,
    status: "Active",
    driverType: "Regular Driver",
    imageUrl: "/testUser.jpg",
  },
  {
    driverId: "1234",
    fullName: "John Doe",
    location: "Lagos, Nigeria",
    totalTrips: 300,
    walletBalance: 5000,
    status: "Active",
    driverType: "Regular Driver",
    imageUrl: "/testUser.jpg",
  },
  {
    driverId: "1234",
    fullName: "John Doe",
    location: "Lagos, Nigeria",
    totalTrips: 300,
    walletBalance: 5000,
    status: "Active",
    driverType: "Regular Driver",
    imageUrl: "/testUser.jpg",
  },
  {
    driverId: "1234",
    fullName: "John Doe",
    location: "Lagos, Nigeria",
    totalTrips: 300,
    walletBalance: 5000,
    status: "Active",
    driverType: "Regular Driver",
    imageUrl: "/testUser.jpg",
  },
];
