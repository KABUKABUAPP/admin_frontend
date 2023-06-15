import React, { FC } from "react";

import { useFormik, Form, FormikProvider } from "formik";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import ChevronLeft from "@/components/icons/ChevronLeft";

interface Props {
    handleBack: ()=>void
}

const NewPromotionForm: FC<Props> = ({ handleBack }) => {
  return (
    <div className="relative">
      <span className="absolute top-7 left-0">
        <Button onClick={handleBack} title="Back" variant="text" startIcon={<ChevronLeft />} />
      </span>
      <p className="text-lg text-center font-medium py-6">New Promotion</p>
      <div className="w-full flex flex-col gap-6 mt-4">
        <div className="flex max-sm:flex-col gap-6">
          <div style={{ flex: 1 }}>
            <TextField label="Promo Name" />
          </div>
          <div style={{ flex: 1 }}>
            <TextField label="Promo Audience" />
          </div>
        </div>
        <div className="flex max-sm:flex-col gap-6">
          <div style={{ flex: 1 }}>
            <TextField label="Promo Type" />
          </div>
          <div style={{ flex: 1 }}>
            <TextField label="Condition" />
          </div>
        </div>
        <div className="flex max-sm:flex-col gap-6">
          <div style={{ flex: 1 }}>
            <TextField label="Count" />
          </div>
          <div style={{ flex: 1 }}>
            <TextField label="Percent [%]" />
          </div>
        </div>
        <div className="flex max-sm:flex-col gap-6">
          <div style={{ flex: 1 }}>
            <TextField label="Start Date" type="date" />
          </div>
          <div style={{ flex: 1 }}>
            <TextField label="End Date" type="date" />
          </div>
        </div>
      </div>
      <div className="flex justify-end my-6">
        <Button title="Create Promotion" size="large" />
      </div>
    </div>
  );
};

export default NewPromotionForm;
