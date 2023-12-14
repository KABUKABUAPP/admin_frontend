import React, { FC, useEffect, useState, useRef, useLayoutEffect } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/Input/TextField/TextField";
import InfoIcon from "@/components/icons/InfoIcon";
import { useGetDriverSettingsQuery, useUpdateDriverSettingsMutation } from "@/api-services/settingsService";
import Loader from "@/components/ui/Loader/Loader";
import { toast } from "react-toastify";

interface Props {
    upper_bound: string;
    lower_bound: string;
}

const FarePriceSettings: FC<Props> = ({upper_bound, lower_bound}) => {
    const [showSaveChanges, setShowSaveChanges] = useState(false)

    const initialValues = {
        upperBound: upper_bound,
        lowerBound: lower_bound
    };


    const [updateDriverSettings, { isLoading, isError, isSuccess, error }] =
    useUpdateDriverSettingsMutation();

    
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            
            const driversSettingsData = {
                pricing_boundary: {upper_bound: values.upperBound, lower_bound: values.lowerBound}
            }

            updateDriverSettings(driversSettingsData)
        }
    });

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
          firstUpdate.current = false;
          return;
        }
    
        if (formik.values.upperBound.length > 0 && formik.values.lowerBound.length > 0) setShowSaveChanges(true);
        if (formik.values.upperBound.length === 0 || formik.values.lowerBound.length === 0) setShowSaveChanges(false)
    }, [formik.values])

    useEffect(() => {
        if (isSuccess) toast.success('Fare Price Settings Updated Successfully')
    }, [isSuccess])

    useEffect(() => {
        if (isError) toast.error('Error While Updating Fare Price Settings')
    }, [isError])

    return (
        <>
            <h1 className="text-3xl font-bold">Fare Price Settings</h1>
            <p className="mt-2 text-[#9A9A9A]"><small>Configure fare price</small></p>
            
            <FormikProvider value={formik}>
                <Form>
                    <>
                        <div className="flex flex-col gap-8 py-5">
                            <div className="flex justify-between gap-3 max-sm:flex-col">

                                <div className="w-full">
                                
                                    <TextField
                                        label="Fare Price Lower Bound"
                                        placeholder="Fare Price Lower Bound"
                                        {...formik.getFieldProps("lowerBound")}
                                        error={
                                        formik.touched.lowerBound ? formik.errors.lowerBound : undefined
                                        }
                                    />
                                    <div className="flex mt-2">
                                        <p><InfoIcon /></p> 
                                        <p className="ml-2 text-[#9A9A9A]"><small>What percentage should the minimum price be?</small></p>
                                    </div>
                                    
                                </div>
                                <div className="w-full">
                                    <TextField
                                        label="Fare Price Upper Bound"
                                        placeholder="Fare Price Upper Bound"
                                        {...formik.getFieldProps("upperBound")}
                                        error={
                                        formik.touched.upperBound ? formik.errors.upperBound : undefined
                                        }
                                    />
                                    <div className="flex mt-2">
                                        <p><InfoIcon /></p> 
                                        <p className="ml-2 text-[#9A9A9A]"><small>What percentage should the maximum price be?</small></p>
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

export default FarePriceSettings;