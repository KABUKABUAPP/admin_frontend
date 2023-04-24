import React, { FC } from "react";
import { Trip } from "@/models/Trips";
import ActiveTripsTableRow from "./ActiveTripsTableRow";
import Button from "@/components/ui/Button/Button";
import ActiveTripsTableCell from "./ActiveTripsTableCell";

interface Props {
  data: Trip[] | undefined;
  loading: boolean;
  error: boolean;
  refetch: () => void;
}

const ActiveTripsTableBody: FC<Props> = ({ data, loading, error, refetch }) => {
  const viewState = !loading && !error && data;
  const loadingState = loading && !data && !error;
  const errorState = !loading && !data && error;

  return (
    <div
      className="w-full overflow-x-auto p-2  bg-[#FDFDFD] 
  scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
  scrollbar-thumb-gray-900 scrollbar-track-gray-300
  "
    >
      {viewState && (
        <>
          {data.length > 0 ? (
            data.map((item, idx) => {
              return <ActiveTripsTableRow {...item} key={idx} />;
            })
          ) : (
            <p className="text-xs text-center py-3">No Active Trips</p>
          )}
        </>
      )}
      {loadingState && (
        <div className="flex justify-evenly gap-4">
          <ActiveTripsTableCell />
          <ActiveTripsTableCell />
          <ActiveTripsTableCell />
        </div>
      )}
      {errorState && (
        <div className="flex flex-col items-center">
          <p className="text-xs text-rose-700 mb-2">
            Oops! Error fetching active trips
          </p>
          <Button title="Reload Active Trips" onClick={refetch} />
        </div>
      )}
    </div>
  );
};

export default ActiveTripsTableBody;
