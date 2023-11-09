import React, { FC } from "react";

import Card from "@/components/common/Card";
import DropDown from "@/components/ui/DropDown";
import ActivityLogItem from "./ActivityLogItem";

interface Props {
  logs?: { date: string; title: string }[];
}

const ActivityLogCard: FC<Props> = ({ logs }) => {
  console.log('logger', logs)
  return (
    <Card maxHeight="500px">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Activity logs</p>
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold">Show: </p>
          <DropDown placeholder="Today"/>
        </div>
      </div>

      <div className="pt-4 flex flex-col gap-2">
        {logs && logs?.length > 0 && logs?.map((log, idx) => (
          <ActivityLogItem {...log} key={idx} />
        ))}

        {
          logs?.length === 0 && 
          <p className="text-center">Staff has not performed any activity</p>
        }
      </div>
    </Card>
  );
};

export default ActivityLogCard;
