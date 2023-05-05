import React, { FC } from "react";

interface Props {
  title?: string;
  body?: string;
}

const FareDetailCardItem: FC<Props> = ({ title, body }) => {
  return (
    <div className="flex flex-col gap-4 border-b border-b-[#E6E6E6] last:border-none py-4">
      {title && <p className="text-sm text-[#000000] font-semibold">{title}</p>}
      {body && <p className="text-lg font-bold">{body}</p>}
    </div>
  );
};

export default FareDetailCardItem;
