import { useCreateCampaignMutation, useGetMarketingStaffsQuery, useViewCampaignQuery } from "@/api-services/campaignService";
import ActionBar from "@/components/common/ActionBar";
import AppHead from "@/components/common/AppHead";
import Card from "@/components/common/Card";
import UserInfoCard from "@/components/common/UserInfoCard";
import AddIcon from "@/components/icons/AddIcon";
import EditIcon from "@/components/icons/EditIcon";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/Input/TextField/TextField";
import Loader from "@/components/ui/Loader/Loader";
import AppLayout from "@/layouts/AppLayout";
import { capitalizeAllFirstLetters } from "@/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";


const ViewCampaign = () => {
    const router = useRouter();
    const [onboardView, setOnboardView] = useState('driver');
    const id = router.query.id;

    const { data, isLoading, error, refetch, isError } = useViewCampaignQuery({
        id
    })

    useEffect(() => {
        if (data) console.log({data})
    }, [data])

    return (
        <>
            <AppHead title="Kabukabu | Repair Loan" />
            <AppLayout>
                <ActionBar>
                    <div className="flex justify-end">
                        <Button
                            title="Edit Campaign"
                            startIcon={<EditIcon />}
                            size="large"
                            onClick={() => router.push(`/campaigns/edit/${id}`)}
                        /> 
                    </div>
                </ActionBar>
                <div className="mx-auto w-[90%] flex flex-col md:flex-row my-4 gap-5">
                    {
                        isLoading && !data &&
                        <div className="flex justify-center items-center">
                            <Loader />
                        </div>
                    }
                    {
                        !isLoading && data &&
                        <>
                            <div className="w-full md:w-1/2 h-auto flex flex-col gap-4">
                                <Card bg="#FFF">
                                    <div className="flex flex-col gap-3 w-full">
                                        <div className="flex justify-between">
                                            <p className="font-bold">Campaign Name</p>
                                            <p>{capitalizeAllFirstLetters(data?.campaign_details?.name)}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold">Owned By</p>
                                            <p>{capitalizeAllFirstLetters(data?.campaign_details?.owner)}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold">Start Date</p>
                                            <p>{new Date(data?.campaign_details?.start_date).toLocaleString()}</p>
                                        </div>
                                        {
                                            data?.campaign_details?.end_date &&
                                            <div className="flex justify-between">
                                                <p className="font-bold">End Date</p>
                                                <p>{new Date(data?.campaign_details?.end_date).toLocaleString()}</p>
                                            </div>
                                        }
                                    </div>
                                </Card>

                                <Card bg="#FFF">
                                    <p className="text-center font-bold text-md my-1">Drivers</p>
                                    {
                                        data?.direct_drivers_onboarded?.totalCount >= 0 &&
                                        <div className="flex justify-between my-1">
                                            <p className="font-bold">Total Drivers Onboarded</p>
                                            <p>{`${data?.direct_drivers_onboarded?.totalCount}`}</p>
                                        </div>
                                    }
                                    {
                                        data?.direct_drivers_onboarded?.total_approved >= 0 &&
                                        <div className="flex justify-between my-1">
                                            <p className="font-bold">Total Drivers Approved</p>
                                            <p>{`${data?.direct_drivers_onboarded?.total_approved}`}</p>
                                        </div>
                                    }
                                    {
                                        data?.direct_drivers_onboarded?.completed_onboarding >= 0 &&
                                        <div className="flex justify-between my-1">
                                            <p className="font-bold">Completed Onboarding</p>
                                            <p>{`${data?.direct_drivers_onboarded?.completed_onboarding}`}</p>
                                        </div>
                                    }
                                    {
                                        data?.direct_drivers_onboarded?.onboarding_incomplete >= 0 &&
                                        <div className="flex justify-between my-1">
                                            <p className="font-bold">Onboarding Incomplete</p>
                                            <p>{`${data?.direct_drivers_onboarded?.onboarding_incomplete}`}</p>
                                        </div>
                                    }
                                </Card>
                                    
                                <Card bg="#FFF">
                                    <p className="text-center font-bold text-md my-1">Riders</p>
                                    {
                                        data?.direct_riders_onboarded?.totalCount >= 0 &&
                                        <div className="flex justify-between my-1">
                                            <p className="font-bold">Total Riders Onboarded</p>
                                            <p>{`${data?.direct_riders_onboarded?.totalCount}`}</p>
                                        </div>
                                    }
                                    {/*<div className="flex justify-between my-1">
                                        <p className="font-bold">Total Riders Approved</p>
                                        <p>{data?.direct_riders_onboarded?.total_approved}</p>
                                    </div>
                                    <div className="flex justify-between my-1">
                                        <p className="font-bold">Completed Onboarding</p>
                                        <p>{data?.direct_riders_onboarded?.completed_onboarding}</p>
                                    </div>
                                    <div className="flex justify-between my-1">
                                        <p className="font-bold">Onboarding Incomplete</p>
                                        <p>{data?.direct_riders_onboarded?.onboarding_incomplete}</p>
                                    </div>*/}
                                </Card>
                            </div>
                            
                            <div className="w-full md:w-1/2 h-[70vh] overflow-y-scroll">
                                <Card bg={'#FFF'}>
                                    <div className="flex gap-4 mb-3">
                                        <p className={`w-auto cursor-pointer ${onboardView === 'driver' ? 'font-bold' : ''}`} onClick={() => setOnboardView('driver')}>Driver</p>
                                        <p>|</p>
                                        <p className={`w-auto cursor-pointer ${onboardView === 'rider' ? 'font-bold' : ''}`} onClick={() => setOnboardView('rider')}>Rider</p>
                                    </div>
                                    <div className="flex flex-col gap-3 w-full">
                                        <p className="text-center font-bold text-sm">{capitalizeAllFirstLetters(onboardView)} Onboarded</p>
                                        {
                                            onboardView === 'driver' && data?.direct_drivers_onboarded?.data?.map((driver: any) => (
                                                <UserInfoCard 
                                                    fullName={capitalizeAllFirstLetters(driver?.full_name)}
                                                    email={driver?.email}
                                                    referral_code={driver?.referral_code}
                                                    id={driver?._id}
                                                    totalReferredDrivers={driver?.total_drivers_referred}
                                                    totalReferredRiders={driver?.total_riders_referred}
                                                    image={driver?.profile_image}
                                                    bg="#f8f8f8"
                                                />
                                            ))
                                        }

                                        {
                                            
                                            onboardView === 'driver' && data?.direct_drivers_onboarded?.data?.length === 0 &&
                                            <p className="text-center my-4">No onboarded drivers</p>
                                        }

                                        {
                                            onboardView === 'rider' && data?.direct_riders_onboarded?.data?.map((rider: any) => (
                                                <UserInfoCard 
                                                    fullName={capitalizeAllFirstLetters(rider?.full_name)}
                                                    email={rider?.email}
                                                    referral_code={rider?.referral_code}
                                                    id={rider?._id}
                                                    totalReferredDrivers={rider?.total_drivers_referred}
                                                    totalReferredRiders={rider?.total_riders_referred}
                                                    image={rider?.profile_image}
                                                    bg="#f8f8f8"
                                                />
                                            ))
                                        }

                                        {
                                            onboardView === 'rider' && data?.direct_riders_onboarded?.data?.length === 0 &&
                                            <p className="text-center my-4">No onboarded riders</p>
                                        }
                                    </div>
                                </Card>
                            </div>
                        </>
                    }
                </div>
            </AppLayout>
        </>
    )
}

export default ViewCampaign;