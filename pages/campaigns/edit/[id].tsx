import { useCreateCampaignMutation, useGetMarketingStaffsQuery } from "@/api-services/campaignService";
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


const ViewCampaign = () => {
    const router = useRouter();
    const [search, setSearch] = useState<string>("");

    const { data: allStaff, isLoading: isStaffLoading, error: isErrorLoading, refetch, isError } = useGetMarketingStaffsQuery({
        search: search,
    })

    return (
        <>
            <AppHead title="Kabukabu | Repair Loan" />
            <AppLayout>
                <ActionBar></ActionBar>
                <div className="mx-auto w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] my-4">
                    <Card bg="#FFF">
                        <div className="flex flex-col gap-3 w-full">
                            Bybit Edit
                        </div>
                    </Card>
                </div>
            </AppLayout>
        </>
    )
}

export default ViewCampaign;