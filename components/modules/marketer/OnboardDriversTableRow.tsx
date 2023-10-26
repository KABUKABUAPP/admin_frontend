import React, { FC, useState, useEffect } from "react";

import OnboardDriversTableCell from "./OnboardDriversTableCell";

import Button from "@/components/ui/Button/Button";

interface Props {
  data?: {fullName: string; type: string; image: string; id: string;}[] | undefined;
  handleViewAll?: () => void;
}

const OnboardDriversTableRow: FC<Props> = ({
  data,
  handleViewAll,
}) => {
  const [allPendingApps, setAllPendingApps] = useState<{fullName: string; type: string; image: string; id: string;}[]>();
  const [slicedPendingApps, setSlicedPendingApps] = useState<{fullName: string; type: string; image: string; id: string;}[]>();

  useEffect(() => {
    if (data) {
      setAllPendingApps(data);
      setSlicedPendingApps([...data].slice(0, 3));
    }
  }, [data]);

  return (
    <div className="w-full bg-[#FDFDFD] p-3">
      {data && data.length ? (
        <>
          <div
            className="max-h-[200px] overflow-y-auto scrollbar-none"
          >
            {data &&
              allPendingApps?.map((item, idx) => {
                return (
                  <OnboardDriversTableCell {...item} key={idx} />
                );
              })}
          </div>
        </>
      ) : (
        <p className="text-center text-xs">No Data</p>
      )}
    </div>
  );
};

export default OnboardDriversTableRow;
