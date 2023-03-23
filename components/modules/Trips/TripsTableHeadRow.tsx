import React, { FC } from "react";

const headCellData = [
  { title: "ID", flex: 1 },
  { title: "Origin/Destination", flex: 2 },
  { title: "Rider", flex: 1 },
  { title: "Driver", flex: 1 },
  { title: "Car", flex: 1 },
  { title: "Status", flex: 1 },
];

const TripsTableHeadRow: FC = () => {
  return (
    <div className="flex w-full gap-6">
      {headCellData.map(({ title, flex }, idx) => {
        return (
          <p className={`font-bold text-sm`} style={{flex: flex}} key={idx}>
            {title}
          </p>
        );
      })}
    </div>
  );
};

export default TripsTableHeadRow;
