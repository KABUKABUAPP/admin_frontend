import React, { FC, useState, useEffect } from "react";

import OnboardDriversTableHead from "./OnboardDriversTableHead";
import OnboardDriversTableBody from "./OnboardDriversTableBody";
import { useGetOnboardedDriversQuery } from "@/api-services/marketerService";
import Pagination from "@/components/common/Pagination";

const OnboardDriversTable: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [onboardedData, setOnboardedData] = useState([])

  const { data, isLoading, isError, refetch, error } = useGetOnboardedDriversQuery(
    { page: '1', limit: '10' },
    { refetchOnReconnect: true }
  );


  useEffect(() => {
    if (data) {
        console.log('d', data);
        setOnboardedData(data);
    }
  }, [data])

  return (
    <div className="w-full ">
      <OnboardDriversTableHead />
      <OnboardDriversTableBody
        data={onboardedData}
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
