import React, { FC, useEffect } from "react";
import { Trip } from "@/models/Trips";
import OnboardDriversTableRow from "./OnboardDriversTableRow";
import Button from "@/components/ui/Button/Button";
import OnboardDriversTableCell from "./OnboardDriversTableCell";

import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import { capitalizeAllFirstLetters } from "@/utils";

interface Props {
  data: any | undefined | null;
  loading: boolean;
  error: boolean;
  refetch: () => void;
  type?: string;
}

const OnboardDriversTableBody: FC<Props> = ({ data, loading, error, refetch, type }) => {
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
            data.map((item: any, idx: any) => {
              return <OnboardDriversTableCell fullName={item.user.full_name} type={item.approval_status === 'active' ? capitalizeAllFirstLetters(item.approval_status) : `${capitalizeAllFirstLetters(item.approval_status)}(${capitalizeAllFirstLetters(item.status_remark)})`} image={item.user.profile_image} id={item.user._id} key={idx} />
            })
          ) : (
            <p className="text-xs text-center py-3">No Onboarded {type}</p>
          )}
        </>
      )}
      {loadingState && (
        <div className="flex justify-evenly gap-4">
          <OnboardDriversTableCell fullName={""} type={""} image={""} id={""} />
        </div>
      )}
      {errorState && (
        <div className="flex flex-col items-center">
          <p className="text-xs text-rose-700 mb-2">
            Oops! Error fetching onboarded drivers
          </p>
          <Button title="Reload" onClick={refetch} />
        </div>
      )}
    </div>
  );
};

export default OnboardDriversTableBody;
