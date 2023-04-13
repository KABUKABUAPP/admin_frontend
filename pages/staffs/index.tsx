import { NextPage } from "next";
import React from "react";

import AppLayout from "@/layouts/AppLayout";
import StaffTable from "@/components/modules/staff/StaffTable";

const Staffs: NextPage = () => {
  return (
    <AppLayout>
      <StaffTable data={mockData} />
    </AppLayout>
  );
};

export default Staffs;

const mockData = [
  {
    staffId: "12344",
    fullName: "John Doe",
    role: "Dispute Resolutor",
    location: "Lagos, Nigeria",
    status: "Active",
  },
  {
    staffId: "12344",
    fullName: "John Doe",
    role: "Dispute Resolutor",
    location: "Lagos, Nigeria",
    status: "Active",
  },
  {
    staffId: "12344",
    fullName: "John Doe",
    role: "Dispute Resolutor",
    location: "Lagos, Nigeria",
    status: "Active",
  },
  {
    staffId: "12344",
    fullName: "John Doe",
    role: "Dispute Resolutor",
    location: "Lagos, Nigeria",
    status: "Active",
  },
  {
    staffId: "12344",
    fullName: "John Doe",
    role: "Dispute Resolutor",
    location: "Lagos, Nigeria",
    status: "Active",
  },
  {
    staffId: "12344",
    fullName: "John Doe",
    role: "Dispute Resolutor",
    location: "Lagos, Nigeria",
    status: "Active",
  },
];
