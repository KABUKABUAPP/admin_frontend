import { NextPage } from 'next';
import React, { useEffect } from "react";
import { useRouter } from 'next/router';

import Card from "@/components/common/Card";
import Button from '../ui/Button/Button';
import AddIcon from '../icons/AddIcon';
import Avatar from './Avatar';
import { useViewTeamQuery } from '@/api-services/teamService';
import { capitalizeAllFirstLetters, capitalizeFirstLetter } from '@/utils';

const AudienceOnboarded: NextPage = () => {
    const router = useRouter();
    const { id } = useRouter().query;
  
    const { data, isLoading, error, refetch } = useViewTeamQuery(
      { teamId: String(id) },
      { skip: !id, refetchOnMountOrArgChange: true, refetchOnReconnect: true }
    );
    
    return (
        <Card bg={"#FFFFFF"}>
            <div className="p-1">
                <div className="flex justify-between">
                    <h3>Team Members</h3>
                                
                    <Button
                        title="New Member"
                        color="secondary"
                        variant="outlined"
                        size="small"
                        startIcon={<AddIcon />}
                        className="!text-[#000] border-#FFBF00;"
                        onClick={() => {router.push('/staffs/teams/add-team')}}
                    />
                </div>
                
                <ul>
                    {data?.team_members.map((member: any) => (
                        <li className="mt-4 mb-2 border-b border-gray-300">
                            <Card>
                                <div className="flex p-1">
                                    <div className="w-1/5 mx-1">    
                                    <Avatar
                                        imageUrl={''}
                                        fallBack={capitalizeFirstLetter(member.full_name)[0]}
                                        size="md"
                                    />
                                    </div>
                                    <div className="w-4/5 pt-2 pl-2">
                                        <p className="text-[#000]"><b>{capitalizeAllFirstLetters(member.full_name)}</b></p>    
                                        <p className="text-[#9A9A9A]"><small>{member.drivers_onboarded} {capitalizeFirstLetter(data?.audience)}(s) Onboarded</small></p>
                                    </div>
                                </div>
                            </Card>
                        </li>
                    ))}
                    
                </ul>
            </div>
        </Card>
    )
}

export default AudienceOnboarded;