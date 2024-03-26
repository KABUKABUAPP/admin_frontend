import React, { FC, useEffect, useState, useRef, useLayoutEffect } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/Input/TextField/TextField";
import InfoIcon from "@/components/icons/InfoIcon";
import { useGetDriverSettingsQuery, useUpdateDriverSettingsMutation } from "@/api-services/settingsService";
import Loader from "@/components/ui/Loader/Loader";
import { toast } from "react-toastify";
import Switch from "react-switch";
import EditIcon from "@/components/icons/EditIcon";
import CloseIcon from "@/components/icons/CloseIcon";

interface Props {
    status: string; 
    amount: string; 
    number_of_days: string; 
    number_of_hours: string;
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

const OnlineConsistency: FC<Props> = ({status, amount, number_of_days, number_of_hours}) => {
    const [showSaveChanges, setShowSaveChanges] = useState(false);

    const statusVal = status === 'active' ? true : false
    const [statusActive, setStatusActive] = useState<boolean>(statusVal);
    const [rewardAmount, setRewardAmount] = useState(String(amount));
    const [numberOfDays, setNumberOfDays] = useState(String(number_of_days));
    const [numberOfHours, setNumberOfHours] = useState(String(number_of_hours));

    const initialValues = {
        statusActive, 
        rewardAmount, 
        numberOfDays, 
        numberOfHours
    };


    const [updateDriverSettings, { isLoading, isError, isSuccess, error }] =
    useUpdateDriverSettingsMutation();

    
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {

            const driversSettingsData = {
                online_consistency_reward_control: {
                    status: statusActive ? 'active' : 'inactive',
                    amount: rewardAmount,
                    number_of_days: numberOfDays,
                    number_of_hours: numberOfHours
                }
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
    }, [formik.values])

    useEffect(() => {
        if (isSuccess) toast.success('Online Consistency Settings Updated Successfully')
    }, [isSuccess])

    useEffect(() => {
        if (isError) toast.error('Error While Updating Online Consistency Settings')
    }, [isError])

    return (
        <>
            <h1 className="text-3xl font-bold">Trip Charges Control Settings</h1>
            <p className="mt-2 text-[#9A9A9A]"><small>Configure trip charges controls</small></p>
            
            <FormikProvider value={formik}>
                <Form>
                    <>
                        <div className="flex flex-col gap-8 py-5">
                            <div className="flex justify-start gap-3 max-sm:flex-col">
                                Active <Switch onChange={() => {
                                    setStatusActive(!statusActive)
                                }} checked={statusActive} />
                            </div>

                            <div className="flex max-sm:flex-col gap-6 mt-2">
                                <div className="flex justify-between" style={{ flex: 1 }}>
                                    <TextField
                                        label="Amount"
                                        type="text"
                                        onChange={(val) => {setRewardAmount(val.target.value)}}
                                        disabled={false}
                                        value={rewardAmount}
                                    />
                                </div>
                            </div>
                            
                            <div className="flex max-sm:flex-col gap-6 mt-2">
                                <div className="flex justify-between" style={{ flex: 1 }}>
                                    <TextField
                                        label="Number of days"
                                        type="text"
                                        onChange={(val) => {setNumberOfDays(val.target.value)}}
                                        disabled={false}
                                        value={numberOfDays}
                                    />
                                </div>
                                <div className="flex justify-between" style={{ flex: 1 }}>
                                    <TextField
                                        label="Number of hours"
                                        type="text"
                                        onChange={(val) => {setNumberOfHours(val.target.value)}}
                                        disabled={false}
                                        value={numberOfHours}
                                    />
                                </div>
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

export default OnlineConsistency;