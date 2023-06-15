import Avatar from "@/components/common/Avatar";
import React, { FC } from "react";

const Subscriber: FC = () => {
  return (
    <div className="flex items-center gap-2">
      <Avatar fallBack="J" shape="round" />
      <p className="text-sm font-semibold">John Doe</p>
    </div>
  );
};

export default Subscriber;
