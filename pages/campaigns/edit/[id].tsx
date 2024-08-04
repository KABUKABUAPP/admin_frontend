import { useCreateCampaignMutation, useEditCampaignMutation, useGetMarketingStaffsQuery, useViewCampaignQuery } from "@/api-services/campaignService";
import ActionBar from "@/components/common/ActionBar";
import AppHead from "@/components/common/AppHead";
import Card from "@/components/common/Card";
import AddIcon from "@/components/icons/AddIcon";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/Input/TextField/TextField";
import Loader from "@/components/ui/Loader/Loader";
import AppLayout from "@/layouts/AppLayout";
import { capitalizeAllFirstLetters } from "@/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { useFormik, Form, FormikProvider } from "formik";
import { useGetAllDriversQuery } from "@/api-services/driversService";
import { useGetAllRidesQuery } from "@/api-services/ridersService";
import TimesIconRed from "@/components/icons/TimesIconRed";
import EditIcon from "@/components/icons/EditIcon";

const initialValues = {
    name: "",
    owner: "",
    start_date: "",
    end_date: "",
    category: ""
};

const EditCampaign = () => {
    const router = useRouter();
    const [search, setSearch] = useState<string>("");
    const [searchDriver, setSearchDriver] = useState<string>("");
    const [searchRider, setSearchRider] = useState<string>("");
    const [includedUsers, setIncludedUsers] = useState<any>([]);
    const [ownerIdStr, setOwnerIdStr] = useState<string>("");
    const [showCampaignOwnerEdit, setShowCampaignOwnerEdit] = useState<boolean>(false);
    const [startDateStr, setStartDateStr] = useState<string>("");
    const [showStartDateEdit, setShowStartDateEdit] = useState<boolean>(false);
    const [endDateStr, setEndDateStr] = useState<string>("");
    const [showEndDateEdit, setShowEndDateEdit] = useState<boolean>(false);

    const { data: campaignData, isLoading: campaignLoading, error: campaignError, refetch: campaignRefetch, isError: campaignIsError } = useViewCampaignQuery({
        id: router.query.id
    })

    const { data: allStaff, isLoading: isStaffLoading, error: isErrorLoading, refetch, isError } = useGetMarketingStaffsQuery({
        search: search,
    });

    const handleTagDelete = (i: any) => {
        const newInc = [...includedUsers];
        newInc.splice(i, 1);
        setIncludedUsers(newInc);
    };

    const handleTagAddition = (inc: any) => {
        const findDup = includedUsers.find((incI: any) => {return incI.value === inc.value});
        if (findDup) return toast.error('User has already been added');
    
        setIncludedUsers([...includedUsers, inc]);
    };

    const {
        data: drivers,
        isLoading: driversLoading,
        isError: driversIsError,
        refetch: reloadDrivers,
        error: driversError,
    } = useGetAllDriversQuery(
        {
            driverStatus: "active",
            limit: 1000,
            page: 1,
            search: searchDriver
        },
        {
          refetchOnMountOrArgChange: true,
          refetchOnReconnect: true,
        }
    );

    const { data: allRiders, isLoading: allRidersLoading, isError: allRidersError, refetch: allRidersRefetch } = useGetAllRidesQuery(
        {
          limit: 1000,
          page: 1,
          search: searchRider,
          order: "newest_first",
          status: 'no',
          onlineStatus: ''
        },
        { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
    );

    const [editCampaign, { data, isLoading, error, isSuccess }] = useEditCampaignMutation();

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values: any) => {
            const included_users = includedUsers.map((user: any) => {
                return user.value
            })
            if (values.category.length === 0) {
                toast.error('Category is required');
            }
            if (values.category.length > 0) {
                editCampaign({body: {included_users, ...values}, id: router.query.id})
            }
        },
    });

    useEffect(() => {
        if (drivers) console.log({drivers});
    }, [drivers]);

    useEffect(() => {
        if (allRiders) console.log({allRiders});
    }, [allRiders]);

    useEffect(() => {
        if (campaignData) {
            formik.setFieldValue('name', capitalizeAllFirstLetters(campaignData?.campaign_details?.name));

            const ownerDeets = allStaff?.data?.find((staff: any) => {
                if (staff.fullName === campaignData?.campaign_details?.owner) return staff;
            });

            if (ownerDeets) {
                setOwnerIdStr(ownerDeets.fullName);
                formik.setFieldValue('owner', ownerDeets.id);
            }

            formik.setFieldValue('start_date', campaignData?.campaign_details?.start_date);
            setStartDateStr(campaignData?.campaign_details?.start_date)

            if (campaignData?.campaign_details?.end_date) {
                formik.setFieldValue('end_date', campaignData?.campaign_details?.end_date);
                setEndDateStr(campaignData?.campaign_details?.end_date)
            }

                        
        }
    }, [campaignData]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('Successfully edited campaign');
            router.push(`/campaigns/view/${router.query.id}`)
        }
    }, [isSuccess])

    useEffect(() => {
        if (error) {
            toast.success('Error encountered')
            console.log(error)
        }
    }, [error])

    return (
        <>
            <AppHead title="Kabukabu | Repair Loan" />
            <AppLayout>
                <ActionBar></ActionBar>
                <div className="mx-auto w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] my-4">
                    <Card bg="#FFF">
                    <div className="flex flex-col gap-3 w-full">
                            <FormikProvider value={formik}>
                                <Form>
                                    <div className="flex flex-col gap-4 w-full">
                                        <TextField
                                            label="Campaign Name"
                                            placeholder="Campaign Name"
                                            {...formik.getFieldProps("name")}
                                            //error={formik.touched.name ? formik.errors.name : undefined}
                                        />

                                        {
                                            isStaffLoading ?
                                            <div className="flex justify-center items-center">
                                                <Loader />
                                            </div> :
                                            <>
                                                {
                                                    showCampaignOwnerEdit &&
                                                    <div className="flex flex-col justify-center items-center gap-2 w-full">
                                                        <p className="text-sm w-full">Campaign Owner</p>
                                                        <div className="flex justify-center items-center gap-2 w-full">
                                                            <Select
                                                                options={allStaff?.data?.map((staff: any) => {
                                                                    return {
                                                                        value: staff.id,
                                                                        label: capitalizeAllFirstLetters(staff.fullName)
                                                                    }
                                                                })}
                                                                className="w-full"
                                                                onKeyDown={(e: any) => {
                                                                    setSearch(e.target.value)
                                                                }}
                                                                onChange={(optX: any) => {
                                                                    formik.setFieldValue('owner', optX.value);
                                                                }}
                                                            />
                                                            <div className="w-auto cursor-pointer mt-1" onClick={() => {
                                                                setShowCampaignOwnerEdit(!showCampaignOwnerEdit)
                                                            }}>
                                                                <TimesIconRed />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }

                                                {
                                                    !showCampaignOwnerEdit &&
                                                    <div className="flex justify-center items-center gap-2 w-full">
                                                        <TextField
                                                            label="Campaign Owner"
                                                            placeholder="Campaign Owner"
                                                            value={capitalizeAllFirstLetters(ownerIdStr)}
                                                            disabled={true}
                                                        />
                                                        <div className="w-auto cursor-pointer mt-4" onClick={() => {
                                                            setShowCampaignOwnerEdit(!showCampaignOwnerEdit)
                                                        }}>
                                                            <EditIcon />
                                                        </div>
                                                    </div>
                                                }
                                            </>
                                        }

                                        {
                                            !showStartDateEdit &&
                                            <div className="flex justify-center items-center gap-2 w-full">
                                                <TextField
                                                    label="Start Date"
                                                    placeholder="Start Date"
                                                    value={new Date(startDateStr).toLocaleDateString()}
                                                    disabled={true}
                                                />
                                                <div className="w-auto cursor-pointer mt-4" onClick={() => {
                                                    setShowStartDateEdit(!showStartDateEdit)
                                                }}>
                                                    <EditIcon />
                                                </div>
                                            </div>
                                        }

                                        {
                                            showStartDateEdit &&
                                            <div className="flex justify-center items-center gap-2 w-full">
                                                <TextField
                                                    label="Start Date"
                                                    placeholder="Start Date Here"
                                                    {...formik.getFieldProps("start_date")}
                                                    type="date"
                                                />
                                                <div className="w-auto cursor-pointer mt-4" onClick={() => {
                                                    setShowStartDateEdit(!showStartDateEdit)
                                                }}>
                                                    <TimesIconRed />
                                                </div>
                                            </div>
                                        }

                                        {
                                            !showEndDateEdit &&
                                            <div className="flex justify-center items-center gap-2 w-full">
                                                <TextField
                                                    label="End Date"
                                                    placeholder="End Date"
                                                    value={new Date(endDateStr).toLocaleDateString()}
                                                    disabled={true}
                                                />
                                                <div className="w-auto cursor-pointer mt-4" onClick={() => {
                                                    setShowEndDateEdit(!showEndDateEdit)
                                                }}>
                                                    <EditIcon />
                                                </div>
                                            </div>
                                        }

                                        {
                                            showEndDateEdit &&
                                            <div className="flex justify-center items-center gap-2 w-full">
                                                <TextField
                                                    label="End Date"
                                                    placeholder="End Date Here"
                                                    {...formik.getFieldProps("end_date")}
                                                    type="date"
                                                    //error={formik.touched.name ? formik.errors.name : undefined}
                                                />
                                                <div className="w-auto cursor-pointer mt-4" onClick={() => {
                                                    setShowEndDateEdit(!showEndDateEdit)
                                                }}>
                                                    <TimesIconRed />
                                                </div>
                                            </div>
                                        }
                                        
                                        <div className="flex flex-col justify-center items-center gap-2 w-full">
                                            <p className="text-sm w-full">Campaign Category</p>
                                            <Select
                                                options={[
                                                    {
                                                        value: 'all',
                                                        label: 'All'
                                                    },
                                                    {
                                                        value: 'rider',
                                                        label: 'Rider'
                                                    },
                                                    {
                                                        value: 'driver',
                                                        label: 'Driver'
                                                    }
                                                ]}
                                                className="w-full"
                                                onKeyDown={(e: any) => {
                                                    setSearch(e.target.value)
                                                }}
                                                onChange={(optX: any) => {
                                                    formik.setFieldValue('category', optX.value)
                                                }}
                                            />
                                        </div>

                                        <div className="flex flex-col justify-center items-center gap-2 w-full">
                                            <p className="text-sm w-full">Add Referred Drivers</p>
                                            <Select
                                                options={
                                                    drivers?.data?.map((d: any) => {
                                                        return {
                                                            value: d.driverId,
                                                            label: capitalizeAllFirstLetters(d.fullName)
                                                        }
                                                    })
                                                }
                                                className="w-full"
                                                onKeyDown={(e: any) => {
                                                    setSearchDriver(e.target.value)
                                                }}
                                                onChange={(optX: any) => {
                                                    handleTagAddition(optX)
                                                }}
                                            />
                                        </div>

                                        <div className="flex flex-col justify-center items-center gap-2 w-full">
                                            <p className="text-sm w-full">Add Referred Riders</p>
                                            <Select
                                                options={
                                                    allRiders?.data?.map((d: any) => {
                                                        return {
                                                            value: d.riderId,
                                                            label: capitalizeAllFirstLetters(d.fullName)
                                                        }
                                                    })
                                                }
                                                className="w-full"
                                                onKeyDown={(e: any) => {
                                                    setSearchRider(e.target.value)
                                                }}
                                                onChange={(optX: any) => {
                                                    handleTagAddition(optX)
                                                }}
                                            />
                                        </div>
                                            {
                                                includedUsers.length > 0 && 
                                                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                                {includedUsers?.map((t: any) => (
                                                <div className="mx-2 bg-[#F8F8F8] rounded-md p-3 mt-2 mb-3" style={{width: 'fit-content', display: 'flex'}}><span className="mx-1">{capitalizeAllFirstLetters(t.label)}</span><span className="mx-1 mt-1 cursor-pointer" onClick={() => {handleTagDelete(t)}}><TimesIconRed /></span></div>
                                                ))}
                                                </div>
                                            }

                                        <div className="flex justify-end">
                                            <Button
                                                title="Edit Campaign"
                                                className="!text-[16px] mt-6"
                                                size="large"
                                                type="submit"
                                                disabled={isLoading}
                                                loading={isLoading}
                                            />
                                        </div>
                                    </div>
                                </Form>
                            </FormikProvider>
                        </div>
                    </Card>
                </div>
            </AppLayout>
        </>
    )
}

export default EditCampaign;