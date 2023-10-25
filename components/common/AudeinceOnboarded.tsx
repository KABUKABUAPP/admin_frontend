import { NextPage } from 'next';
import React, { useEffect } from "react";

import Card from "@/components/common/Card";
import Button from '../ui/Button/Button';
import AddIcon from '../icons/AddIcon';

const AudienceOnboarded: NextPage = () => {
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
                        className="!text-[#000] border-#FFBF00"
                    //onClick={handleDisableStaff}
                    />
                </div>
                
                <ul className="pl-1">
                    <li className="mt-4 mb-2 border-b border-gray-300">
                        <p><small><b>#12345</b></small></p>
                        <p>PR Team Alpha</p>
                    </li>
                    <li className="mt-4 mb-2 border-b border-gray-300">
                        <p><small><b>Audience Type</b></small></p>
                        <p><b>Drivers</b></p>
                    </li>
                    <li className="mt-4 mb-2 border-b border-gray-300">
                        <p><small><b>Total Onboarded</b></small></p>
                        <p><b>300</b></p>
                    </li>
                    <li className="mt-4 mb-2">
                        <p><small><b>Created on Jan 1 2022 at 5:30pm</b></small></p>
                    </li>
                </ul>
            </div>
        </Card>
    )
}

export default AudienceOnboarded;