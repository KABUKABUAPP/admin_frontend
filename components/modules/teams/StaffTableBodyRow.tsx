import React, { FC } from "react";

import { StaffsTableData } from "@/models/Staffs";
import Link from "next/link";
import { useRouter } from "next/router";
import { capitalizeAllFirstLetters } from "@/utils";
import moment from "moment";

interface Props {
  data: any;
}

const StaffTableBodyRow: FC<Props> = ({
  data: { teamId, teamName, totalMembers, audience, users_onboarded, created, id },
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/staffs/teams/${id}`)}
      className="flex p-3 py-5 gap-6 border-b border-b[#E6E6E6] cursor-pointer"
    >
      <div style={{ flex: 1 }} className="flex items-center">
        <Link href={`/staffs/teams/${id}`}>
          <p className="text-xs font-bold cursor-pointer">{teamId}</p>
        </Link>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(teamName)}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{totalMembers}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(audience)}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{users_onboarded}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{moment(created).format('DD, MMMM YYYY')}</p>
      </div>

    </div>
  );
};

export default StaffTableBodyRow;
