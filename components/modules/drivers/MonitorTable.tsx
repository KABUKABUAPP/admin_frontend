import React, { FC, useEffect, useState } from "react";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import DriversTableBodyRow from "./DriversTableBodyRow";
import DriversTableHeadRow from "./DriversTableHeadRow";
import { DriversTableBodyData } from "@/models/Drivers";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import Avatar from "@/components/common/Avatar";
import { capitalizeAllFirstLetters } from "@/utils";

interface Props {
  tableData?: DriversTableBodyData[];
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
  subPath: string;
  headBg?: string;
  currentPage?: number;
  onboardStatus?: string;
}


const MonitorTable: FC<Props> = ({ tableData, isLoading, isError, refetch, subPath, headBg, currentPage, onboardStatus }) => {
  const router = useRouter();
  const [headCellData, setHeadCellData] = useState([
    { title: "Full Name", flex: 2 },
    { title: "Email", flex: 1 },
    { title: "Phone Number", flex: 1 },
    { title: "Total Online Time", flex: 1 },
    { title: "Days Passed", flex: 1 },
    { title: "Passed", flex: 1 }
  ])

  return (
    <EnhancedTable
      headBg={headBg}
      TableHeadComponent={<DriversTableHeadRow headCellData={headCellData}/>}
      rowComponent={(row) => (
        <div className="flex p-3 py-5 gap-6 border-b border-b[#E6E6E6]">
            <div style={{ flex: 2 }} className="flex items-center gap-2">
                <div>
                {row.full_name ? (
                    <Avatar
                    fallBack={row.full_name[0]}
                    imageUrl={row.profile_image}
                    size="sm"
                    allowEnlarge={false}
                    />
                ) : (
                    <Skeleton />
                )}
                </div>
                <p className="text-xs font-bold">{capitalizeAllFirstLetters(row.full_name) || <Skeleton />}</p>
            </div>
            <div style={{ flex: 1 }} className="flex items-center">
                <p className="text-xs font-bold cursor-pointer">
                    {row.email || <Skeleton />}
                </p>
            </div>
            <div style={{ flex: 1 }} className="flex items-center">
                <p className="text-xs font-bold">{row.phone_number || <Skeleton />}</p>
            </div>
            <div style={{ flex: 1 }} className="flex items-center">
                <p className="text-xs font-bold">{`${row.hours}hrs ${row.minutes}minutes` || <Skeleton />}</p>
            </div>
            <div style={{ flex: 1 }} className="flex items-center">
                <p className="text-xs font-bold">
                {row.days_passed || <Skeleton />}
                </p>
            </div>
            <div style={{ flex: 1 }} className="flex items-center">
                <p className="text-xs font-bold">
                {row.passed || <Skeleton />}
                </p>
            </div>
        </div>
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

export default MonitorTable;
