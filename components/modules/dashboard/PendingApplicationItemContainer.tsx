import React, { FC, useState, useEffect } from "react";

import PendingApplicationItem from "./PendingApplicationItem";

import { PendingApplication } from "@/models/PendingApplication";
import Button from "@/components/ui/Button/Button";

interface Props {
  data?: PendingApplication[] | undefined;
  route: string;
  handleViewAll?: () => void;
}

const PendingApplicationItemContainer: FC<Props> = ({
  data,
  route,
  handleViewAll,
}) => {
  const [isViewAll, setViewAll] = useState<boolean>(false);
  const [allPendingApps, setAllPendingApps] = useState<PendingApplication[]>();
  const [slicedPendingApps, setSlicedPendingApps] =
    useState<PendingApplication[]>();

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
            className="max-h-[200px] overflow-y-auto scrollbar-none
      "
          >
            {data &&
              isViewAll &&
              allPendingApps?.map((item, idx) => {
                return (
                  <PendingApplicationItem {...item} route={route} key={idx} />
                );
              })}
            {data &&
              !isViewAll &&
              slicedPendingApps?.map((item, idx) => {
                return (
                  <PendingApplicationItem {...item} route={route} key={idx} />
                );
              })}
          </div>
          <div className="border-t-[#E6E6E6] border-t p-2 pt-4">
            <Button
              variant="text"
              title={"View All"}
              size="small"
              className="mx-auto"
              onClick={() => {
                if (handleViewAll) handleViewAll();
              }}
            />
          </div>
        </>
      ) : (
        <p className="text-center text-xs">No Data</p>
      )}
    </div>
  );
};

export default PendingApplicationItemContainer;
