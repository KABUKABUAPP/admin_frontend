import React, { FC } from "react";
import ActiveTripsTableRow from "@/components/modules/dashboard/ActiveTripsTableRow";
import Button from "@/components/ui/Button/Button";
import ErrorMessage from "../ErrorMessage";
import Skeleton from "react-loading-skeleton";

interface Props {
  rowData?: any[];
  rowComponent: (row: any, idx: number) => React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
}

const EnhancedTableBody: FC<Props> = ({
  rowData,
  rowComponent,
  isError = false,
  isLoading,
  refetch,
}) => {
  const loadingState =
    isLoading === true && isError === false && rowData === undefined;
  const errorState = isError && rowData === undefined && isLoading === true;
  const viewState = rowData && !isLoading === true && isError === false;

  console.log("error", isError);
  console.log("rr", !isError);

  return (
    <div className="w-full bg-[#FFFFFF]">
      {viewState &&
        rowData.map((item, idx) => {
          return rowComponent(item, idx);
        })}
      {loadingState && (
        <>
          <div className="flex justify-between gap-4">
            <div style={{ flex: 1 }}>
              <Skeleton />
            </div>
            <div style={{ flex: 1 }}>
              <Skeleton />
            </div>
            <div style={{ flex: 1 }}>
              <Skeleton />
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <div style={{ flex: 1 }}>
              <Skeleton />
            </div>
            <div style={{ flex: 1 }}>
              <Skeleton />
            </div>
            <div style={{ flex: 1 }}>
              <Skeleton />
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <div style={{ flex: 1 }}>
              <Skeleton />
            </div>
            <div style={{ flex: 1 }}>
              <Skeleton />
            </div>
            <div style={{ flex: 1 }}>
              <Skeleton />
            </div>
          </div>
        </>
      )}
      {isError && (
        <div className="flex flex-col justify-center items-center gap-2 py-4">
          <ErrorMessage message="Error Fetching Data" />
          <Button title="Reload" onClick={()=>{
            if(refetch) refetch()
          }} />
        </div>
      )}
    </div>
  );
};

export default EnhancedTableBody;
