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
    penalty_amount: string;
    target: string;
    default_penalty_percentage: string;
}

const RepairLoanSettings: FC<Props> = ({penalty_amount, target, default_penalty_percentage}) => {
    const [showSaveChanges, setShowSaveChanges] = useState(false)

    const initialValues = {
        penalty_amount: penalty_amount,
        target: target,
        default_penalty_percentage: default_penalty_percentage
    };

    const [updateDriverSettings, { isLoading, isError, isSuccess, error }] =
    useUpdateDriverSettingsMutation();

    
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            const repairLoanSettingsData = {
                repair_loan_settings: {
                    daily_trips_target: {
                        penalty_amount: values.penalty_amount,
                        target: values.target
                    },
                    default_penalty_percentage: values.default_penalty_percentage
                }
            } 

            updateDriverSettings(repairLoanSettingsData)
        },
    });

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
          firstUpdate.current = false;
          return;
        }
    
        if (formik.values.penalty_amount.length > 0 && formik.values.target.length > 0 && formik.values.default_penalty_percentage.length > 0) setShowSaveChanges(true);
        if (formik.values.penalty_amount.length === 0 || formik.values.target.length === 0 || formik.values.default_penalty_percentage.length === 0) setShowSaveChanges(false)
    }, [formik.values])

    useEffect(() => {
        if (isSuccess) toast.success('Repair Loan Settings Updated Successfully')
    }, [isSuccess])

    useEffect(() => {
        if (isError) toast.error('Error While Updating Repair Loan Settings')
    }, [isError])

    return (
        <>
            <h1 className="text-3xl font-bold">Repair Loan Settings</h1>
            <p className="mt-2 text-[#9A9A9A]"><small>Configure repair loans</small></p>
            
            <FormikProvider value={formik}>
                <Form>
                    <>
                        <div className="flex flex-col gap-8 py-5">
                            <div className="flex justify-between gap-3 max-sm:flex-col">

                                <div className="w-full">
                                    <TextField
                                        label="Penalty Amount"
                                        placeholder="Penalty Amount"
                                        {...formik.getFieldProps("penalty_amount")}
                                        error={
                                            formik.touched.penalty_amount ? formik.errors.penalty_amount : undefined
                                        }
                                    />
                                    <div className="flex mt-2">
                                        <p><InfoIcon /></p> 
                                        <p className="ml-2 text-[#9A9A9A]"><small>Daily trips target penalty</small></p>
                                    </div>
                                    
                                </div>
                                <div className="w-full">
                                
                                    <TextField
                                        label="Daily Trips Target"
                                        placeholder="Daily Trips Target"
                                        {...formik.getFieldProps("target")}
                                        error={
                                            formik.touched.target ? formik.errors.target : undefined
                                        }
                                    />
                                    <div className="flex mt-2">
                                        <p><InfoIcon /></p> 
                                        <p className="ml-2 text-[#9A9A9A]"><small>Daily trips target for owing drivers</small></p>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="flex justify-between gap-3 max-sm:flex-col">
                                <div className="w-full">
                                    <TextField
                                        label="Default Penalty Percentage"
                                        placeholder="Default Penalty Percentage"
                                        {...formik.getFieldProps("default_penalty_percentage")}
                                        error={
                                            formik.touched.default_penalty_percentage ? formik.errors.default_penalty_percentage : undefined
                                        }
                                    />
                                    <div className="flex mt-2">
                                        <p><InfoIcon /></p> 
                                        <p className="ml-2 text-[#9A9A9A]"><small>Default penalty percentage for defaulters</small></p>
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

export default RepairLoanSettings;