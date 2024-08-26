import React, { FC, useEffect, useState, useRef, useLayoutEffect } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/Input/TextField/TextField";
import { useUpdateDriverSettingsMutation } from "@/api-services/settingsService";
import { toast } from "react-toastify";
import Switch from "react-switch";
import EditIcon from "@/components/icons/EditIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import AddIcon from "@/components/icons/AddIcon";
import { useModalContext } from "@/contexts/ModalContext";
import Card from "@/components/common/Card";
import CloseIcon from "@/components/icons/CloseIcon";
import TimesIconRed from "@/components/icons/TimesIconRed";
import DropDown from "@/components/ui/DropDown";

interface Props {
    status: string; 
    amount: string; 
    number_of_days: string; 
    number_of_hours: string;
    profile: any;
    refetchSettings: any
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

const initialProfileValues = {
    name: '',
    amount: '',
    active: '',
    number_of_trips: '',
    hours: '',
    start: '',
    stop: ''
}

const AddProfile: FC<any> = ({profile, setRefetchData}) => {
    const { setModalContent } = useModalContext();
    const [profileActive, setProfileActive] = useState<any>(false);
    const [profileName, setProfileName] = useState<any>('');
    const [noOfTrips, setNoOfTrips] = useState<any>('');
    const [profileAmount, setProfileAmount] = useState<any>('');
    const [profileHours, setProfileHours] = useState<any>('');
    const [profileStart, setProfileStart] = useState<any>('');
    const [profileStop, setProfileStop] = useState<any>('');

    const [updateDriverSettings, { isLoading, isError, isSuccess, error }] =
    useUpdateDriverSettingsMutation();

    const formik = useFormik({
        initialValues: initialProfileValues,
        onSubmit: (values) => {

            const driversSettingsData = {
                online_consistency_reward_control: {
                    profile: [
                        ...profile,
                        {
                            active: profileActive ? 1 : 0,
                            amount: parseInt(profileAmount),
                            hours: parseInt(profileHours),
                            name: profileName,
                            number_of_trips: parseInt(noOfTrips),
                            start: parseInt(profileStart),
                            stop: parseInt(profileStop)
                        }
                    ]
                }
            }

            updateDriverSettings(driversSettingsData)
        }
    });

    useEffect(() => {
        if (isSuccess) {
            setRefetchData(true);
            setModalContent(null)
            toast.success('Online Consistency Settings Updated Successfully');
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) toast.error('Error While Updating Online Consistency Settings')
    }, [isError])

    return (
        <div className="rounded-lg mx-auto w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%]">
            <Card bg="#FFF">
                <div className="flex flex-col justify-end w-full">
                    <div className="w-auto cursor-pointer my-4" onClick={() => setModalContent(null)}>
                        <TimesIconRed />
                    </div>

                    <div className="text-center">
                        <p className="font-bold text-md">Add New Profile</p>
                    </div>

                    <FormikProvider value={formik}>
                        <Form>
                            <>
                                <div className="flex flex-col gap-3 py-5">
                                    <div className="flex justify-start gap-3 max-sm:flex-col">
                                        Active <Switch onChange={() => {
                                            setProfileActive(!profileActive)
                                        }} checked={profileActive} />
                                    </div>
                                    <div className="flex justify-between" style={{ flex: 1 }}>
                                        <div className="flex flex-col w-auto gap-3">
                                            <p>{'Start'}</p>
                                            <DropDown
                                                placeholder="Select Start"
                                                options={[
                                                    { label: "Sunday", value: "0", default: false },
                                                    { label: "Monday", value: "1", default: false },
                                                    { label: "Tuesday", value: "2", default: false },
                                                    { label: "Wednesday", value: "3", default: false },
                                                    { label: "Thursday", value: "4", default: false },
                                                    { label: "Friday", value: "5", default: false },
                                                    { label: "Saturday", value: "6", default: false }
                                                ]}
                                                value={profileStart}
                                                handleChange={(val: any) => {
                                                if (setProfileStart) setProfileStart(val);
                                                }}
                                            />
                                        </div> 
                                    </div>
                                    <div className="flex justify-between" style={{ flex: 1 }}>
                                        <div className="flex flex-col w-auto gap-3">
                                            <p>{'Stop'}</p>
                                            <DropDown
                                                placeholder="Select Stop"
                                                options={[
                                                    { label: "Sunday", value: "0", default: false },
                                                    { label: "Monday", value: "1", default: false },
                                                    { label: "Tuesday", value: "2", default: false },
                                                    { label: "Wednesday", value: "3", default: false },
                                                    { label: "Thursday", value: "4", default: false },
                                                    { label: "Friday", value: "5", default: false },
                                                    { label: "Saturday", value: "6", default: false }
                                                ]}
                                                value={profileStop}
                                                handleChange={(val: any) => {
                                                if (setProfileStop) setProfileStop(val);
                                                }}
                                            />
                                        </div> 
                                    </div>
                                    <div className="flex justify-between" style={{ flex: 1 }}>
                                        <TextField
                                            label="Name"
                                            type="text"
                                            onChange={(val) => {setProfileName(val.target.value)}}
                                            disabled={false}
                                            value={profileName}
                                        />
                                    </div>
                                    <div className="flex justify-between" style={{ flex: 1 }}>
                                        <TextField
                                            label="Number of trips"
                                            type="text"
                                            onChange={(val) => {setNoOfTrips(val.target.value)}}
                                            disabled={false}
                                            value={noOfTrips}
                                        />
                                    </div>
                                    <div className="flex justify-between" style={{ flex: 1 }}>
                                        <TextField
                                            label="Amount"
                                            type="text"
                                            onChange={(val) => {setProfileAmount(val.target.value)}}
                                            disabled={false}
                                            value={profileAmount}
                                        />
                                    </div>
                                    <div className="flex justify-between" style={{ flex: 1 }}>
                                        <TextField
                                            label="Hours"
                                            type="text"
                                            onChange={(val) => {setProfileHours(val.target.value)}}
                                            disabled={false}
                                            value={profileHours}
                                        />
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
                </div>
            </Card>
        </div>
    )   
}

const EditProfile: FC<any> = ({theProfile, profile, setRefetchData, theProfileIndex}) => {
    const { setModalContent } = useModalContext();
    const [profileActive, setProfileActive] = useState<any>(theProfile.active);
    const [profileName, setProfileName] = useState<any>(theProfile.name);
    const [noOfTrips, setNoOfTrips] = useState<any>(theProfile.number_of_trips);
    const [profileAmount, setProfileAmount] = useState<any>(theProfile.amount);
    const [profileHours, setProfileHours] = useState<any>(theProfile.hours);
    const [profileStart, setProfileStart] = useState<any>(theProfile.start);
    const [profileStop, setProfileStop] = useState<any>(theProfile.stop);

    const [updateDriverSettings, { isLoading, isError, isSuccess, error }] =
    useUpdateDriverSettingsMutation();

    const formik = useFormik({
        initialValues: initialProfileValues,
        onSubmit: (values) => {
            const newProfileObj = {
                active: profileActive ? 1 : 0,
                amount: parseInt(profileAmount),
                hours: parseInt(profileHours),
                name: profileName,
                number_of_trips: parseInt(noOfTrips),
                start: parseInt(profileStart),
                stop: parseInt(profileStop)
            }

            const updatedProfile = [
                 ...profile.slice(0, theProfileIndex),
                newProfileObj,                           
                ...profile.slice(theProfileIndex + 1)
            ]

            const driversSettingsData = {
                online_consistency_reward_control: {
                    profile: updatedProfile
                }
            }

            updateDriverSettings(driversSettingsData)
        }
    });

    
    useEffect(() => {
        if (isSuccess) {
            setRefetchData(true);
            setModalContent(null)
            toast.success('Online Consistency Settings Updated Successfully');
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) toast.error('Error While Updating Online Consistency Settings')
    }, [isError])


    return (
        <div className="rounded-lg mx-auto w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%]">
            <Card bg="#FFF">
                <div className="flex flex-col justify-end w-full">
                    <div className="w-auto cursor-pointer my-4" onClick={() => setModalContent(null)}>
                        <TimesIconRed />
                    </div>

                    <div className="text-center">
                        <p className="font-bold text-md">Edit Profile</p>
                    </div>

                    <FormikProvider value={formik}>
                        <Form>
                            <>
                                <div className="flex flex-col gap-3 py-5">
                                    <div className="flex justify-start gap-3 max-sm:flex-col">
                                        Active <Switch onChange={() => {
                                            setProfileActive(!profileActive)
                                        }} checked={profileActive} />
                                    </div>
                                    <div className="flex justify-between" style={{ flex: 1 }}>
                                        {/*<TextField
                                            label="Start"
                                            type="text"
                                            onChange={(val) => {setProfileStart(val.target.value)}}
                                            disabled={false}
                                            value={profileStart}
                                        />*/}

                                        <div className="flex flex-col w-auto gap-3">
                                            <p>{'Start'}</p>
                                            <DropDown
                                                placeholder="Select Start"
                                                options={[
                                                    { label: "Sunday", value: "0", default: false },
                                                    { label: "Monday", value: "1", default: false },
                                                    { label: "Tuesday", value: "2", default: false },
                                                    { label: "Wednesday", value: "3", default: false },
                                                    { label: "Thursday", value: "4", default: false },
                                                    { label: "Friday", value: "5", default: false },
                                                    { label: "Saturday", value: "6", default: false }
                                                ]}
                                                value={profileStart}
                                                handleChange={(val: any) => {
                                                if (setProfileStart) setProfileStart(val);
                                                }}
                                            />
                                        </div> 
                                    </div>
                                    <div className="flex justify-between" style={{ flex: 1 }}>
                                        {/*<TextField
                                            label="Stop"
                                            type="text"
                                            onChange={(val) => {setProfileStop(val.target.value)}}
                                            disabled={false}
                                            value={profileStop}
                                        />*/}

                                        <div className="flex flex-col w-auto gap-3">
                                            <p>{'Stop'}</p>
                                            <DropDown
                                                placeholder="Select Stop"
                                                options={[
                                                    { label: "Sunday", value: "0", default: false },
                                                    { label: "Monday", value: "1", default: false },
                                                    { label: "Tuesday", value: "2", default: false },
                                                    { label: "Wednesday", value: "3", default: false },
                                                    { label: "Thursday", value: "4", default: false },
                                                    { label: "Friday", value: "5", default: false },
                                                    { label: "Saturday", value: "6", default: false }
                                                ]}
                                                value={profileStop}
                                                handleChange={(val: any) => {
                                                if (setProfileStop) setProfileStop(val);
                                                }}
                                            />
                                        </div> 
                                    </div>

                                    <div className="flex justify-between" style={{ flex: 1 }}>
                                        <TextField
                                            label="Name"
                                            type="text"
                                            onChange={(val) => {setProfileName(val.target.value)}}
                                            disabled={false}
                                            value={profileName}
                                        />
                                    </div>
                                    <div className="flex justify-between" style={{ flex: 1 }}>
                                        <TextField
                                            label="Number of trips"
                                            type="text"
                                            onChange={(val) => {setNoOfTrips(val.target.value)}}
                                            disabled={false}
                                            value={noOfTrips}
                                        />
                                    </div>
                                    <div className="flex justify-between" style={{ flex: 1 }}>
                                        <TextField
                                            label="Amount"
                                            type="text"
                                            onChange={(val) => {setProfileAmount(val.target.value)}}
                                            disabled={false}
                                            value={profileAmount}
                                        />
                                    </div>
                                    <div className="flex justify-between" style={{ flex: 1 }}>
                                        <TextField
                                            label="Hours"
                                            type="text"
                                            onChange={(val) => {setProfileHours(val.target.value)}}
                                            disabled={false}
                                            value={profileHours}
                                        />
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
                </div>
            </Card>
        </div>
    ) 
}

const OnlineConsistency: FC<Props> = ({status, amount, number_of_days, number_of_hours, profile, refetchSettings}) => {
    const { setModalContent } = useModalContext();
    const [showSaveChanges, setShowSaveChanges] = useState(false);

    const statusVal = status === 'active' ? true : false
    const [statusActive, setStatusActive] = useState<boolean>(statusVal);
    const [rewardAmount, setRewardAmount] = useState(String(amount));
    const [numberOfDays, setNumberOfDays] = useState(String(number_of_days));
    const [numberOfHours, setNumberOfHours] = useState(String(number_of_hours));
    const [refetchData, setRefetchData] = useState(false)

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
        if (isSuccess) {
            toast.success('Online Consistency Settings Updated Successfully');
            refetchSettings();
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) toast.error('Error While Updating Online Consistency Settings')
    }, [isError])

    useEffect(() => {
        if (refetchData) {
            refetchSettings();
            setTimeout(() => {
                setRefetchData(false)
            }, 3000)
        }
    }, [refetchData])

    const getWeekDay = (a: number) => {
        if (a === 0) return 'Sunday';
        if (a === 1) return 'Monday';
        if (a === 2) return 'Tuesday';
        if (a === 3) return 'Wednesday';
        if (a === 4) return 'Thursday';
        if (a === 5) return 'Friday';
        if (a === 6) return 'Saturday';
    }

    return (
        <>
            <h1 className="text-3xl font-bold">Online Consistency Reward Settings</h1>
            <p className="mt-2 text-[#9A9A9A]"><small>Configure online consistency rewards</small></p>
            
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

            <hr />

            <>
                <div className="p-4 flex justify-start">
                    <Button
                        title="Add New Profile"
                        className="!text-[16px] mt-6"
                        size="large"
                        color="tetiary"
                        endIcon={<AddIcon />}
                        onClick={() => {
                            setModalContent(
                                <AddProfile profile={profile} setRefetchData={setRefetchData} />
                            )
                        }}
                    />
                </div>
                <>
                    <div className="grid grid-cols grid-cols-1 sm:grid-cols-2 py-5">
                        {
                            profile.map((one: any) => (
                                <div className="bg-[#FFFFFF] p-4 w-[90%] mx-auto my-2 rounded-lg shadow-md">
                                    <div className="p-4 flex justify-end gap-3">
                                        <Button
                                            title="Edit"
                                            className="p-5"
                                            size="medium"
                                            color="primary"
                                            loading={false}
                                            disabled={false}
                                            onClick={() => {
                                                setModalContent(
                                                    <EditProfile profile={profile} theProfile={one} setRefetchData={setRefetchData} theProfileIndex={profile.indexOf(one)} />
                                                )
                                            }}
                                            startIcon={<EditIcon />}
                                        />
                                        <Button
                                            title="Delete"
                                            className="p-5"
                                            size="medium"
                                            color="secondary"
                                            loading={false}
                                            disabled={false}
                                            onClick={() => {
                                                toast.success('Deleting....')
                                                const newProfile = [
                                                    ...profile.slice(0, profile.indexOf(one)), 
                                                    ...profile.slice(profile.indexOf(one) + 1)
                                                ]

                                                const driversSettingsData = {
                                                    online_consistency_reward_control: {
                                                        profile: newProfile
                                                    }
                                                }
                                                updateDriverSettings(driversSettingsData)
                                            }}
                                            startIcon={<TrashIcon />}
                                        />
                                    </div>
                                    <div className="flex flex-col border-b border-b-[#E6E6E6] last:border-none py-3">
                                        {<p className="text-xs text-[#000000] font-semibold">{'Name'}</p>}
                                        {<p className="text-sm font-bold">{one.name}</p>}
                                    </div>
                                    <div className="flex flex-col border-b border-b-[#E6E6E6] last:border-none py-3">
                                        {<p className="text-xs text-[#000000] font-semibold">{'Amount'}</p>}
                                        {<p className="text-sm font-bold">{one.amount}</p>}
                                    </div>
                                    <div className="flex flex-col border-b border-b-[#E6E6E6] last:border-none py-3">
                                        {<p className="text-sm font-bold">{one.active === 1 ? 'Active' : 'Not Active'}</p>}
                                    </div>
                                    <div className="flex flex-col border-b border-b-[#E6E6E6] last:border-none py-3">
                                        {<p className="text-xs text-[#000000] font-semibold">{'Number of Trips'}</p>}
                                        {<p className="text-sm font-bold">{one.number_of_trips}</p>}
                                    </div>
                                    <div className="flex flex-col border-b border-b-[#E6E6E6] last:border-none py-3">
                                        {<p className="text-xs text-[#000000] font-semibold">{'Hours'}</p>}
                                        {<p className="text-sm font-bold">{one.hours}</p>}
                                    </div>
                                    <div className="flex flex-col border-b border-b-[#E6E6E6] last:border-none py-3">
                                        {<p className="text-xs text-[#000000] font-semibold">{'Start'}</p>}
                                        {<p className="text-sm font-bold">{getWeekDay(one.start)}</p>}
                                    </div>
                                    <div className="flex flex-col border-b border-b-[#E6E6E6] last:border-none py-3">
                                        {<p className="text-xs text-[#000000] font-semibold">{'Stop'}</p>}
                                        {<p className="text-sm font-bold">{getWeekDay(one.stop)}</p>}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </>
            </>

        </>
    )
}

export default OnlineConsistency;