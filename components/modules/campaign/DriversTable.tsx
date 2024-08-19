import React, { FC, useEffect, useState } from "react";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import DriversTableBodyRow from "./DriversTableBodyRow";
import DriversTableHeadRow from "./DriversTableHeadRow";
import { DriversTableBodyData } from "@/models/Drivers";
import { useRouter } from "next/router";

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


const DriversTable: FC<Props> = ({ tableData, isLoading, isError, refetch, subPath, headBg, currentPage, onboardStatus }) => {
  const router = useRouter();
  const isStatusRemark = router.query.tab === "pending" || router.query.tab === "declined";
  const headCellData = [
    { title: "Full Name", flex: 2 },
    { title: "Location", flex: 1 },
    { title: "Total Trips", flex: 1 },
    { title: "Phone Number", flex: 2 },
    { title: "Email", flex: 2 },
    { title: "Driver Type", flex: 1 },
    { title: "Status", flex: 1 },
    { title: "Online Status", flex: 1 }
  ]

  const headCellDataStatusRemark = [
    { title: "Full Name", flex: 2 },
    { title: "Location", flex: 1 },
    { title: "Phone Number", flex: 2 },
    { title: "Email", flex: 2 },
    { title: "Driver Type", flex: 1 },
    { title: "Status", flex: 1 },
    { title: "Onboard Step", flex: 1 }
  ]

  return (
    <EnhancedTable
      headBg={headBg}
      TableHeadComponent={<DriversTableHeadRow headCellData={isStatusRemark ? headCellDataStatusRemark : headCellData}/>}
      rowComponent={(rows) => <DriversTableBodyRow data={rows} subPath={subPath} currentPage={currentPage} onboardStatus={onboardStatus} />}
      rowData={tableData}
      maxWidth="100vw"
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      headCellData={headCellData}
    />
  );
};

export default DriversTable;
