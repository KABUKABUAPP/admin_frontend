import React, { FC } from "react";

interface Props {
  firstRow?: React.ReactNode;
  secondRow?: React.ReactNode;
}

const ViewRiderLayout: FC<Props> = ({ firstRow, secondRow }) => {
  return (
    <div className="lg:h-[calc(100vh-100px)] lg:overflow-y-scroll pt-10 pb-10 scrollbar-none w-full max-w-[800px]">
      <div className="flex gap-6 max-md:flex-col">
        <div style={{ flex: 1 }} className="flex flex-col gap-4">
          {firstRow}
        </div>
        <div style={{ flex: 1 }}>{secondRow}</div>
      </div>
    </div>
  );
};

export default ViewRiderLayout;
