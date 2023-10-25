import React, { FC } from "react";

import Card from "@/components/common/Card";
import DropDown from "@/components/ui/DropDown";
import ActivityLogItem from "./ActivityLogItem";

interface Props {
  logs?: { date: string; title: string }[];
}

const ActivityLogCard: FC<Props> = ({ logs }) => {
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
        {logs?.map((log, idx) => (
          <ActivityLogItem {...log} key={idx} />
        ))}
      </div>
    </Card>
  );
};

export default ActivityLogCard;
