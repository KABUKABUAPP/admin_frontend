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
    frequency: string;
    amount: string;
    type: string;
    is_active: boolean;
}

const DriverReferralSettings: FC<Props> = ({frequency, amount, type, is_active}) => {
    const [showSaveChanges, setShowSaveChanges] = useState(false)
    const [settingIsActive, setSettingIsActive] = useState(is_active);

    const initialValues = {
        no_of_trips: frequency,
        amount_per_referral: amount,
        type,
        is_active
    };

    const rewardType = [
        {
            label: 'REFERRAL REWARD TYPE ONBOARD RIDERS',
            value: 'REFERRAL_REWARD_TYPE_ONBOARD_RIDERS'
        },
        {
            label: 'REFERRAL REWARD TYPE ONBOARD DRIVERS',
            value: 'REFERRAL_REWARD_TYPE_ONBOARD_DRIVERS'
        },
        {
            label: 'REFERRAL REWARD FOR DRIVERS BASED ON TRIPS BY OTHER DRIVERS',
            value: 'REFERRAL_REWARD_FOR_DRIVERS_BASED_ON_TRIPS_BY_OTHER_DRIVERS'
        }
    ]


    const [updateDriverSettings, { isLoading, isError, isSuccess, error }] =
    useUpdateDriverSettingsMutation();

    
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            const driversSettingsData = {
                referral_reward: {
                    type: values.type,
                    amount: values.amount_per_referral,
                    frequency: values.no_of_trips,
                    is_active: values.is_active ? 'yes' : 'no'
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
    
        if (formik.values.no_of_trips.length > 0 && formik.values.amount_per_referral.length > 0 && (formik.values.is_active || !formik.values.is_active) && formik.values.type.length > 0) setShowSaveChanges(true);
        if (formik.values.no_of_trips.length === 0 || formik.values.amount_per_referral.length === 0) setShowSaveChanges(false)
    }, [formik.values])

    useEffect(() => {
        if (isSuccess) toast.success('Referral Settings Updated Successfully')
    }, [isSuccess])

    useEffect(() => {
        if (isError) toast.error('Error While Updating Referral Settings')
    }, [isError])

    return (
        <>
            <h1 className="text-3xl font-bold">Driver Referral Settings</h1>
            <p className="mt-2 text-[#9A9A9A]"><small>Configure driver referrals</small></p>
            
            <FormikProvider value={formik}>
                <Form>
                    <>
                        <div className="flex flex-col gap-8 py-5">
                            <div className="flex justify-between gap-3 max-sm:flex-col">

                                <div className="w-full">
                                    <TextField
                                        label="Trips to be completed"
                                        placeholder="Trips to be completed"
                                        {...formik.getFieldProps("no_of_trips")}
                                        error={
                                        formik.touched.no_of_trips ? formik.errors.no_of_trips : undefined
                                        }
                                    />
                                    <div className="flex mt-2">
                                        <p><InfoIcon /></p> 
                                        <p className="ml-2 text-[#9A9A9A]"><small>How many trips does the driver need to complete before the driver recieves value</small></p>
                                    </div>
                                    
                                </div>
                                <div className="w-full">
                                
                                    <TextField
                                        label="Amount Per Referral"
                                        placeholder="Amount Per Referral"
                                        {...formik.getFieldProps("amount_per_referral")}
                                        error={
                                        formik.touched.amount_per_referral ? formik.errors.amount_per_referral : undefined
                                        }
                                    />
                                    <div className="flex mt-2">
                                        <p><InfoIcon /></p> 
                                        <p className="ml-2 text-[#9A9A9A]"><small>How much does the driver get per referral</small></p>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="flex justify-between gap-3 max-sm:flex-col">
                                <div className="flex flex-col w-full">
                                    <div className="w-full flex items-center justify-start gap-3">
                                        <span>Active</span> 
                                        <Switch 
                                            checked={settingIsActive} 
                                            {...formik.getFieldProps("is_active")}
                                            onChange={(e) => {
                                                setSettingIsActive(!settingIsActive)
                                                formik.setFieldValue('is_active', !settingIsActive)
                                            }}
                                        />
                                    </div>
                                    <div className="flex mt-2">
                                        <p><InfoIcon /></p> 
                                        <p className="ml-2 text-[#9A9A9A]"><small>Activate/deactivate driver referral settings</small></p>
                                    </div>
                                </div>

                                <div className="flex flex-col w-full">
                                    <div className="w-full flex items-center justify-start gap-3">
                                        <SelectField
                                            options={rewardType}
                                            disabled={false}
                                            label="Reward Type"
                                            placeholder="Reward Type"
                                            className="w-full"
                                            {...formik.getFieldProps("type")}
                                            error={
                                            formik.touched.type ? formik.errors.type : undefined
                                            }
                                        />
                                    </div>
                                    <div className="flex mt-2">
                                        <p><InfoIcon /></p> 
                                        <p className="ml-2 text-[#9A9A9A]"><small>Add reward type for referrals</small></p>
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

export default DriverReferralSettings;