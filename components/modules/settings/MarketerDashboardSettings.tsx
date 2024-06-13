import React, { FC, useEffect, useState, useRef, useLayoutEffect } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/Input/TextField/TextField";
import { useUpdateDriverSettingsMutation } from "@/api-services/settingsService";
import { toast } from "react-toastify";
import Switch from "react-switch";
import EditIcon from "@/components/icons/EditIcon";
import CloseIcon from "@/components/icons/CloseIcon";

interface Props {
    start_date: any;
}

function convertDateFormat(inputDate: any) {
    const parts = inputDate.split('-');
    const formattedDate = new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
  
    const month = formattedDate.getMonth() + 1; // Months are zero-indexed
    const day = formattedDate.getDate();
    const year = formattedDate.getFullYear() % 100; // Extract last two digits of the year
  
    // Ensure leading zeroes for single-digit months and days
    const formattedMonth = (month < 10) ? `0${month}` : month;
    const formattedDay = (day < 10) ? `0${day}` : day;
  
    return `${formattedMonth}-${formattedDay}-${year}`;
}

const MarketerDashboardSettings: FC<Props> = ({start_date}) => {
    const [showSaveChanges, setShowSaveChanges] = useState(false);
    const [showStartDate, setShowStartDate] = useState<boolean>(true);
    const [settingStartDate, setSettingStartDate] = useState<any>(start_date)

    const initialValues = {
        start_date: start_date
    };


    const [updateDriverSettings, { isLoading, isError, isSuccess, error }] =
    useUpdateDriverSettingsMutation();

    
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            const marketerDashboardSettingsData = {
                marketer_dashboard: {
                    start_date: convertDateFormat(settingStartDate)
                }
            }
            updateDriverSettings(marketerDashboardSettingsData)
        }
    });

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
          firstUpdate.current = false;
          return;
        }
    
        //if (formik.values.upperBound.length > 0 && formik.values.lowerBound.length > 0) setShowSaveChanges(true);
        //if (formik.values.upperBound.length === 0 || formik.values.lowerBound.length === 0) setShowSaveChanges(false)
    }, [formik.values])

    useEffect(() => {
        if (isSuccess) toast.success('Marketer Dashboard Settings Updated Successfully')
    }, [isSuccess])

    useEffect(() => {
        if (isError) toast.error('Error While Updating Marketer Dashboard Settings')
    }, [isError])

    return (
        <>
            <h1 className="text-3xl font-bold">Marketer Dashboard Settings</h1>
            <p className="mt-2 text-[#9A9A9A]"><small>Configure marketer dashboard settings</small></p>
            
            <FormikProvider value={formik}>
                <Form>
                    <>
                        <div className="flex flex-col gap-8 py-5">
                            <div className="flex max-sm:flex-col gap-6 mt-2">
                                {
                                    showStartDate ?
                                    <div className="flex justify-between" style={{ flex: 1 }}>
                                        <div className="flex flex-col">
                                            <p className="font-bold">Start Date</p>
                                            <p>{new Date(settingStartDate).toLocaleDateString()}</p>
                                        </div>
                                        
                                        <div className="cursor-pointer" onClick={() => {setShowStartDate(!showStartDate)}}>
                                            <EditIcon />
                                        </div>
                                    </div> :
                                    <div className="flex justify-between" style={{ flex: 1 }}>
                                        <TextField
                                            label="Start Date"
                                            type="date"
                                            onChange={(val) => {setSettingStartDate(val.target.value)}}
                                            disabled={false}
                                            value={settingStartDate}
                                        />
                                        <div className="cursor-pointer" onClick={() => {setShowStartDate(!showStartDate)}}>
                                            <CloseIcon />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        
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
                    </>
                </Form>
            </FormikProvider>

        </>
    )
}

export default MarketerDashboardSettings;