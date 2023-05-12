import React, { FC } from "react";
import Button from "@/components/ui/Button/Button";
import ErrorMessage from "../ErrorMessage";
import Skeleton from "react-loading-skeleton";
import TableLoader from "./TableLoader";

interface Props {
  rowData?: any[];
  rowComponent: (row: any, idx: number) => React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
  headCellData?: { title: string; flex: number }[];
}

const EnhancedTableBody: FC<Props> = ({
  rowData,
  rowComponent,
  isError = false,
  isLoading,
  refetch,
  headCellData,
}) => {
  return (
    <div className="w-full bg-[#FFFFFF]">
      {rowData &&
        rowData.map((item, idx) => {
          return rowComponent(item, idx);
        })}
      {rowData && rowData.length < 1 && (
        <p className="text-center py-4">No Records Found</p>
      )}
      {isLoading && <TableLoader headCellData={headCellData} />}
      {isError && (
        <div className="flex flex-col justify-center items-center gap-2 py-4">
          <ErrorMessage message="Error Fetching Data" />
          <Button
            title="Reload"
            onClick={() => {
              if (refetch) refetch();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EnhancedTableBody;
