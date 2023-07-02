import Button from "@/components/ui/Button/Button";
import React, { FC } from "react";

import ActiveTripsTableCell from "./ActiveTripsTableCell";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  from?: string;
  to?: string;
  rider?: string;
  driver?: string;
  id?: string;
}

const ActiveTripsTableRow: FC<Props> = ({ id, ...props }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/trips/${id}`)}
      className="w-full min-w-[600px] border-b-[#E6E6E6] border-b last:border-none p-3 flex justify-between gap-2 cursor-pointer"
    >
      {Object.entries(props).map(([title, body], idx) => {
        return <ActiveTripsTableCell key={idx} title={title} body={body} />;
      })}
      <div className="flex items-center">
        <Button
          title="View Trip"
          size="small"
          variant="contained"
          color="tetiary"
          onClick={() => {
            router.push(`/trips/${id}`);
          }}
        />
      </div>
    </div>
  );
};

export default ActiveTripsTableRow;
