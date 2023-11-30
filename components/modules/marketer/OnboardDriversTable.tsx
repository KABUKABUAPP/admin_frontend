import React, { FC, useState, useEffect } from "react";

import OnboardDriversTableHead from "./OnboardDriversTableHead";
import OnboardDriversTableBody from "./OnboardDriversTableBody";
import { useGetOnboardedDriversQuery } from "@/api-services/marketerService";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/ui/Loader/Loader";

interface Props {
  type?: string;
}

const OnboardDriversTable: FC<Props> = ({ type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [onboardedData, setOnboardedData] = useState([])

  const { data, isLoading, isError, refetch, error } = useGetOnboardedDriversQuery(
    { page: currentPage, limit: pageSize, user_type: type === 'Drivers' ? 'driver' : 'rider' },
    { refetchOnReconnect: true }
  );

  return (
    <div className="w-full ">
      {
        isLoading ?
        <Loader /> :
        <>
          <OnboardDriversTableHead type={type} />
          <OnboardDriversTableBody
            data={data?.data}
            loading={isLoading}
            error={isError}
            refetch={refetch}
            type={type}
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
        </>
      }
    </div>
  );
};

export default OnboardDriversTable;
