import React, { FC, useState, useEffect } from "react";

import { useFormik, Form, FormikProvider } from "formik";
import TextField from "@/components/ui/Input/TextField/TextField";
import Button from "@/components/ui/Button/Button";
import ChevronLeft from "@/components/icons/ChevronLeft";
import SelectField from "@/components/ui/Input/SelectField";
import {
  RewardPromotionValidationSchema,
} from "@/validationschemas/CreatePromotionValidationSchema";
import { useCreateGeneralPromoMutation } from "@/api-services/settingsService";
import { toast } from "react-toastify";
import { verifyIsDigit } from "@/utils";

const initialValues = {
    name: "",
    audience: "",
    description: "",
    reward_type: "",
    value: "",
    condition_value: "",
    reset_type: "",
    start_date: "",
    end_date: ""
} 

interface Props {
  handleBack: () => void;
}

const RewardPromoForm: FC<Props> = ({ handleBack }) => {
    const [createGeneralPromo, generalPromo] =
      useCreateGeneralPromoMutation();
      
    const promoAudienceOptions = [
        { label: "Drivers", value: "driver" }
    ];

    const conditionOptions = [
        { label: "Ride is equals to", value: "number_of_trips" },
        { label: "5 star rating is equal to", value: "rider_ratings" },
        { label: "Welcome Bonus", value: "new_users" },
    ];

    const rewardTypeOptions = [
        { label: "Cash", value: "cash" },
        { label: "Gift", value: "gift" },
    ];

    const resetOptions = [
        { label: "Monthly", value: "monthly" },
        { label: "Weekly", value: "weekly" },
        { label: "Daily", value: "daily" }
    ];

    const formik = useFormik({
        initialValues,
        validationSchema: RewardPromotionValidationSchema,
        onSubmit: (values) => {
            createGeneralPromo(values);
        },
    });

    useEffect(() => {
        if (generalPromo.isSuccess) {
        toast.success("Promo successfully created");
        handleBack();
        }
    }, [generalPromo.isSuccess]);

    useEffect(() => {
        if (generalPromo.isError) {
        const { message }: any = generalPromo.error;
        console.log(message)
        toast.error('Error encountered');
        }
    }, [generalPromo.error]);

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
            <p className="text-lg text-center font-medium py-6">New Reward Promotion</p>
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
                <TextField
                label="Description"
                {...formik.getFieldProps("description")}
                error={formik.touched.description ? formik.errors.description : undefined}
                />
                <SelectField
                label="Reward Type"
                options={rewardTypeOptions}
                {...formik.getFieldProps("reward_type")}
                error={
                    formik.touched.reward_type ? formik.errors.reward_type : undefined
                }
                />
                <TextField
                label="Value"
                {...formik.getFieldProps("count")}
                error={formik.touched.value ? formik.errors.value : undefined}
                onChange={(e) => {
                    if (verifyIsDigit(e.target.value)) {
                    formik.setFieldValue("value", e.target.value);
                    }
                }}
                />
                <TextField
                label="Condition Value"
                {...formik.getFieldProps("condition_value")}
                error={
                    formik.touched.condition_value
                    ? formik.errors.condition_value
                    : undefined
                }
                />
                <SelectField
                label="Reset Type"
                {...formik.getFieldProps("reset_type")}
                options={resetOptions}
                error={
                    formik.touched.reset_type
                    ? formik.errors.reset_type
                    : undefined
                }
                />
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
                disabled={generalPromo.isLoading}
                loading={generalPromo.isLoading}
                />
            </div>
            </div>
        </Form>
        </FormikProvider>
    )

}

export default RewardPromoForm