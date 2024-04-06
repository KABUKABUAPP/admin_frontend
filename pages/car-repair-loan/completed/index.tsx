import AppHead from "@/components/common/AppHead";
import CountHeader from "@/components/common/CountHeader";
import CarRepairLoanOptionBar from "@/components/modules/car-repair-loan/CarRepairLoanOptionBar";
import AppLayout from "@/layouts/AppLayout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import CarRepairLoanTableHeadRow from "@/components/modules/car-repair-loan/CarRepairLoanTableHeadRow";
import CarRepairLoanTableBodyRow from "@/components/modules/car-repair-loan/CarRepairLoanTableBodyRow";
import { useGetAllCarRepairLoanQuery } from "@/api-services/carRepairLoanService";
import Pagination from "@/components/common/Pagination";
import CarRepairLoanTableBodyCompletedRow from "@/components/modules/car-repair-loan/CarRepairLoanTableBodyCompletedRow";

const CarRepairLoanCompleted = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(router.query.currentPage ? parseInt(router.query.currentPage as string) : 1);
    const [pageSize, setPageSize] = useState(5);
    const [search, setSearch] = useState('');

    const CarRepairLoanOptionData = [
        {
            title: "Pending",
            isActive: false,
            keyVal: "/car-repair-loan"
        },
        {
            title: "Active",
            isActive: false,
            keyVal: "/car-repair-loan/active"
        },
        {
            title: "Completed",
            isActive: true,
            keyVal: "/car-repair-loan/completed"
        }
    ];

    const [options, setOptions] = useState(CarRepairLoanOptionData);
    const filterOptions = [
        { label: "Newest First", value: "newest_first", default: true },
        { label: "Oldest First", value: "oldest_first", default: false },
        { label: "A-Z", value: "a-z", default: false },
        { label: "Z-A", value: "z-a", default: false },
    ];

    const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
        filterOptions.find((opt) => opt.default === true)?.value || "newest_first"
    );

    const handleClickOption = (key: string) => {
        router.push(key);
    };

    const headCellData = [
        { title: "Loan ID", flex: 1 },
        { title: "Driver", flex: 1 },
        { title: "Location", flex: 1 },
        { title: "Amount Paid", flex: 1 },
        { title: "Date Completed", flex: 1 },
        { title: "Status", flex: 1 }
    ];

    const { data, isLoading, isError, refetch } = useGetAllCarRepairLoanQuery(
        { limit: 10, page: currentPage, status: 'completed' },
        { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
    );

    return (
        <>
            <AppHead title="Kabukabu | Repair Loan" />
            <AppLayout>
                <CountHeader title="Repair Loans" count={data?.pagination?.totalCount} />
                <CarRepairLoanOptionBar 
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
                    TableHeadComponent={<CarRepairLoanTableHeadRow headCellData={headCellData} />}
                    rowComponent={(rows) => <CarRepairLoanTableBodyCompletedRow data={rows} currentPage={currentPage} />}
                    rowData={data?.data}
                    maxWidth="100vw"
                    isLoading={false}
                    isError={false}
                    refetch={() => {}}
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

export default CarRepairLoanCompleted;