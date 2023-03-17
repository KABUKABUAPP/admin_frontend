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
    <div className="max-w-[380px] w-full max-sm:max-w-[250px]">
      <PendingApplicationHeader title={title} />
      <PendingApplicationItemContainer data={data} />
    </div>
  );
};

export default PendingApplicationContainer;
