import { NextPage } from 'next';
import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import { useViewTeamQuery } from "@/api-services/teamService";
import { capitalizeAllFirstLetters } from '@/utils';

import Card from "@/components/common/Card";

function formatTimeToString(timeString: string) {
    const options: any = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
  
    const date = new Date(timeString);
    return date.toLocaleDateString('en-US', options);
}

const TeamInfoCard: NextPage = () => {
    const { id } = useRouter().query;
  
    const { data, isLoading, error, refetch } = useViewTeamQuery(
      { teamId: String(id) },
      { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
    );

    return (
        <Card bg={"#FFFFFF"}>
            <div className="p-1">
                <ul className="pl-1">
                    <li className="mt-4 mb-2 border-b border-gray-300">
                        <p><small><b>{data?.team_id}</b></small></p>
                        <p>{capitalizeAllFirstLetters(data?.name)}</p>
                    </li>
                    <li className="mt-4 mb-2 border-b border-gray-300">
                        <p><small><b>Audience Type</b></small></p>
                        <p><b>{capitalizeAllFirstLetters(data?.audience)}</b></p>
                    </li>
                    <li className="mt-4 mb-2 border-b border-gray-300">
                        <p><small><b>Total Onboarded</b></small></p>
                        <p><b>{data?.total_drivers_onboarded}</b></p>
                    </li>
                    <li className="mt-4 mb-2">
                        <p><small><b>Created on {formatTimeToString(data?.created_at)}</b></small></p>
                    </li>
                </ul>
            </div>
        </Card>
    )
}

export default TeamInfoCard