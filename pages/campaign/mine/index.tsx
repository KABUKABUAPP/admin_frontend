import { useGetCampaignsQuery, useGetMyCampaignsQuery } from "@/api-services/campaignService";
import AppHead from "@/components/common/AppHead";
import Card from "@/components/common/Card";
import EnhancedTable from "@/components/common/EnhancedTable/EnhancedTable";
import AddIcon from "@/components/icons/AddIcon";
import EditIcon from "@/components/icons/EditIcon";
import StaffTableHeadRow from "@/components/modules/staff/StaffTableHeadRow";
import Button from "@/components/ui/Button/Button";
import Loader from "@/components/ui/Loader/Loader";
import AppLayout from "@/layouts/AppLayout"
import { capitalizeAllFirstLetters } from "@/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MarketerNav from "@/components/modules/campaign/MarketerNav";

const CampaignMine = () => {
    const router = useRouter();
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const { data, isLoading, isError, refetch, error } = useGetMyCampaignsQuery(
        { start_date: startDate, end_date: endDate },
        { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
    );

    useEffect(() => {
        if (data) console.log({data})
    }, [data])

    const headCellData = [
        {
          title: "Campaign Name",
          flex: 1,
        },
        {
          title: "Date Created",
          flex: 1,
        },
        {
          title: "Date Start",
          flex: 1,
        },
        {
          title: "Date End",
          flex: 1,
        },
        {
          title: "Owner",
          flex: 1,
        },
      ];

    return (
        <>
            <AppHead title="Kabukabu | Marketer" />
            <div style={{ backgroundColor: '#F8F8F8' }}>
                <MarketerNav />
                <div className="w-full my-4 h-[70vh] overflow-y-scroll p-5">
                    {
                        !data && isLoading &&
                        <div className="flex justify-center items-center">
                            <Loader />
                        </div>
                    }
                    {
                        data && !isLoading &&
                        <EnhancedTable
                            TableHeadComponent={<StaffTableHeadRow headCellData={headCellData} />}
                            rowComponent={(row) => (
                                <div onClick={() => router.push(`/campaign/mine/${row.id}?tab=pending`)} className="flex p-3 py-5 gap-6 border-b border-b[#E6E6E6] cursor-pointer">
                                    <div style={{ flex: 1 }} className="flex items-center">
                                        <p className="text-xs font-bold cursor-pointer">{capitalizeAllFirstLetters(row.name)}</p>
                                    </div>

                                    <div style={{ flex: 1 }} className="flex items-center">
                                        <p className="text-xs font-bold">{new Date(row.createdAt).toLocaleString()}</p>
                                    </div>

                                    <div style={{ flex: 1 }} className="flex items-center">
                                        <p className="text-xs font-bold">{new Date(row.start_date).toLocaleString()}</p>
                                    </div>

                                    <div style={{ flex: 1 }} className="flex items-center">
                                        <p className="text-xs font-bold">{new Date(row.end_date).toLocaleString()}</p>
                                    </div>

                                    <div style={{ flex: 1 }} className="flex items-center">
                                        <p className="text-xs font-bold">{capitalizeAllFirstLetters(row.admin.full_name)}</p>
                                    </div>
                                </div>
                            )}
                            rowData={data?.data}
                            maxWidth="100vw"
                            isError={isError}
                            isLoading={isLoading}
                            refetch={refetch}
                            headCellData={headCellData}
                            headBg={'#FFF5D8'}
                        />
                    }  
                </div>
            </div>
        </>
    )
}

export default CampaignMine;