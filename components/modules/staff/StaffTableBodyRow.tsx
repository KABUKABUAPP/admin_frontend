import React, { FC, useState, useEffect } from "react";

import { StaffsTableData } from "@/models/Staffs";
import Link from "next/link";
import { useRouter } from "next/router";
import { capitalizeAllFirstLetters } from "@/utils";
import { useGetNigerianCityByStateQuery, useGetNigerianStatesQuery } from "@/api-services/geoLocationService";

interface Props {
  data: any;
  currentPage: any;
}

const StaffTableBodyRow: FC<Props> = ({
  data: { staffId, fullName, role, location, status, id, street, city, state },
  currentPage
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/staffs/${id}?current_page=${currentPage}`)}
      className="flex p-3 py-5 gap-6 border-b border-b[#E6E6E6] cursor-pointer"
    >
      <div style={{ flex: 1 }} className="flex items-center">
        <Link href={`/staffs/${id}`}>
          <p className="text-xs font-bold cursor-pointer">{staffId}</p>
        </Link>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(fullName)}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(role)}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{capitalizeAllFirstLetters(location)}</p>
      </div>

      <div style={{ flex: 1 }} className="flex items-center">
        <p className="text-xs font-bold">{status}</p>
      </div>
    </div>
  );
};

export default StaffTableBodyRow;
