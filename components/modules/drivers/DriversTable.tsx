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
}


const DriversTable: FC<Props> = ({ tableData, isLoading, isError, refetch, subPath, headBg, currentPage }) => {
  const router = useRouter();
  const isStatusRemark = router.pathname.includes("drivers/pending");
  const [headCellData, setHeadCellData] = useState([
    { title: "Driver ID", flex: 2 },
    { title: "Full Name", flex: 2 },
    { title: "Location", flex: 1 },
    { title: "Total Trips", flex: 1 },
    { title: "Wallet Balance", flex: 1 },
    { title: "Driver Type", flex: 1 },
    { title: "Status", flex: 1 },
    { title: "Online Status", flex: 1 }
  ])

  useEffect(() => {
    if (isStatusRemark) {
      setHeadCellData([
        { title: "Driver ID", flex: 2 },
        { title: "Full Name", flex: 2 },
        { title: "Location", flex: 1 },
        { title: "Driver Type", flex: 1 },
        { title: "Status", flex: 1 },
        { title: "Online Status", flex: 1 },
        { title: "Onboard Step", flex: 1 }
      ]);
    }
  }, [isStatusRemark, tableData])

  return (
    <EnhancedTable
      headBg={headBg}
      TableHeadComponent={<DriversTableHeadRow headCellData={headCellData}/>}
      rowComponent={(rows) => <DriversTableBodyRow data={rows} subPath={subPath} currentPage={currentPage} />}
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
