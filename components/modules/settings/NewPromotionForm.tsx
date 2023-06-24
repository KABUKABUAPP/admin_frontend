import React, { FC, useState, useEffect } from "react";

import { useFormik, Form, FormikProvider } from "formik";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import ChevronLeft from "@/components/icons/ChevronLeft";
import SelectField from "@/components/ui/Input/SelectField";
import {
  AutomaticPromotionValidationSchema,
  ManualPromotionValidationSchema,
} from "@/validationschemas/CreatePromotionValidationSchema";

const initialValues = {
  name: "",
  audience: "",
  promo_type: "manual",
  amount_type: "",
  value: "",
  cap: "",
  total_quantity: "",
  start_date: "",
  end_date: "",
  condition: "",
  count: "",
};

interface Props {
  handleBack: () => void;
}

const NewPromotionForm: FC<Props> = ({ handleBack }) => {
  const [isManualPromo, setIsManualPromo] = useState<boolean>(true);

  const promoAudienceOptions = [
    { label: "Riders", value: "rider" },
    { label: "Drivers", value: "driver" },
  ];

  const promoTypeOptions = [
    { label: "Automatic", value: "automatic" },
    { label: "Manual", value: "manual" },
  ];

  const conditionOptions = [
    { label: "Ride is equals to", value: "Ride is equals to" },
    { label: "5 star rating is equal to", value: "rider_ratings" },
  ];

  const formik = useFormik({
    initialValues,
    validationSchema: isManualPromo
      ? ManualPromotionValidationSchema
      : AutomaticPromotionValidationSchema,
    onSubmit: (values) => {},
  });

  useEffect(() => {
    if (formik.values.promo_type === "manual") {
      setIsManualPromo(true);
    } else if (formik.values.promo_type === "automatic") {
      setIsManualPromo(false);
    }
  }, [formik.values.promo_type]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className="relative">
          <span className="absolute top-7 left-0">
            <Button
              onClick={handleBack}
              title="Back"
              variant="text"
              startIcon={<ChevronLeft />}
            />
          </span>
          <p className="text-lg text-center font-medium py-6">New Promotion</p>
          <div className="w-full flex flex-col gap-6 mt-4">
            <div className="flex max-sm:flex-col gap-6">
              <div style={{ flex: 1 }}>
                <TextField label="Promo Name" />
              </div>
              <div style={{ flex: 1 }}>
                <SelectField
                  label="Promo Audience"
                  options={promoAudienceOptions}
                />
              </div>
            </div>
            <div className="flex max-sm:flex-col gap-6">
              <div style={{ flex: 1 }}>
                <SelectField label="Promo Type" options={promoTypeOptions} />
              </div>
              <div style={{ flex: 1 }}>
                <SelectField label="Condition" options={conditionOptions} />
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
      </Form>
    </FormikProvider>
  );
};

export default NewPromotionForm;
