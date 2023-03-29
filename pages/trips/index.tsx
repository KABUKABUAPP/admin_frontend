import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import AppLayout from "@/layouts/AppLayout";
import TripsOptionBar from "@/components/modules/Trips/TripsOptionBar";
import { TripsOptionsBarData } from "@/constants";
import SearchFilterBar from "@/components/common/SearchFilterBar";
import CountHeader from "@/components/common/CountHeader";
import TripOrdersTable from "@/components/modules/Trips/TripOrdersTable";
import PendingTripsTable from "@/components/modules/Trips/PendingTripsTable";
import ActiveTripsTable from "@/components/modules/Trips/ActiveTripsTable";
import CompletedTripsTable from "@/components/modules/Trips/CompletedTripsTable";
import CancelledTripsTable from "@/components/modules/Trips/CancelledTripsTable";

const Trips: NextPage = () => {
  const [optionsList, setOptionsList] = useState([...TripsOptionsBarData]);
  const [tripTitle, setTripTitle] = useState<string>("");
  const [tripCount, setTripCount] = useState<number>(8);
  const router = useRouter();
  const { tab } = router.query;
  const tabOptions = [undefined, "pending", "active", "completed", "cancelled"];
  enum Tab {
    TRIP_ORDERS,
    PENDING_TRIPS,
    ACTIVE_TRIPS,
    COMPLETED_TRIPS,
    CANCELLED_ORDERS,
  }

  const handleClickOption = (keyVal: string) => {
    if (keyVal !== "")
      router.push(`/trips?tab=${keyVal}`, undefined, { shallow: true });
    else router.push(`/trips`, undefined, { shallow: true });
  };

  const handleActiveTab = (keyVal: string) => {
    const mutatedOptions = optionsList.map((item) => {
      return item.keyVal === keyVal
        ? { ...item, isActive: true }
        : { ...item, isActive: false };
    });
    setOptionsList(mutatedOptions);
  };

  useEffect(() => {
    let currentTab = "";
    let currentKey = "";
    if (tab) {
      const option = optionsList.filter((t) => t.keyVal === tab)[0];
      currentTab = option?.title;
      currentKey = option?.keyVal;
    } else {
      currentTab = "Trip Orders";
      currentKey = "";
    }

    setTripTitle(currentTab)
    handleActiveTab(currentKey)
  }, [tab]);

  return (
    <AppLayout>
      <CountHeader title={tripTitle} count={tripCount} />
      <TripsOptionBar
        options={optionsList}
        handleClickOption={(keyVal) => {
          handleClickOption(keyVal);
        }}
      />
      <SearchFilterBar />
      {tab === tabOptions[Tab.TRIP_ORDERS] && <TripOrdersTable />}
      {tab === tabOptions[Tab.PENDING_TRIPS] && <PendingTripsTable />}
      {tab === tabOptions[Tab.ACTIVE_TRIPS] && <ActiveTripsTable />}
      {tab === tabOptions[Tab.COMPLETED_TRIPS] && <CompletedTripsTable />}
      {tab === tabOptions[Tab.CANCELLED_ORDERS] && <CancelledTripsTable />}
    </AppLayout>
  );
};

export default Trips;
