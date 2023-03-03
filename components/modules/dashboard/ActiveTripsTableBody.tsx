import React, { FC } from "react";
import { Trip } from "@/models/Trips";
import ActiveTripsTableRow from "./ActiveTripsTableRow";

interface Props {
  data: Trip[];
}

const ActiveTripsTableBody: FC<Props> = ({ data }) => {
  return (
    <div
      className="w-full overflow-x-auto p-2  bg-[#FDFDFD] 
  scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
  scrollbar-thumb-gray-900 scrollbar-track-gray-300
  "
    >
      {data.map((item, idx) => {
        return <ActiveTripsTableRow {...item} key={idx} />;
      })}
    </div>
  );
};

export default ActiveTripsTableBody;
