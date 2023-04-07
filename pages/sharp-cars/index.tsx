import { NextPage } from "next";
import React from "react";

import AppLayout from "@/layouts/AppLayout";
import CountHeader from "@/components/common/CountHeader";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import SharpCarsTable from "@/components/modules/sharp-cars/SharpCarsTable";

const SharpCars: NextPage = () => {
  return (
    <AppLayout>
      <CountHeader title="Sharp Cars" count={5000} />
      <SearchFilterBar />
      <SharpCarsTable data={mockTableData}/>
    </AppLayout>
  );
};

export default SharpCars;

const mockTableData = [
  {
    carId: "12344",
    carBrandModel: "IVM 2022 Mini",
    driver: "John Doe",
    licenseNumber: "ABCXS234",
    dateTimeAdded: "1 Jan 2022 at 5:30pm",
  },

  {
    carId: "12344",
    carBrandModel: "IVM 2022 Mini",
    driver: "John Doe",
    licenseNumber: "ABCXS234",
    dateTimeAdded: "1 Jan 2022 at 5:30pm",
  },
  {
    carId: "12344",
    carBrandModel: "IVM 2022 Mini",
    driver: "John Doe",
    licenseNumber: "ABCXS234",
    dateTimeAdded: "1 Jan 2022 at 5:30pm",
  },
  {
    carId: "12344",
    carBrandModel: "IVM 2022 Mini",
    driver: "John Doe",
    licenseNumber: "ABCXS234",
    dateTimeAdded: "1 Jan 2022 at 5:30pm",
  },
  {
    carId: "12344",
    carBrandModel: "IVM 2022 Mini",
    driver: "John Doe",
    licenseNumber: "ABCXS234",
    dateTimeAdded: "1 Jan 2022 at 5:30pm",
  },
];
