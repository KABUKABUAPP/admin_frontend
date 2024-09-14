import React, { FC, useEffect, useState, useRef, useLayoutEffect } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/Input/TextField/TextField";
import InfoIcon from "@/components/icons/InfoIcon";
import SelectField from "@/components/ui/Input/SelectField";
import { useUpdateDriverSettingsMutation } from "@/api-services/settingsService";
import { toast } from "react-toastify";
import Switch from "react-switch";

interface Props {
    hire_purchase_amount: number;
    rental_amount: number;
}

const SharpProgramSettings: FC<Props> = ({hire_purchase_amount, rental_amount}) => {
    const [showSaveChanges, setShowSaveChanges] = useState(false)

    const initialValues = {
        hire_purchase_amount: hire_purchase_amount,
        rental_amount: rental_amount
    };


    const [updateDriverSettings, { isLoading, isError, isSuccess, error }] =
    useUpdateDriverSettingsMutation();

    
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            const driversSettingsData = {
                sharp_program: {
                    hire_purchase_amount: values.hire_purchase_amount,
                    rental_amount: values.rental_amount
                }
            } 

            updateDriverSettings(driversSettingsData)
        },
    });

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
          firstUpdate.current = false;
          return;
        }
    
        if (formik.values.hire_purchase_amount && formik.values.rental_amount) setShowSaveChanges(true);
        if (!formik.values.hire_purchase_amount || !formik.values.rental_amount) setShowSaveChanges(false)
    }, [formik.values])

    useEffect(() => {
        if (isSuccess) toast.success('Sharp Program Settings Updated Successfully')
    }, [isSuccess])

    useEffect(() => {
        if (isError) toast.error('Error While Updating Signup Bonus Settings')
    }, [isError])

    return (
        <>
            <h1 className="text-3xl font-bold">Sharp program Settings</h1>
            <p className="mt-2 text-[#9A9A9A]"><small>Configure sharp program settings</small></p>
            
            <FormikProvider value={formik}>
                <Form>
                    <>
                        <div className="flex flex-col gap-8 py-5">
                            <div className="flex justify-between gap-3 max-sm:flex-col">

                                <div className="w-full">
                                    <TextField
                                        label="Hire Purchase Amount"
                                        placeholder="Hire Purchase Amount"
                                        {...formik.getFieldProps("hire_purchase_amount")}
                                        error={
                                        formik.touched.hire_purchase_amount ? formik.errors.hire_purchase_amount : undefined
                                        }
                                    />
                                    <div className="flex mt-2">
                                        <p><InfoIcon /></p> 
                                        <p className="ml-2 text-[#9A9A9A]"><small>Hire Purchase Amount</small></p>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <TextField
                                        label="Rental Amount"
                                        placeholder="Rental Amount"
                                        {...formik.getFieldProps("rental_amount")}
                                        error={
                                            formik.touched.rental_amount ? formik.errors.rental_amount : undefined
                                        }
                                    />
                                    <div className="flex mt-2">
                                        <p><InfoIcon /></p> 
                                        <p className="ml-2 text-[#9A9A9A]"><small>Rental Amount</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {
                            showSaveChanges &&
                            <div className="p-4 flex justify-end">
                                <Button
                                    title="Save Changes"
                                    className="!text-[16px] mt-6"
                                    size="large"
                                    type="submit"
                                    loading={isLoading}
                                    disabled={isLoading}
                                    onClick={() => {
                                    if (formik.isValid) formik.submitForm();
                                    }}
                                />
                            </div>
                        }
                    </>
                </Form>
            </FormikProvider>

        </>
    )
}

export default SharpProgramSettings;