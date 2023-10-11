import React, { useState } from "react";
import { NextPage } from "next";
import AppHead from "@/components/common/AppHead";
import WelcomeMessage from "@/components/modules/marketer/WelcomeMessageMarketer";
import MarketerNav from "@/components/modules/marketer/MarketerNav";
import MarketerMainView from "@/components/modules/marketer/MarketerMainView";

import { useUserContext } from "@/contexts/UserContext";
import { capitalizeAllFirstLetters } from "@/utils";

const Marketer: NextPage = () => {
    const { user } = useUserContext();

    return (
        <>
            <AppHead title="Kabukabu | Marketer" />
            <div style={{ backgroundColor: '#F8F8F8' }}>
                <MarketerNav />
                <WelcomeMessage
                    name={user ? capitalizeAllFirstLetters(user.full_name) : ""}
                />
                <MarketerMainView />
            </div>
        </>
    )
}

export default Marketer;