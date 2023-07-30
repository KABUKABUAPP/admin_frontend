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
    <div className="flex flex-col gap-4 max-h-[300px] max-md:max-h-[800px] overflow-auto scrollbar-none">
      {data.map((ch, idx) => {
        return <SosCallHistoryItem {...ch} key={idx} />;
      })}
    </div>
  );
};

export default SosCallHistoryContainer;
