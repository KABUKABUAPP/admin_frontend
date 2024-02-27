import { useGetAllCarOwnersQuery } from '@/api-services/carOwnersService';
import AppHead from '@/components/common/AppHead';
import CountHeader from '@/components/common/CountHeader';
import EnhancedTable from '@/components/common/EnhancedTable/EnhancedTable';
import Pagination from '@/components/common/Pagination';
import SearchFilterBar from '@/components/common/SearchFilterBar';
import CarOwnersOptionBar from '@/components/modules/car-owners/CarOwnersOptionBar';
import CarOwnersTableBodyRow from '@/components/modules/car-owners/CarOwnersTableBodyRow';
import CarOwnersTableHeadRow from '@/components/modules/car-owners/CarOwnersTableHeadRow';
import AppLayout from '@/layouts/AppLayout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const CarOwners = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(router.query.currentPage ? parseInt(router.query.currentPage as string) : 1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState('');

  const carOwnersOptionsData = [
    {
      title: "Car Owners",
      isActive: true,
      keyVal: "/car-owners"
    },
    {
      title: "Pending Car Requests",
      isActive: false,
      keyVal: "/car-owners/pending-car-requests"
    }
  ];

  const [options, setOptions] = useState(carOwnersOptionsData);
  const filterOptions = [
    { label: "Newest First", value: "newest_first", default: true },
    { label: "Oldest First", value: "oldest_first", default: false },
    { label: "A-Z", value: "a-z", default: false },
    { label: "Z-A", value: "z-a", default: false },
  ];

  const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
    filterOptions.find((opt) => opt.default === true)?.value || "newest_first"
  );

  const { data, isLoading, isError, refetch } = useGetAllCarOwnersQuery(
    { limit: pageSize, page: currentPage, search: search },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  const handleClickOption = (key: string) => {
    router.push(key);
  };

  const headCellData = [
    { title: "Owner ID", flex: 1 },
    { title: "Full Name", flex: 1 },
    { title: "Location", flex: 1 },
    { title: "Total Cars", flex: 1 },
    { title: "Active Cars", flex: 1 },
    //{ title: "Status", flex: 1 }
  ];
  

  return (
    <>
      <AppHead title="Kabukabu | Car Owners" />
      <AppLayout>
        <CountHeader title="Car Owners" count={data?.pagination?.totalCount} />
        <CarOwnersOptionBar
          handleClickOption={(key) => handleClickOption(key)}
          options={options}
        />
        <SearchFilterBar
          searchValue={search}
          handleSearch={(val) => setSearch(val)}
          filterOptions={filterOptions}
          dropDownOptionSelected={selectedFilterOption}
          handleDropDown={(val) => setSelectedFilterOption(String(val))}
        ></SearchFilterBar>
        <EnhancedTable
          TableHeadComponent={<CarOwnersTableHeadRow headCellData={headCellData} />}
          rowComponent={(rows) => <CarOwnersTableBodyRow data={rows} currentPage={currentPage} />}
          rowData={data?.data}
          maxWidth="100vw"
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          headCellData={headCellData}
        />
        {data && (
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={data?.pagination?.totalCount}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
      </AppLayout>
    </>
  )
}

export default CarOwners;