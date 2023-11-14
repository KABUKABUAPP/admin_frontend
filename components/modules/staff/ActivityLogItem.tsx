import React, { FC } from "react";
import moment from 'moment';

interface Props {
  description: string;
  createdAt: string;
}

const ActivityLogItem: FC<Props> = ({ description, createdAt }) => {
  return (
    <div className="flex justify-between max-sm:flex-col-reverse items-center max-sm:items-start gap-2 py-3 border-b border-b-[#9A9A9A]">
      <p className="text-base font-semibold">{description}</p>
      <p className="text-sm text-[#9A9A9A]">{moment(createdAt).fromNow()}</p>
    </div>
  );
};

export default ActivityLogItem;
