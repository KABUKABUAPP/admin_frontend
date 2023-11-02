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
import { useCreateAutomaticPromoMutation } from "@/api-services/settingsService";
import { useCreateManualPromoMutation } from "@/api-services/settingsService";
import { toast } from "react-toastify";
import { verifyIsDigit } from "@/utils";

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
  const [createManualPromo, manualPromo] = useCreateManualPromoMutation();
  const [createAutomaticPromo, automaticPromo] =
    useCreateAutomaticPromoMutation();

  useEffect(() => {
    if (manualPromo.isSuccess) {
      toast.success("Promo successfully created");
      handleBack();
    }
  }, [manualPromo.isSuccess]);

  useEffect(() => {
    if (manualPromo.error && "data" in manualPromo.error) {
      const { message }: any = manualPromo.error;
      toast.error(message);
    }
  }, [manualPromo.error]);

  useEffect(() => {
    if (automaticPromo.isSuccess) {
      toast.success("Promo successfully created");
      handleBack();
    }
  }, [automaticPromo.isSuccess]);

  useEffect(() => {
    if (automaticPromo.error && "data" in automaticPromo.error) {
      const { message }: any = automaticPromo.error;
      toast.error(message);
    }
  }, [automaticPromo.error]);

  const promoAudienceOptions = [
    { label: "Riders", value: "rider" },
    //{ label: "Drivers", value: "driver" },
  ];

  const promoTypeOptions = [
    { label: "Automatic", value: "automatic" },
    { label: "Manual", value: "manual" },
  ];

  const conditionOptions = [
    { label: "Ride is equals to", value: "number_of_trips" },
    { label: "5 star rating is equal to", value: "rider_ratings" },
    { label: "Welcome Bonus", value: "new_users" },
  ];

  const amountTypeOptions = [
    { label: "Percentage", value: "percentage" },
    { label: "Fixed", value: "fixed" },
  ];

  const formik = useFormik({
    initialValues,
    validationSchema: isManualPromo
      ? ManualPromotionValidationSchema
      : AutomaticPromotionValidationSchema,
    onSubmit: (values) => {
      if (isManualPromo) {
        const payload = getManualPromoPayload(values);
        createManualPromo({
          ...payload,
          cap: Number(payload.cap),
          value: Number(payload.value),
          total_quantity: Number(payload.total_quantity),
        });
      } else {
        const payload = getAutomaticPromoPayload(values);
        createAutomaticPromo({
          ...payload,
          count: Number(payload.count),
          value: Number(payload.value),
          cap: Number(payload.cap),
        });
      }
    },
  });

  const getManualPromoPayload = (values: typeof initialValues) => {
    const payload = {
      name: values.name,
      audience: values.audience,
      promo_type: values.promo_type,
      amount_type: values.amount_type,
      value: values.value,
      cap: values.cap,
      start_date: values.start_date,
      end_date: values.end_date,
      total_quantity: values.total_quantity,
    };

    return payload;
  };

  const getAutomaticPromoPayload = (values: typeof initialValues) => {
    const payload = {
      name: values.name,
      audience: values.audience,
      promo_type: values.promo_type,
      amount_type: values.amount_type,
      value: values.value,
      cap: values.cap,
      start_date: values.start_date,
      end_date: values.end_date,
      condition: values.condition,
      count: values.count,
    };

    return payload;
  };

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
          <div className="w-full grid grid-cols-2 gap-6 mt-4 max-sm:grid-cols-1">
            <TextField
              label="Promo Name"
              {...formik.getFieldProps("name")}
              error={formik.touched.name ? formik.errors.name : undefined}
            />
            <SelectField
              label="Promo Audience"
              options={promoAudienceOptions}
              {...formik.getFieldProps("audience")}
              error={
                formik.touched.audience ? formik.errors.audience : undefined
              }
            />
            <SelectField
              label="Promo Type"
              options={promoTypeOptions}
              {...formik.getFieldProps("promo_type")}
              error={
                formik.touched.promo_type ? formik.errors.promo_type : undefined
              }
            />
            {!isManualPromo && (
              <SelectField
                label="Condition"
                options={conditionOptions}
                {...formik.getFieldProps("condition")}
                error={
                  formik.touched.condition ? formik.errors.condition : undefined
                }
              />
            )}
            {!isManualPromo && (
              <TextField
                label="Count"
                {...formik.getFieldProps("count")}
                error={formik.touched.count ? formik.errors.count : undefined}
                onChange={(e) => {
                  if (verifyIsDigit(e.target.value)) {
                    formik.setFieldValue("count", e.target.value);
                  }
                }}
              />
            )}
            <SelectField
              label="Amount Type"
              {...formik.getFieldProps("amount_type")}
              options={amountTypeOptions}
              error={
                formik.touched.amount_type
                  ? formik.errors.amount_type
                  : undefined
              }
            />
            <TextField
              label="Value"
              {...formik.getFieldProps("value")}
              error={formik.touched.value ? formik.errors.value : undefined}
              onChange={(e) => {
                if (verifyIsDigit(e.target.value)) {
                  formik.setFieldValue("value", e.target.value);
                }
              }}
            />
            <TextField
              label="Total users to use the code"
              {...formik.getFieldProps("cap")}
              error={formik.touched.cap ? formik.errors.cap : undefined}
              onChange={(e) => {
                if (verifyIsDigit(e.target.value)) {
                  formik.setFieldValue("cap", e.target.value);
                }
              }}
            />
            {isManualPromo && (
              <TextField
                label="How many times can a user use the code"
                {...formik.getFieldProps("total_quantity")}
                error={
                  formik.touched.total_quantity
                    ? formik.errors.total_quantity
                    : undefined
                }
                onChange={(e) => {
                  if (verifyIsDigit(e.target.value)) {
                    formik.setFieldValue("total_quantity", e.target.value);
                  }
                }}
              />
            )}
            <TextField
              label="Start Date"
              type="date"
              {...formik.getFieldProps("start_date")}
              error={
                formik.touched.start_date ? formik.errors.start_date : undefined
              }
            />
            <TextField
              label="End Date"
              type="date"
              {...formik.getFieldProps("end_date")}
              error={
                formik.touched.end_date ? formik.errors.end_date : undefined
              }
            />
          </div>
          <div className="flex justify-end my-6">
            <Button
              title="Create Promotion"
              size="large"
              type="submit"
              disabled={manualPromo.isLoading || automaticPromo.isLoading}
              loading={manualPromo.isLoading || automaticPromo.isLoading}
            />
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default NewPromotionForm;
