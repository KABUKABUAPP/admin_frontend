import { NextPage } from "next";
import React from "react";

import AppLayout from "@/layouts/AppLayout";
import InspectorsTable from "@/components/modules/inspectors/InspectorsTable";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import Button from "@/components/ui/Button/Button";
import AddIcon from "@/components/icons/AddIcon";
import { useGetAllInspectorsQuery } from "@/api-services/inspectorsService";

const Inspectors: NextPage = () => {
  const {
    data: inspectors,
    isLoading: inspectorsLoading,
    error: inspectorsError,
    refetch: reloadInspectors,
  } = useGetAllInspectorsQuery({ limit: 10, page: 1 });

  console.log(inspectors)

  return (
    <AppLayout>
      <SearchFilterBar>
        <div className="flex justify-end mr-3">
          <Button title="Add Inspector" startIcon={<AddIcon />} />
        </div>
      </SearchFilterBar>
      <InspectorsTable data={inspectors?.data} />
    </AppLayout>
  );
};

export default Inspectors;

const mockData = [
  {
    inspectorId: "12344",
    fullName: "John Doe",
    imageUrl: "",
    location: "Lagos, Nigeria",
    hub: "Sabo Yaba Hub",
    carsInHub: 0,
    totalCarsProcessed: 110,
  },
  {
    inspectorId: "12344",
    fullName: "John Doe",
    imageUrl: "",
    location: "Lagos, Nigeria",
    hub: "Sabo Yaba Hub",
    carsInHub: 0,
    totalCarsProcessed: 110,
  },
  {
    inspectorId: "12344",
    fullName: "John Doe",
    imageUrl: "",
    location: "Lagos, Nigeria",
    hub: "Sabo Yaba Hub",
    carsInHub: 0,
    totalCarsProcessed: 110,
  },
  {
    inspectorId: "12344",
    fullName: "John Doe",
    imageUrl: "",
    location: "Lagos, Nigeria",
    hub: "Sabo Yaba Hub",
    carsInHub: 0,
    totalCarsProcessed: 110,
  },
  {
    inspectorId: "12344",
    fullName: "John Doe",
    imageUrl: "",
    location: "Lagos, Nigeria",
    hub: "Sabo Yaba Hub",
    carsInHub: 0,
    totalCarsProcessed: 110,
  },
  {
    inspectorId: "12344",
    fullName: "John Doe",
    imageUrl: "",
    location: "Lagos, Nigeria",
    hub: "Sabo Yaba Hub",
    carsInHub: 0,
    totalCarsProcessed: 110,
  },
  {
    inspectorId: "12344",
    fullName: "John Doe",
    imageUrl: "",
    location: "Lagos, Nigeria",
    hub: "Sabo Yaba Hub",
    carsInHub: 0,
    totalCarsProcessed: 110,
  },
  {
    inspectorId: "12344",
    fullName: "John Doe",
    imageUrl: "",
    location: "Lagos, Nigeria",
    hub: "Sabo Yaba Hub",
    carsInHub: 0,
    totalCarsProcessed: 110,
  },
  {
    inspectorId: "12344",
    fullName: "John Doe",
    imageUrl: "",
    location: "Lagos, Nigeria",
    hub: "Sabo Yaba Hub",
    carsInHub: 0,
    totalCarsProcessed: 110,
  },
];
