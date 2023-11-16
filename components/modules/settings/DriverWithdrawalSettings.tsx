import React, { FC, useEffect, useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/Input/TextField/TextField";
import SelectField from "@/components/ui/Input/SelectField";
import InfoIcon from "@/components/icons/InfoIcon";
import { useGetDriverSettingsQuery, useUpdateDriverSettingsMutation } from "@/api-services/settingsService";
import Loader from "@/components/ui/Loader/Loader";
import { toast } from "react-toastify";

const initialValues = {
    withdrawal_type: "",
    withdrawal_frequency: ""
};

const withdrawalTypes = [
    {
        label: 'Weekly',
        value: 'WITHDRAWAL_TYPE_WEEKLY'
    },
    {
        label: 'Daily',
        value: 'WITHDRAWAL_TYPE_DAILY'
    }
]

const DriverWithdrawalSettings: FC = () => {
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
                withdrawal: {type: values.withdrawal_type, frequency: values.withdrawal_frequency}
            }

            updateDriverSettings(driversSettingsData)
        },
    });
    
    useEffect(() => {
        if (formik.values.withdrawal_frequency.length > 0 && formik.values.withdrawal_type.length > 0) setShowSaveChanges(true);
        if (formik.values.withdrawal_frequency.length === 0 || formik.values.withdrawal_type.length === 0) setShowSaveChanges(false)
    }, [formik.values])

    useEffect(() => {
        if (isSuccess) toast.success('Withdrawal Settings Updated Successfully')
    }, [isSuccess])

    useEffect(() => {
        if (isError) toast.error('Error While Updating Withdrawal Settings')
    }, [isError])

    return (
        <>
            <h1 className="text-3xl font-bold">Driver Withdrawal Settings</h1>
            <p className="mt-2 text-[#9A9A9A]"><small>Configure driver withdrawals</small></p>
            
            <FormikProvider value={formik}>
                <Form>
                    <>
                        <div className="flex flex-col gap-8 py-5">
                            <div className="flex justify-between gap-3 max-sm:flex-col">

                                <div className="w-full">
                                    <SelectField
                                        options={withdrawalTypes}
                                        disabled={false}
                                        label="Withrawal Type"
                                        placeholder="Withdrawal Type"
                                        className="w-full"
                                        {...formik.getFieldProps("withdrawal_type")}
                                        error={
                                        formik.touched.withdrawal_type ? formik.errors.withdrawal_type : undefined
                                        }
                                    />
                                    <div className="flex mt-2">
                                        <p><InfoIcon /></p> 
                                        <p className="ml-2 text-[#9A9A9A]"><small>How often should they withdraw</small></p>
                                    </div>
                                </div>
                                <div className="w-full">
                                
                                    <TextField
                                        label="Withrawal Frequency"
                                        placeholder="Withrawal Frequency"
                                        {...formik.getFieldProps("withdrawal_frequency")}
                                        error={
                                        formik.touched.withdrawal_frequency ? formik.errors.withdrawal_frequency : undefined
                                        }
                                    />
                                    <div className="flex mt-2">
                                        <p><InfoIcon /></p> 
                                        <p className="ml-2 text-[#9A9A9A]"><small>How many times during that period should they withdraw</small></p>
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

export default DriverWithdrawalSettings;