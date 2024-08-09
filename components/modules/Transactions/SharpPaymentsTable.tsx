import { useGetAllTransactionsQuery } from '@/api-services/transactionsService';
import EnhancedTable from '@/components/common/EnhancedTable/EnhancedTable'
import Pagination from '@/components/common/Pagination';
import React, { FC, useEffect, useState } from 'react'
import SharpPaymentsTableRow from './TableRows/SharpPaymentsTableRow';

const headCellData = [
  { title: "Transaction ID", flex: 1 },
  { title: "User", flex: 2 },
  { title: "Type", flex: 1 },
  { title: "Narration", flex: 1 },
  { title: "Price", flex: 1 },
  { title: "Amount remaining", flex: 1 },
  { title: "Date", flex: 1 },
  { title: "", flex: 2 },
];

interface Props {
  order: string;
  dateStart?: any;
  dateEnd?: any;
  minAmount?: any;
  setTotalWithdrawal: any;
}

const SharpPaymentsTable:FC<Props> = ({order, dateStart, dateEnd, minAmount, setTotalWithdrawal}) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, isError, refetch } = useGetAllTransactionsQuery(
    { limit: pageSize, page: currentPage, search: search, filter: 'sharp_payment', order, dateStart, dateEnd, minAmount },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );
  
  return (
    <>
      <EnhancedTable
        headCellData={headCellData}
        generic={true}
        maxWidth="100vw"
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
        rowComponent={(rows)=><SharpPaymentsTableRow data={rows}/>}
        rowData={data?.data}
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
  )
}

export default SharpPaymentsTable