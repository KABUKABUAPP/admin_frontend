import { NextPage } from "next";
import React from "react";

import AppLayout from "@/layouts/AppLayout";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import Button from "@/components/ui/Button/Button";
import AddIcon from "@/components/icons/AddIcon";
import FarePricesTable from "@/components/modules/fare-prices/FarePricesTable";

const FarePrices: NextPage = () => {
  return (
    <AppLayout>
      <SearchFilterBar>
        <div className="flex justify-end mr-3">
          <Button title="Add New Fare Profile" startIcon={<AddIcon />} />
        </div>
      </SearchFilterBar>

      <FarePricesTable data={mockData}/>
    </AppLayout>
  );
};

export default FarePrices;

const mockData = [
  {
    profileId: "1234",
    city: "Ikorodu",
    stateCountry: "Lagos, Nigeria",
    totalFares: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm"
  },
  {
    profileId: "1234",
    city: "Ikorodu",
    stateCountry: "Lagos, Nigeria",
    totalFares: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm"
  },
  {
    profileId: "1234",
    city: "Ikorodu",
    stateCountry: "Lagos, Nigeria",
    totalFares: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm"
  },
  {
    profileId: "1234",
    city: "Ikorodu",
    stateCountry: "Lagos, Nigeria",
    totalFares: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm"
  },
  {
    profileId: "1234",
    city: "Ikorodu",
    stateCountry: "Lagos, Nigeria",
    totalFares: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm"
  },
  {
    profileId: "1234",
    city: "Ikorodu",
    stateCountry: "Lagos, Nigeria",
    totalFares: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm"
  },
  {
    profileId: "1234",
    city: "Ikorodu",
    stateCountry: "Lagos, Nigeria",
    totalFares: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm"
  },
  {
    profileId: "1234",
    city: "Ikorodu",
    stateCountry: "Lagos, Nigeria",
    totalFares: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm"
  },
  {
    profileId: "1234",
    city: "Ikorodu",
    stateCountry: "Lagos, Nigeria",
    totalFares: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm"
  },
  {
    profileId: "1234",
    city: "Ikorodu",
    stateCountry: "Lagos, Nigeria",
    totalFares: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm"
  },
  {
    profileId: "1234",
    city: "Ikorodu",
    stateCountry: "Lagos, Nigeria",
    totalFares: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm"
  },
]
