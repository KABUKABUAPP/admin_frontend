import { useGetAllCarOwnersQuery, useGetPendingCarRequestsQuery } from '@/api-services/carOwnersService';
import AppHead from '@/components/common/AppHead';
import CountHeader from '@/components/common/CountHeader';
import EnhancedTable from '@/components/common/EnhancedTable/EnhancedTable';
import Pagination from '@/components/common/Pagination';
import SearchFilterBar from '@/components/common/SearchFilterBar';
import CarOwnersOptionBar from '@/components/modules/car-owners/CarOwnersOptionBar';
import CarOwnersOptionItem from '@/components/modules/car-owners/CarOwnersOptionItem';
import PendingRequestsTableBodyRow from '@/components/modules/car-owners/PendingRequestsTableBodyRow';
import PendingRequestsTableHeadRow from '@/components/modules/car-owners/PendingRequestsTableHeadRow';
import AppLayout from '@/layouts/AppLayout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const PendingCarRequests = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(router.query.currentPage ? parseInt(router.query.currentPage as string) : 1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState('');

  const carOwnersOptionsData = [
    {
      title: "Car Owners",
      isActive: false,
      keyVal: "/car-owners"
    },
    {
      title: "Pending Car Requests",
      isActive: true,
      keyVal: "/car-owners/pending-car-requests"
    }
  ];

  const pendingRequestsOptionsData = [
    {
      title: "Pending Requests",
      isActive: true,
      keyVal: "pending"
    },
    {
      title: "Declined Requests",
      isActive: false,
      keyVal: "declined"
    }
  ];

  const headCellData = [
    { title: "Owner ID", flex: 1 },
    { title: "Full Name", flex: 1 },
    //{ title: "Location", flex: 1 },
    { title: "Car", flex: 1 },
    { title: "Status", flex: 1 },
    //{ title: "Status", flex: 1 }
  ];

  const [options, setOptions] = useState(carOwnersOptionsData);
  const [pendingRequestOptions, setPendingRequestOptions] = useState(pendingRequestsOptionsData);
  const [requestStatus, setRequestStatus] = useState('pending');
  const filterOptions = [
    { label: "Newest First", value: "newest_first", default: true },
    { label: "Oldest First", value: "oldest_first", default: false },
    { label: "A-Z", value: "a-z", default: false },
    { label: "Z-A", value: "z-a", default: false },
  ];

  const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
    filterOptions.find((opt) => opt.default === true)?.value || "newest_first"
  );

  const { data, isLoading, isError, refetch } = useGetPendingCarRequestsQuery(
    { limit: pageSize, page: currentPage, requestStatus },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );

  useEffect(() => {
    if (data) console.log('data', data)
  }, [data])

  const handleClickOption = (key: string) => {
    router.push(key);
  };

  return (
    <>
      <AppHead title="Kabukabu | Car Owners" />
      <AppLayout>
        <CountHeader title="Drivers" count={data?.pagination?.totalCount} />
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
        >
            <div className="flex">
                {pendingRequestOptions.map((item, idx) => {
                    return (
                        <CarOwnersOptionItem
                        {...item}
                        key={idx}
                        handleClick={(key) => {
                            const mutatedOptions = pendingRequestOptions.map((option) => {
                                if (option.keyVal === key) {
                                  setRequestStatus(key);
                                  return { ...option, isActive: true };
                                }
                                return { ...option, isActive: false };
                            });
                        
                            setPendingRequestOptions(mutatedOptions);
                        }}
                        />
                    );
                })}
            </div>   
        </SearchFilterBar>
        <EnhancedTable
          TableHeadComponent={<PendingRequestsTableHeadRow headCellData={headCellData} />}
          rowComponent={(rows) => <PendingRequestsTableBodyRow data={rows} currentPage={currentPage} status={requestStatus} />}
          rowData={data?.data}
          maxWidth="100vw"
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          headCellData={headCellData}
          headBg={requestStatus === 'declined' ? '#FEE2E9' : '#FFF5D8'}
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

export default PendingCarRequests;