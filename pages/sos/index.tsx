import { NextPage } from "next";
import React, { useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import CountHeader from "@/components/common/CountHeader";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import SosTable from "@/components/modules/Sos/SosTable";
import { useGetAllSosQuery } from "@/api-services/sosService";
import Pagination from "@/components/common/Pagination";

const SOS: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const { data, isLoading, isError, refetch } = useGetAllSosQuery(
    { limit: pageSize, page: currentPage, date: "this_week" },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  return (
    <AppLayout>
      <CountHeader title="SOS Today" count={data?.totalCount} />
      <SearchFilterBar />
      <SosTable
        data={data?.data}
        isError={isError}
        isLoading={isLoading}
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
    </AppLayout>
  );
};

export default SOS;
