import Button from "@/components/ui/Button/Button";
import React, { FC } from "react";

interface Props {
  data: {
    id: string;
    title: string;
    roleCount: number;
  };
  handleClick?: (id: string) => void;
}

const RoleItem: FC<Props> = ({
  data: { id, title, roleCount },
  handleClick,
}) => {
  return (
    <div
      onClick={() => {
        if (handleClick) handleClick(id);
      }}
      className="p-4 bg-[#F8F8F8] flex justify-between items-center rounded-lg"
    >
      <div>
        <p className="text-xl font-medium">{title}</p>
        <p className="text-sm font-medium">{roleCount} Permissions</p>
      </div>
      <div>
        <Button title="View" variant="text" />
      </div>
    </div>
  );
};

export default RoleItem;
