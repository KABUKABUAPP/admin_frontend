import React, { FC, useEffect, useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/Input/TextField/TextField";
import InfoIcon from "@/components/icons/InfoIcon";
import { useGetDriverSettingsQuery, useUpdateDriverSettingsMutation } from "@/api-services/settingsService";
import Loader from "@/components/ui/Loader/Loader";
import { toast } from "react-toastify";

const initialValues = {
    no_of_trips: "",
    amount_per_referral: ""
};

const DriverReferralSettings: FC = () => {
    const [showSaveChanges, setShowSaveChanges] = useState(false)

    const {
        data: driversSettings,
        isLoading: settingsLoading,
        isError: settingsError,
        refetch: reloadSettings,
      } = useGetDriverSettingsQuery({})

    const [updateDriverSettings, { isLoading, isError, isSuccess, error }] =
    useUpdateDriverSettingsMutation();

    
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            const driversSettingsData = {
                referral_reward: {
                    type: 'REFERRAL_REWARD_FOR_DRIVERS_BASED_ON_TRIPS_BY_OTHER_DRIVERS',
                    amount: values.amount_per_referral,
                    frequency: values.no_of_trips,
                    is_active: 'yes'
                }
            }

            updateDriverSettings(driversSettingsData)
        },
    });

    useEffect(() => {
        if (formik.values.no_of_trips.length > 0 && formik.values.amount_per_referral.length > 0) setShowSaveChanges(true);
        if (formik.values.no_of_trips.length === 0 || formik.values.amount_per_referral.length === 0) setShowSaveChanges(false)
    }, [formik.values])
    
    useEffect(() => {
        if (isSuccess) toast.success('Withdrawal Settings Updated Successfully')
    }, [isSuccess])

    useEffect(() => {
        if (isError) toast.error('Error While Updating Withdrawal Settings')
    }, [isError])

    return (
        <>
            <h1 className="text-3xl font-bold">Driver Referral Settings</h1>
            <p className="mt-2 text-[#9A9A9A]"><small>Configure driver referrals</small></p>
            {
                settingsLoading ?
                <Loader /> :
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
            }
        </>
    )
}

export default DriverReferralSettings;