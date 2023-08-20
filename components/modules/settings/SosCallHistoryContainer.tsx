import React, { FC } from "react";
import SosCallHistoryItem from "./SosCallHistoryItem";

interface Props {
  data: {
    date: string;
    time: string;
    duration: string;
  }[];
}

const SosCallHistoryContainer: FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 max-h-[600px] max-md:max-h-[1200px] overflow-auto scrollbar-none">
      {data.map((ch, idx) => {
        return <SosCallHistoryItem {...ch} key={idx} />;
      })}
    </div>
  );
};

export default SosCallHistoryContainer;
