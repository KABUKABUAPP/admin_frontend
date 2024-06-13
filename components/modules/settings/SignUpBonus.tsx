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
    user_type: string;
    amount: string;
    online_hours: string;
    active: boolean;
}

const SignUpBonusSettings: FC<Props> = ({active, amount, online_hours, user_type}) => {
    const [showSaveChanges, setShowSaveChanges] = useState(false)
    const [settingIsActive, setSettingIsActive] = useState(active);

    const initialValues = {
        active: active,
        amount: amount,
        online_hours: online_hours,
        user_type: user_type
    };

    const userType = [
        {
            label: 'Rider',
            value: 'rider'
        },
        {
            label: 'Driver',
            value: 'driver'
        }
    ]


    const [updateDriverSettings, { isLoading, isError, isSuccess, error }] =
    useUpdateDriverSettingsMutation();

    
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            const driversSettingsData = {
                signup_bonus: {
                    active: values.active ? 'on' : 'off',
                    amount: values.amount,
                    online_hours: values.online_hours,
                    user_type: values.user_type
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
    
        if (formik.values.user_type.length > 0 && formik.values.online_hours.length > 0 && (formik.values.active || !formik.values.active) && formik.values.amount.length > 0) setShowSaveChanges(true);
        if (formik.values.user_type.length === 0 || formik.values.online_hours.length === 0 || formik.values.amount.length === 0) setShowSaveChanges(false)
    }, [formik.values])

    useEffect(() => {
        if (isSuccess) toast.success('Signup Bonus Settings Updated Successfully')
    }, [isSuccess])

    useEffect(() => {
        if (isError) toast.error('Error While Updating Signup Bonus Settings')
    }, [isError])

    return (
        <>
            <h1 className="text-3xl font-bold">Signup Bonus Settings</h1>
            <p className="mt-2 text-[#9A9A9A]"><small>Configure signup bonus settings</small></p>
            
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
                                        <p className="ml-2 text-[#9A9A9A]"><small>Signup bonus amount</small></p>
                                    </div>
                                    
                                </div>
                                <div className="w-full">
                                
                                    <TextField
                                        label="Online Hours"
                                        placeholder="Online Hours"
                                        {...formik.getFieldProps("online_hours")}
                                        error={
                                            formik.touched.online_hours ? formik.errors.online_hours : undefined
                                        }
                                    />
                                    <div className="flex mt-2">
                                        <p><InfoIcon /></p> 
                                        <p className="ml-2 text-[#9A9A9A]"><small>No of hours user has to spend online</small></p>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="flex justify-between gap-3 max-sm:flex-col">
                                <div className="flex flex-col w-full">
                                    <div className="w-full flex items-center justify-start gap-3">
                                        <span>Active</span> 
                                        <Switch 
                                            checked={settingIsActive} 
                                            {...formik.getFieldProps("active")}
                                            onChange={(e) => {
                                                setSettingIsActive(!settingIsActive)
                                                formik.setFieldValue('active', !settingIsActive)
                                            }}
                                        />
                                    </div>
                                    <div className="flex mt-2">
                                        <p><InfoIcon /></p> 
                                        <p className="ml-2 text-[#9A9A9A]"><small>Activate/deactivate signup bonus</small></p>
                                    </div>
                                </div>

                                <div className="flex flex-col w-full">
                                    <div className="w-full flex items-center justify-start gap-3">
                                        <SelectField
                                            options={userType}
                                            disabled={false}
                                            label="User Type"
                                            placeholder="User Type"
                                            className="w-full"
                                            {...formik.getFieldProps("user_type")}
                                            error={
                                                formik.touched.user_type ? formik.errors.user_type : undefined
                                            }
                                        />
                                    </div>
                                    <div className="flex mt-2">
                                        <p><InfoIcon /></p> 
                                        <p className="ml-2 text-[#9A9A9A]"><small>User type eligible for rewards</small></p>
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

export default SignUpBonusSettings;