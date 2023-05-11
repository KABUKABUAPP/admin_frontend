import React, { FC } from "react";

import { StaffsTableData } from "@/models/Staffs";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  data: StaffsTableData;
}

const StaffTableBodyRow: FC<Props> = ({
  data: { staffId, fullName, role, location, status },
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/staffs/${staffId}`)}
      className="flex p-3 py-5 gap-6 border-b border-b[#E6E6E6]"
    >
      <div style={{ flex: 1 }} className="flex items-center">
        <Link href={`/staffs/${staffId}`}>
          <p className="text-xs font-bold cursor-pointer">{staffId}</p>
        </Link>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{fullName}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{role}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{location}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{status}</p>
      </div>
    </div>
  );
};

export default StaffTableBodyRow;
