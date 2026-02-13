import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import AppLayout from "@/layouts/AppLayout";
import { TripsOptionsBarData } from "@/constants";
import CountHeader from "@/components/common/CountHeader";
import TripOrdersTable from "@/components/modules/Trips/TripOrdersTable";
import PendingTripsTable from "@/components/modules/Trips/PendingTripsTable";
import ActiveTripsTable from "@/components/modules/Trips/ActiveTripsTable";
import CompletedTripsTable from "@/components/modules/Trips/CompletedTripsTable";
import CancelledTripsTable from "@/components/modules/Trips/CancelledTripsTable";
import PendingOrdersTable from "@/components/modules/Trips/PendingOrdersTable";
import CancelledOrdersTable from "@/components/modules/Trips/CancelledOrdersTable";
import AppHead from "@/components/common/AppHead";
import ScheduledTripsTable from "@/components/modules/Trips/ScheduledTripsTable";
import TripsSearchFilterBar from "@/components/modules/Trips/TripsSearchFilterBar";
import TextField from "@/components/ui/Input/TextField/TextField";
import SearchIcon from "@/components/icons/SearchIcon";

const Trips: NextPage = () => {
  const [optionsList, setOptionsList] = useState([...TripsOptionsBarData]);
  const [tripTitle, setTripTitle] = useState<string>("");
  const [tripCount, setTripCount] = useState<number | undefined>(undefined);
  const router = useRouter();
  const { tab } = router.query;
  const tabOptions = [
    undefined,
    "pending",
    "active",
    "completed",
    "cancelled",
    "scheduled_trips"
  ];

  const filterOptions: {
    label: string;
    value: string;
    default: boolean;
  }[] = [
    { label: "Newest First", value: "newest_first", default: true },
    { label: "Oldest First", value: "oldest_first", default: false },
  ];
  const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
    filterOptions.find((opt) => opt.default === true)?.value || "newest_first"
  );
  const [tableSearch, setTableSearch] = useState<string>("");

  enum Tab {
    TRIP_ORDERS,
    PENDING_TRIPS,
    ACTIVE_TRIPS,
    COMPLETED_TRIPS,
    CANCELLED_TRIPS,
    SCHEDULED_TRIPS
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

    setTripTitle(currentTab);
    handleActiveTab(currentKey);
  }, [tab]);

  const handleFilterOptionChanged = (val: string) => {
    setSelectedFilterOption(val);
  };

  return (
    <>
      <AppHead title="Kabukabu | Trips" />
      <AppLayout>
        <div className="w-full bg-transparent rounded-lg flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CountHeader title={tripTitle} count={tripCount} />
          <div className="w-full sm:w-[15vw]">
            <TextField
              startIcon={<SearchIcon />}
              className="!bg-[#E6E6E6]"
              placeholder="Search here"
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
            />
          </div>
        </div>
        <TripsSearchFilterBar
          options={optionsList}
          handleClickOption={(keyVal) => {
            handleClickOption(keyVal);
          }}
          filterOptions={filterOptions}
          handleDropDown={(val) => handleFilterOptionChanged(String(val))}
          dropDownOptionSelected={selectedFilterOption}
        />

        {tab === tabOptions[Tab.TRIP_ORDERS] && (
          <TripOrdersTable
            setTripCount={setTripCount}
            tableSearch={tableSearch}
            order={selectedFilterOption}
          />
        )}
        {tab === tabOptions[Tab.PENDING_TRIPS] && (
          <PendingTripsTable
            setTripCount={setTripCount}
            tableSearch={tableSearch}
            order={selectedFilterOption}
          />
        )}
        {tab === tabOptions[Tab.ACTIVE_TRIPS] && (
          <ActiveTripsTable
            setTripCount={setTripCount}
            tableSearch={tableSearch}
            order={selectedFilterOption}
          />
        )}
        {tab === tabOptions[Tab.COMPLETED_TRIPS] && (
          <CompletedTripsTable
            setTripCount={setTripCount}
            tableSearch={tableSearch}
            order={selectedFilterOption}
          />
        )}
        {tab === tabOptions[Tab.CANCELLED_TRIPS] && (
          <CancelledTripsTable
            setTripCount={setTripCount}
            tableSearch={tableSearch}
            order={selectedFilterOption}
          />
        )}
        {tab === tabOptions[Tab.SCHEDULED_TRIPS] && (
          <ScheduledTripsTable
            setTripCount={setTripCount}
            tableSearch={tableSearch}
            order={selectedFilterOption}
          />
        )}
      </AppLayout>
    </>
  );
};

export default Trips;
