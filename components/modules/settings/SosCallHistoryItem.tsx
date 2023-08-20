import CalendarIcon from "@/components/icons/CalendarIcon";
import ClockAltIcon from "@/components/icons/ClockAltIcon";
import React, { FC } from "react";

interface Props {
  date: string;
  time: string;
  duration: string;
}

const SosCallHistoryItem: FC<Props> = ({
  date,
  duration,
  time,
}) => {
  return (
    <div className="bg-[#F1F1F1] rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Incoming Call</h3>
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <p className="flex items-center gap-1">
            <CalendarIcon />
            {date}
          </p>
          <p className="flex items-center gap-1">
            <ClockAltIcon />
            {time}
          </p>
        </div>
        <p>{!duration ? "unanswered" : duration}</p>
      </div>
    </div>
  );
};

export default SosCallHistoryItem;
