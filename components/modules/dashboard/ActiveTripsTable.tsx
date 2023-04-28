import React, { FC } from "react";

import ActiveTripsTableHead from "./ActiveTripsTableHead";
import ActiveTripsTableBody from "./ActiveTripsTableBody";
import { useGetActiveTripsQuery } from "@/api-services/dashboardService";

const ActiveTripsTable: FC = () => {
  const { data, isLoading, isError, refetch, error } = useGetActiveTripsQuery(
    { page: 1, limit: 10 },
    { refetchOnReconnect: true }
  );

  return (
    <div className="w-full  ">
      <ActiveTripsTableHead />
      <ActiveTripsTableBody
        data={data}
        loading={isLoading}
        error={isError}
        refetch={refetch}
      />
    </div>
  );
};

export default ActiveTripsTable;
