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
    active: boolean;
    booking_fee: boolean;
    kabu_percentage: boolean;
    state_levy: boolean;
    date_range: any;
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

const TripChargesControl: FC<Props> = ({active, booking_fee, kabu_percentage, state_levy, date_range}) => {
    const [showSaveChanges, setShowSaveChanges] = useState(false);
    const [settingActive, setSettingActive] = useState<boolean>(active);
    const [settingBookingFee, setSettingBookingFee] = useState<boolean>(booking_fee);
    const [settingKabuPerc, setSettingKabuPerc] = useState<boolean>(kabu_percentage);
    const [settingStateLevy, setSettingStateLevy] = useState<boolean>(state_levy);
    const [settingStartDate, setSettingStartDate] = useState<string>(date_range.start_date);
    const [settingEndDate, setSettingEndDate] = useState<string>(date_range.end_date);
    const [showStartDate, setShowStartDate] = useState<boolean>(true);
    const [showEndDate, setShowEndDate] = useState<boolean>(true);

    const initialValues = {
        active: active, 
        bookingFee: booking_fee, 
        kabuPercentage: kabu_percentage, 
        stateLevy: state_levy, 
        startDate: date_range.start_date,
        endDate: date_range.end_date
    };


    const [updateDriverSettings, { isLoading, isError, isSuccess, error }] =
    useUpdateDriverSettingsMutation();

    
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            console.log({
                active: settingActive ? 'on' : 'off', 
                booking_fee: settingBookingFee ? 'on' : 'off', 
                kabu_percentage: settingKabuPerc ? 'on' : 'off', 
                state_levy: settingStateLevy ? 'on' : 'off', 
                date_range: {
                    start_date: convertDateFormat(settingStartDate), 
                    end_date: convertDateFormat(settingEndDate)
                }
            })
            const driversSettingsData = {
                trip_charges_control: {
                    active: settingActive ? 'on' : 'off', 
                    booking_fee: settingBookingFee ? 'on' : 'off', 
                    kabu_percentage: settingKabuPerc ? 'on' : 'off', 
                    state_levy: settingStateLevy ? 'on' : 'off', 
                    date_range: {
                        start_date: convertDateFormat(settingStartDate), 
                        end_date: convertDateFormat(settingEndDate)
                    }
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
    
        //if (formik.values.upperBound.length > 0 && formik.values.lowerBound.length > 0) setShowSaveChanges(true);
        //if (formik.values.upperBound.length === 0 || formik.values.lowerBound.length === 0) setShowSaveChanges(false)
    }, [formik.values])

    useEffect(() => {
        if (isSuccess) toast.success('Trip Charges Control Settings Updated Successfully')
    }, [isSuccess])

    useEffect(() => {
        if (isError) toast.error('Error While Updating Trip Charges Control Settings')
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
                                    setSettingActive(!settingActive)
                                }} checked={settingActive} />
                            </div>
                            <div className="flex justify-start gap-3 max-sm:flex-col">
                                Booking Fee <Switch onChange={() => {
                                    setSettingBookingFee(!settingBookingFee)
                                }} checked={settingBookingFee} disabled={!settingActive} />
                            </div>
                            <div className="flex justify-start gap-3 max-sm:flex-col">
                                KabuKabu Percentage <Switch onChange={() => {
                                    setSettingKabuPerc(!settingKabuPerc)
                                }} checked={settingKabuPerc} disabled={!settingActive} />
                            </div>
                            <div className="flex justify-start gap-3 max-sm:flex-col">
                                State Levy <Switch onChange={() => {
                                    setSettingStateLevy(!settingStateLevy)
                                }} checked={settingStateLevy} disabled={!settingActive} />
                            </div>
                            
                            <div className="flex max-sm:flex-col gap-6 mt-2">
                                {
                                    showStartDate ?
                                    <div className="flex justify-between" style={{ flex: 1 }}>
                                        <p>{new Date(settingStartDate).toLocaleDateString()}</p>
                                        <div onClick={() => {setShowStartDate(!showStartDate)}}>
                                            <EditIcon />
                                        </div>
                                    </div> :
                                    <div className="flex justify-between" style={{ flex: 1 }}>
                                        <TextField
                                            label="Start Date"
                                            type="date"
                                            onChange={(val) => {setSettingStartDate(val.target.value)}}
                                            disabled={!settingActive}
                                            value={settingStartDate}
                                        />
                                        <div onClick={() => {setShowStartDate(!showStartDate)}}>
                                            <CloseIcon />
                                        </div>
                                    </div>
                                }
                                {
                                    showEndDate ?
                                    <div className="flex justify-between" style={{ flex: 1 }}>
                                        <p>{new Date(settingEndDate).toLocaleDateString()}</p>
                                        <div onClick={() => {setShowEndDate(!showEndDate)}}>
                                            <EditIcon />
                                        </div>
                                    </div> :
                                    <div className="flex justify-between" style={{ flex: 1 }}>
                                        <TextField
                                            label="End Date"
                                            type="date"
                                            onChange={(val) => {setSettingEndDate(val.target.value)}}
                                            disabled={!settingActive}
                                            value={settingEndDate}
                                        />
                                        <div onClick={() => {setShowEndDate(!showEndDate)}}>
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

export default TripChargesControl;