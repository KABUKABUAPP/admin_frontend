import { NextPage } from "next";
import React, { useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import InspectorsTable from "@/components/modules/inspectors/InspectorsTable";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import Button from "@/components/ui/Button/Button";
import AddIcon from "@/components/icons/AddIcon";
import { useGetAllInspectorsQuery } from "@/api-services/inspectorsService";
import Pagination from "@/components/common/Pagination";

const Inspectors: NextPage = () => {
  const [carOwner, setCarOwner] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ pageSize, setPageSize ] = useState(2)
  const {
    data: inspectors,
    isLoading: inspectorsLoading,
    isError: inspectorsError,
    refetch: reloadInspectors,
  } = useGetAllInspectorsQuery({ limit: pageSize, page: currentPage });

  return (
    <AppLayout>
      <SearchFilterBar>
        <div className="flex justify-end mr-3">
          <Button title="Add Inspector" startIcon={<AddIcon />} />
        </div>
      </SearchFilterBar>
      <InspectorsTable
        data={inspectors?.data}
        isLoading={inspectorsLoading}
        isError={inspectorsError}
        refetch={reloadInspectors}
      />
      {inspectors && (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={inspectors.totalCount}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </AppLayout>
  );
};

export default Inspectors;
