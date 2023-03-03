import { PendingApplication } from "@/models/PendingApplication";
import React, { FC } from "react";

import PendingApplicationHeader from "./PendingApplicationHeader";
import PendingApplicationItemContainer from "./PendingApplicationItemContainer";

interface Props {
  title: string;
  data: PendingApplication[];
}

const PendingApplicationContainer: FC<Props> = ({ title, data }) => {
  return (
    <div className="max-w-[280px] w-full">
      <PendingApplicationHeader title={title} />
      <PendingApplicationItemContainer data={data} />
    </div>
  );
};

export default PendingApplicationContainer;
