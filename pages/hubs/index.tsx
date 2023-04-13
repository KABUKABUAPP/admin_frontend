import { NextPage } from "next";
import React from "react";

import AppLayout from "@/layouts/AppLayout";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import Button from "@/components/ui/Button/Button";
import AddIcon from "@/components/icons/AddIcon";
import HubsTable from "@/components/modules/hubs/HubsTable";

const Hubs: NextPage = () => {
  return (
    <AppLayout>
      <SearchFilterBar>
        <div className="flex justify-end mr-3">
          <Button title="Add New Hub" startIcon={<AddIcon />} />
        </div>
      </SearchFilterBar>

      <HubsTable data={mockData} />
    </AppLayout>
  );
};

export default Hubs;

const mockData = [
  {
    hubId: "1234",
    hubName: "Ikorodu Inspection Center",
    stateCountry: "Lagos, Nigeria",
    inspector: "John Doe",
    totalCarsProcessed: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm"
  },
  {
    hubId: "1234",
    hubName: "Ikorodu Inspection Center",
    stateCountry: "Lagos, Nigeria",
    inspector: "John Doe",
    totalCarsProcessed: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm"
  },
  {
    hubId: "1234",
    hubName: "Ikorodu Inspection Center",
    stateCountry: "Lagos, Nigeria",
    inspector: "John Doe",
    totalCarsProcessed: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm"
  },
  {
    hubId: "1234",
    hubName: "Ikorodu Inspection Center",
    stateCountry: "Lagos, Nigeria",
    inspector: "John Doe",
    totalCarsProcessed: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm"
  },
  {
    hubId: "1234",
    hubName: "Ikorodu Inspection Center",
    stateCountry: "Lagos, Nigeria",
    inspector: "John Doe",
    totalCarsProcessed: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm"
  },
  {
    hubId: "1234",
    hubName: "Ikorodu Inspection Center",
    stateCountry: "Lagos, Nigeria",
    inspector: "John Doe",
    totalCarsProcessed: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm"
  },
  {
    hubId: "1234",
    hubName: "Ikorodu Inspection Center",
    stateCountry: "Lagos, Nigeria",
    inspector: "John Doe",
    totalCarsProcessed: 4,
    dateCreated: "Jan 1, 2023 at 4:30pm"
  },
]
