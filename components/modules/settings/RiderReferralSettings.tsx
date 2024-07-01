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
    amount: string;
    percentage_split: string;
    status: string;
}

const RiderReferralSettings: FC<Props> = ({amount, percentage_split, status}) => {
    const [showSaveChanges, setShowSaveChanges] = useState(false)
    const [settingIsActive, setSettingIsActive] = useState(status);

    const initialValues = {
        amount: amount,
        percentage_split: percentage_split,
        status: status
    };

    const [updateDriverSettings, { isLoading, isError, isSuccess, error }] =
    useUpdateDriverSettingsMutation();

    
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            const riderSettingsData = {
                rider_referral_control: {
                    amount: values.amount,
                    percentage_split: values.percentage_split,
                    status: values.status
                }
            } 

            updateDriverSettings(riderSettingsData)
        },
    });

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
          firstUpdate.current = false;
          return;
        }
    
        if (formik.values.amount.length > 0 && formik.values.percentage_split.length > 0 && formik.values.status.length > 0) setShowSaveChanges(true);
        if (formik.values.amount.length === 0 || formik.values.percentage_split.length === 0 || formik.values.status.length === 0) setShowSaveChanges(false)
    }, [formik.values])

    useEffect(() => {
        if (isSuccess) toast.success('Referral Settings Updated Successfully')
    }, [isSuccess])

    useEffect(() => {
        if (isError) toast.error('Error While Updating Referral Settings')
    }, [isError])

    return (
        <>
            <h1 className="text-3xl font-bold">Rider Referral Settings</h1>
            <p className="mt-2 text-[#9A9A9A]"><small>Configure rider referrals</small></p>
            
            <FormikProvider value={formik}>
                <Form>
                    <>
                        <div className="flex flex-col gap-8 py-5">
                            <div className="flex justify-between gap-3 max-sm:flex-col">

                                <div className="w-full">
                                    <TextField
                                        label="Amount"
                                        placeholder="Amount"
                                        {...formik.getFieldProps("amount")}
                                        error={
                                        formik.touched.amount ? formik.errors.amount : undefined
                                        }
                                    />
                                    <div className="flex mt-2">
                                        <p><InfoIcon /></p> 
                                        <p className="ml-2 text-[#9A9A9A]"><small>Amount per referral</small></p>
                                    </div>
                                    
                                </div>
                                <div className="w-full">
                                
                                    <TextField
                                        label="Percentage Split"
                                        placeholder="Percentage Split"
                                        {...formik.getFieldProps("percentage_split")}
                                        error={
                                        formik.touched.percentage_split ? formik.errors.percentage_split : undefined
                                        }
                                    />
                                    <div className="flex mt-2">
                                        <p><InfoIcon /></p> 
                                        <p className="ml-2 text-[#9A9A9A]"><small>How will the percentage be splitted</small></p>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="flex justify-between gap-3 max-sm:flex-col">
                                <div className="flex flex-col w-full">
                                    <div className="w-full flex items-center justify-start gap-3">
                                        <span>Active</span> 
                                        <Switch 
                                            checked={settingIsActive === 'active' ? true : false} 
                                            {...formik.getFieldProps("status")}
                                            onChange={(e) => {
                                                const newVal = settingIsActive === 'active' ? 'inactive' : 'active';
                                                setSettingIsActive(newVal)
                                                formik.setFieldValue('status', newVal);
                                            }}
                                        />
                                    </div>
                                    <div className="flex mt-2">
                                        <p><InfoIcon /></p> 
                                        <p className="ml-2 text-[#9A9A9A]"><small>Activate/deactivate rider referral settings</small></p>
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

export default RiderReferralSettings;