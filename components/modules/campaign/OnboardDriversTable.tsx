import React, { FC, useState, useEffect } from "react";

import OnboardDriversTableHead from "./OnboardDriversTableHead";
import OnboardDriversTableBody from "./OnboardDriversTableBody";
import { useGetOnboardedDriversQuery } from "@/api-services/marketerService";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/ui/Loader/Loader";

interface Props {
  type?: string;
  data: any;
  handleCurrentPage: (e: any) => void;
  currentPage: any
}

const OnboardDriversTable: FC<Props> = ({ type, data, handleCurrentPage, currentPage }) => {
  const [pageSize, setPageSize] = useState(3);
  const [onboardedData, setOnboardedData] = useState([])

  return (
    <div className="w-full ">
      {
        <>
          <OnboardDriversTableHead type={'Latest'} />
          <OnboardDriversTableBody
            data={data?.data}
            loading={false}
            error={false}
            refetch={() => {}}
            type={type}
          />
          {data && (
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={data.pagination.totalCount}
              pageSize={data.pagination.pageSize}
              onPageChange={(page) => handleCurrentPage(page)}
            />
          )}
        </>
      }
    </div>
  );
};

export default OnboardDriversTable;
