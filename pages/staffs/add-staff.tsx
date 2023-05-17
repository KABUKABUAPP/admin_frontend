import React, { FC } from "react";

import AppLayout from "@/layouts/AppLayout";
import AddStaffLayout from "@/components/modules/staff/AddStaffLayout";
import ActionBar from "@/components/common/ActionBar";
import AddStaffForm from "@/components/modules/staff/AddStaffForm";

const AddStaff: FC = () => {
  return (
    <AppLayout padding="0">
      <div className="lg:h-screen lg:overflow-hidden p-4">
        <ActionBar backButtonText="Cancel" />

        <AddStaffLayout>
            <AddStaffForm />
        </AddStaffLayout>
      </div>
    </AppLayout>
  );
};

export default AddStaff;
