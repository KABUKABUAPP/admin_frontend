import React, { FC } from "react";

import PendingApplicationItem from "./PendingApplicationItem";

import { PendingApplication } from "@/models/PendingApplication";
import Button from "@/components/ui/Button/Button";

interface Props {
  data: PendingApplication[];
}

const PendingApplicationItemContainer: FC<Props> = ({ data }) => {
  return (
    <div className="w-full bg-[#FDFDFD] p-3">
      <div className="max-h-[200px] overflow-y-auto scrollbar-none
      ">
        {data.map((item, idx) => {
          return <PendingApplicationItem {...item} key={idx} />;
        })}
      </div>
      {<div className="border-t-[#E6E6E6] border-t p-2 pt-4">
        <Button
          variant="text"
          title="View All"
          size="small"
          className="mx-auto"
        />
      </div>}
    </div>
  );
};

export default PendingApplicationItemContainer;
