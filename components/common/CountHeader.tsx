import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

interface Props {
  title?: string;
  count?: number;
}

const CountHeader: FC<Props> = ({ title, count }) => {
  return (
    <div className="font-bold mb-3">
      {title && count ? (
        <p className="text-lg">
          {title} {`[${count}]`}
        </p>
      ) : (
        <Skeleton style={{width: '50px'}}/>
      )}
    </div>
  );
};

export default CountHeader;
