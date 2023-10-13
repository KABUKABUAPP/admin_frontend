import React, { FC } from "react";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import { sosTripsRowMockData } from "../../../constants";
import SosTableHeadRow from "./SosTableHeadRow";
import SosTableRow from "./SosTableRow";
import { SosTableData } from "@/models/Sos";

const headCellData = [
  { title: "ID", flex: 2 },
  { title: "Origin/Destination", flex: 2 },
  { title: "Rider", flex: 1 },
  { title: "Driver", flex: 1 },
  { title: "Car", flex: 1 },
  { title: "Status", flex: 1 },
  { title: "Raised by", flex: 1 },
  { title: "Reason", flex: 1 },
];

interface Props {
  data?: SosTableData[];
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
}

const SosTable: FC<Props> = ({ data, isLoading, isError, refetch }) => {
  return (
    <EnhancedTable
      headBg="#FEE2E9"
      TableHeadComponent={<SosTableHeadRow headCellData={headCellData} />}
      maxWidth="100vw"
      rowComponent={(row, index) => <SosTableRow data={row} index={index} />}
      rowData={data}
      isError={isError}
      isLoading={isLoading}
      refetch={refetch}
      headCellData={headCellData}
    />
  );
};

export default SosTable;
