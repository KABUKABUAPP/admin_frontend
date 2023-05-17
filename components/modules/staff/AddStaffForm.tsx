import React, { FC } from "react";

import Card from "@/components/common/Card";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";

const AddStaffForm: FC = () => {
  return (
    <>
      <p className="text-2xl font-semibold pb-4">Add New Staff</p>
      <Card>
        <div className="flex flex-col gap-8 py-5">
          <TextField label="First name" placeholder="Name here" />
          <TextField label="Last name" placeholder="Name here" />
          <TextField label="Role" placeholder="Admin" />
          <TextField label="Address" placeholder="House Address here" />
          <div className="flex justify-between gap-3 max-sm:flex-col">
            <TextField
              label="City"
              placeholder="City here"
              className="w-full"
            />
            <TextField
              label="State"
              placeholder="Lagos State"
              className="w-full"
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button title="Add Staff" className="!text-[16px] mt-6" size="large" />
      </div>
    </>
  );
};

export default AddStaffForm;
