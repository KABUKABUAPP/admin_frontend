import React, { FC, ReactNode } from "react";

import SummaryCard from "./SummaryCard";

interface Props {
  data: {
    title: string;
    value: string | number;
    icon: ReactNode;
    iconBg?: string;
  }[];
}

const SummaryCardContainer: FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-wrap gap-6 max-sm:justify-center">
      {data.map((item, idx) => {
        return <SummaryCard {...item} key={idx} />;
      })}
    </div>
  );
};

export default SummaryCardContainer;
