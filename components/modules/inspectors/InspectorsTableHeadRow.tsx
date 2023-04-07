import React, { FC } from "react";

interface Props {
  headCellData: { title: string; flex: number }[];
}

const InspectorsTableHeadRow: FC<Props> = ({ headCellData }) => {
  return (
    <div className="flex w-full gap-6">
      {headCellData.map(({ title, flex }, idx) => {
        return (
          <p className={`font-bold text-sm`} style={{ flex: flex }} key={idx}>
            {title}
          </p>
        );
      })}
    </div>
  );
};

export default InspectorsTableHeadRow;
