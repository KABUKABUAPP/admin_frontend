import React, { useState } from "react";
import { NextPage } from "next";
import AppHead from "@/components/common/AppHead";
import WelcomeMessage from "@/components/modules/campaign/WelcomeMessageMarketer";
import MarketerNav from "@/components/modules/campaign/MarketerNav";
import MarketerMainView from "@/components/modules/campaign/MarketerMainView";

import { useUserContext } from "@/contexts/UserContext";
import { capitalizeAllFirstLetters } from "@/utils";

const Marketer: NextPage = () => {
    const { user } = useUserContext();

    console.log({user})

    return (
        <>
            <AppHead title="Kabukabu | Marketer" />
            <div style={{ backgroundColor: '#F8F8F8' }}>
                <MarketerNav />
                <WelcomeMessage
                    name={user ? capitalizeAllFirstLetters(user.full_name) : ""}
                    referral_code={user ? user.referral_code : ""}
                />
                <MarketerMainView />
            </div>
        </>
    )
}

export default Marketer;