import React, { FC, useState } from "react";

import OnboardDriversTableHead from "./OnboardDriversTableHead";
import OnboardDriversTableBody from "./OnboardDriversTableBody";
import { useGetActiveTripsQuery } from "@/api-services/dashboardService";
import Pagination from "@/components/common/Pagination";

const OnboardDriversTable: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const { data, isLoading, isError, refetch, error } = useGetActiveTripsQuery(
    { page: currentPage, limit: pageSize, type: 'trip' },
    { refetchOnReconnect: true }
  );


  return (
    <div className="w-full ">
      <OnboardDriversTableHead />
      <OnboardDriversTableBody
        data={data?.data}
        loading={isLoading}
        error={isError}
        refetch={refetch}
      />
      {data && (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data.totalCount}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default OnboardDriversTable;
