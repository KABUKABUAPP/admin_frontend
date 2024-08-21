import React, { FC, useEffect, useState } from "react";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import DriversTableBodyRow from "./DriversTableBodyRow";
import DriversTableHeadRow from "./DriversTableHeadRow";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import Avatar from "@/components/common/Avatar";
import { capitalizeAllFirstLetters } from "@/utils";

interface Props {
  tableData?: any;
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
  subPath: string;
  headBg?: string;
  currentPage?: number;
  onboardStatus?: string;
}


const RewardedUsersTable: FC<Props> = ({ tableData, isLoading, isError, refetch, subPath, headBg, currentPage, onboardStatus }) => {
  const router = useRouter();
  const [headCellData, setHeadCellData] = useState([
    { title: "Full Name", flex: 2 },
    { title: "Email", flex: 3 },
    { title: "Phone No", flex: 2 },
    { title: "Amount", flex: 1 },
    { title: "Total Trips", flex: 1 },
    { title: "Total Trips Benchmark", flex: 1 },
    { title: "Days Benchmark", flex: 1 },
    { title: "Days Passed", flex: 1 },
    { title: "Start Date", flex: 1 },
    { title: "End Date", flex: 1 },
    { title: "Hrs Per Day", flex: 1 },
    { title: "Total Hours", flex: 1 }
  ])

  return (
    <EnhancedTable
      headBg={headBg}
      TableHeadComponent={
        <div className="flex w-full gap-2 justify-start p-3">
            {headCellData.map(({ title, flex }, idx) => {
                return (
                <p className={`font-semibold text-xs flex justify-start`} style={{ flex: flex }} key={idx}>
                    {title}
                </p>
                );
            })}
        </div>
      }
      rowComponent={(row) => (
        <>
        <div className="flex p-3 py-5 gap-2 border-b border-b[#E6E6E6]">
            <div style={{ flex: 2 }} className="flex items-center justify-start">
                <p className="text-xs font-bold break-words">{capitalizeAllFirstLetters(row.full_name) || <Skeleton />}</p>
            </div>
            <div style={{ flex: 3 }} className="flex items-center justify-start">
                <p className="text-xs font-bold break-words">
                    {row.email || <Skeleton />}
                </p>
            </div>
            <div style={{ flex: 2 }} className="flex items-center justify-start">
                <p className="text-xs font-bold break-words">{row.phone_number || <Skeleton />}</p>
            </div>
            <div style={{ flex: 1 }} className="flex items-center justify-start">
                <p className="text-xs font-bold break-words">{row.amount && `${row.amount}` || <Skeleton />}</p>
            </div>
            <div style={{ flex: 1 }} className="flex items-center justify-start">
                <p className="text-xs font-bold break-words">{row.total_trips && `${row.total_trips}` || <Skeleton />}</p>
            </div>
            <div style={{ flex: 1 }} className="flex items-center justify-start">
                <p className="text-xs font-bold break-words">{row.total_trips_benchmark && `${row.total_trips_benchmark}` || <Skeleton />}</p>
            </div>
            <div style={{ flex: 1 }} className="flex items-center justify-start">
                <p className="text-xs font-bold break-words">
                {row.days_benchmark && row.days_benchmark || <Skeleton />}
                </p>
            </div>
            <div style={{ flex: 1 }} className="flex items-center justify-start">
                <p className="text-xs font-bold break-words">
                {row.days_passed && row.days_passed || <Skeleton />}
                </p>
            </div>
            <div style={{ flex: 1 }} className="flex items-center justify-start">
                <p className="text-xs font-bold break-words">
                {row.start_date && new Date(row.start_date).toLocaleDateString() || <Skeleton />}
                </p>
            </div>
            <div style={{ flex: 1 }} className="flex items-center justify-start">
                <p className="text-xs font-bold break-words">
                {row.end_date && new Date(row.end_date).toLocaleDateString() || <Skeleton />}
                </p>
            </div>
            <div style={{ flex: 1 }} className="flex items-center justify-start">
                <p className="text-xs font-bold break-words">
                {row.hours_per_day_benchmark && row.hours_per_day_benchmark.toFixed(2) + 'hrs' || <Skeleton />}
                </p>
            </div>
            <div style={{ flex: 1 }} className="flex items-center justify-start">
                <p className="text-xs font-bold break-words">
                {row.total_hours && row.total_hours.toFixed(2) + 'hrs' || <Skeleton />}
                </p>
            </div>
        </div>
        </>
      )}
      rowData={tableData}
      maxWidth="100vw"
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      headCellData={headCellData}
    />
  );
};

export default RewardedUsersTable;
