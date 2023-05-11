import React, { FC } from "react";
import FormCard from "./FormCard";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";

const NewFareProfileForm: FC = () => {
  return (
    <div>
      <div className="flex max-md:flex-col gap-6">
        <FormCard maxWidth="400px" height="250px">
          <div className="flex flex-col gap-6">
            <TextField label="Country" placeholder="Nigeria" />
            <TextField label="State" placeholder="Oyo" />
          </div>
        </FormCard>

        <FormCard maxWidth="400px" height="250px">
          <p className="text-lg font-semibold pb-4">Driver Fee</p>
          <div className="flex flex-col gap-6">
            <TextField
              label="Monthly payment [per month]"
              placeholder="₦20,000"
            />
            <TextField
              label="Sharp payment [per month]"
              placeholder="₦20,000"
            />
          </div>
        </FormCard>
      </div>

      <div className="pt-8">
        <FormCard maxWidth="1000px">
          <p className="text-lg font-semibold pb-4">Normal Price</p>
          <div className="pt-4 flex max-md:flex-col gap-4">
            <div style={{ flex: 1 }} className="flex flex-col gap-6">
              <TextField label="Base Fare" placeholder="₦500" />
              <TextField label="Time [Per min]" placeholder="₦500" />
              <TextField label="Booking Fare" placeholder="₦500" />
              <TextField label="Surge Multiplier" placeholder="1" />
            </div>
            <div style={{ flex: 1 }} className="flex flex-col gap-6">
              <TextField label="Distance [per km]" placeholder="₦500" />
              <TextField label="LASG legy [%]" placeholder="3" />
              <TextField label="Waiting time [per min]" placeholder="₦100" />
            </div>
          </div>
        </FormCard>
      </div>
      <div className="flex justify-end py-8">
        <Button title="Create Profile" className="!px-10"/>
      </div>
    </div>
  );
};

export default NewFareProfileForm;
