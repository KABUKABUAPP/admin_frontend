import { useCreateCampaignMutation, useGetMarketingStaffsQuery, useViewCampaignQuery } from "@/api-services/campaignService";
import ActionBar from "@/components/common/ActionBar";
import AppHead from "@/components/common/AppHead";
import Card from "@/components/common/Card";
import UserInfoCard from "@/components/common/UserInfoCard";
import AddIcon from "@/components/icons/AddIcon";
import EditIcon from "@/components/icons/EditIcon";
import ViewFarePriceLayout from "@/components/modules/fare-prices/ViewFarePriceLayout";
import ViewStaffLayout from "@/components/modules/staff/ViewStaffLayout";
import Button from "@/components/ui/Button/Button";
import MarketerNav from "@/components/modules/campaign/MarketerNav";
import TextField from "@/components/ui/Input/TextField/TextField";
import Loader from "@/components/ui/Loader/Loader";
import AppLayout from "@/layouts/AppLayout";
import { capitalizeAllFirstLetters } from "@/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";


const ViewCampaignMine = () => {
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
        <div style={{ backgroundColor: '#F8F8F8' }}>
            <AppHead title="Kabukabu | Repair Loan" />
            <MarketerNav />
            <div className="p-5">
                <ActionBar></ActionBar>
            </div>
            <div className="px-5 pb-5">
                <div className="mx-auto w-[90%] flex flex-col md:flex-row my-1 gap-5">
                    {
                        isLoading && !data &&
                        <div className="flex justify-center items-center">
                            <Loader />
                        </div>
                    }
                </div>
                {
                    !isLoading && data &&
                    <ViewFarePriceLayout 
                        asideComponents={
                            <div className="flex flex-col gap-4">
                                <Card bg="#FFF">
                                    <div className="flex flex-col gap-3 w-full">
                                        <div className="flex flex-col gap-4 border-b border-b-[#E6E6E6] last:border-none py-4">
                                            <p className="text-sm text-[#000000] font-semibold">Campaign Name</p>
                                            <p className="text-lg font-bold">{capitalizeAllFirstLetters(data?.campaign_details?.name)}</p>
                                        </div>
                                        <div className="flex flex-col gap-4 border-b border-b-[#E6E6E6] last:border-none py-4">
                                            <p className="text-sm text-[#000000] font-semibold">Owned By</p>
                                            <p className="text-lg font-bold">{capitalizeAllFirstLetters(data?.campaign_details?.owner)}</p>
                                        </div>
                                        <div className="flex flex-col gap-4 border-b border-b-[#E6E6E6] last:border-none py-4">
                                            <p className="text-sm text-[#000000] font-semibold">Start date</p>
                                            <p className="text-lg font-bold">{new Date(data?.campaign_details?.start_date).toLocaleString()}</p>
                                        </div>
                                        {
                                            data?.campaign_details?.end_date &&
                                            <div className="flex flex-col gap-4 border-b border-b-[#E6E6E6] last:border-none py-4">
                                                <p className="text-sm text-[#000000] font-semibold">End date</p>
                                                <p className="text-lg font-bold">{new Date(data?.campaign_details?.end_date).toLocaleString()}</p>
                                            </div>
                                        }
                                    </div>
                                </Card>

                                <Card bg="#FFF">
                                    <p className="text-center font-bold text-md my-1">Drivers</p>
                                    {
                                        data?.direct_drivers_onboarded?.totalCount >= 0 &&
                                        <div className="flex flex-col gap-4 border-b border-b-[#E6E6E6] last:border-none py-4">
                                            <p className="text-sm text-[#000000] font-semibold">Total Drivers Onboarded</p>
                                            <p className="text-lg font-bold">{`${data?.direct_drivers_onboarded?.totalCount}`}</p>
                                        </div>
                                    }
                                    {
                                        data?.direct_drivers_onboarded?.total_approved >= 0 &&
                                        <div className="flex flex-col gap-4 border-b border-b-[#E6E6E6] last:border-none py-4">
                                            <p className="text-sm text-[#000000] font-semibold">Total Drivers Approved</p>
                                            <p className="text-lg font-bold">{`${data?.direct_drivers_onboarded?.total_approved}`}</p>
                                        </div>
                                    }
                                    {
                                        data?.direct_drivers_onboarded?.completed_onboarding >= 0 &&
                                        <div className="flex flex-col gap-4 border-b border-b-[#E6E6E6] last:border-none py-4">
                                            <p className="text-sm text-[#000000] font-semibold">Completed Onboarding</p>
                                            <p className="text-lg font-bold">{`${data?.direct_drivers_onboarded?.completed_onboarding}`}</p>
                                        </div>
                                    }
                                    {
                                        data?.direct_drivers_onboarded?.onboarding_incomplete >= 0 &&
                                        <div className="flex flex-col gap-4 border-b border-b-[#E6E6E6] last:border-none py-4">
                                            <p className="text-sm text-[#000000] font-semibold">Onboarding Incomplete</p>
                                            <p className="text-lg font-bold">{`${data?.direct_drivers_onboarded?.onboarding_incomplete}`}</p>
                                        </div>
                                    }
                                </Card>
                                    
                                <Card bg="#FFF">
                                    <p className="text-center font-bold text-md my-1">Riders</p>
                                    {
                                        data?.direct_riders_onboarded?.totalCount >= 0 &&
                                        <div className="flex flex-col gap-4 border-b border-b-[#E6E6E6] last:border-none py-4">
                                            <p className="text-sm text-[#000000] font-semibold">Total Riders Onboarded</p>
                                            <p className="text-lg font-bold">{`${data?.direct_riders_onboarded?.totalCount}`}</p>
                                        </div>
                                    }
                                </Card>
                            </div>
                        }

                        mainComponents={
                            <>
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
                            </>
                        }
                    />
                }
            </div>
        </div>
    )
}

export default ViewCampaignMine;