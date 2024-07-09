import React, { FC, ReactNode, useState, useEffect } from "react";

import SummaryCard from "./SummaryCard";
import { useGetInsightsQuery } from "@/api-services/dashboardService";
import TripsIcon from "@/components/icons/TripsIcon";
import SosIcon from "@/components/icons/SosIcon";
import WithdrawalIcon from "@/components/icons/WithdrawalIcon";
import Button from "@/components/ui/Button/Button";
import UserIcon from "@/components/icons/UserIcon";
import UserSquareIcon from "@/components/icons/UserSquareIcon";
import Skeleton from "react-loading-skeleton";
import DropDownTwo from "@/components/ui/DropDownTwo";
import DriversChartCard from "./DriversChartCard";
import TripsChartCard from "./TripsChartCard";
import OnlineStatusChartCard from "./OnlineStatusChartCard";
import AreasDriversContainer from "./AreasDriversContainer";
import AreasOrdersContainer from "./AreasOrdersContainer";
import DriverOnboardingContainer from "./DriverOnboardingContainer";
import RiderOnboardingContainer from "./RiderOnboardingContainer";
import { useDashboardState } from "@/contexts/StateSegmentationContext";
import { useModalContext } from "@/contexts/ModalContext";
import Card from "@/components/common/Card";
import EditIcon from "@/components/icons/EditIcon";
import TimesIconRed from "@/components/icons/TimesIconRed";
import TextField from "@/components/ui/Input/TextField/TextField";

function convertDateToISOString(dateString: any) {
  // Check if the dateString matches the expected format YYYY-MM-DD
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!datePattern.test(dateString)) {
      throw new Error('Invalid date format. Expected format: YYYY-MM-DD');
  }

  // Create a new Date object from the input date string
  const dateParts = dateString.split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Month is zero-based in JS Date object
  const day = parseInt(dateParts[2], 10);

  // Create the Date object with the given year, month, and day
  const date = new Date(Date.UTC(year, month, day, 23, 0, 0));

  // Return the ISO string representation
  return date.toISOString();
}


const SetCustomDateRange:FC<any> = ({dayStart, dayEnd, setDayStart, setDayEnd, setRunRefetch}) => {
  const { setModalContent } = useModalContext();

  return (
    <div className="w-[90%] sm:w-[50%] md:w-[40%] mx-auto">
      <Card bg="#FFF">
        <div className="flex justify-end">
          <div className="w-auto cursor-pointer" onClick={() => {
            setModalContent(null)
          }}>
            <TimesIconRed />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-1/2 flex flex-col">
              <TextField
                label="Start Date"
                type="date"
                onChange={(val) => {
                  setDayStart(convertDateToISOString(val.target.value))
                }}
                disabled={false}
                value={dayStart}
              />
          </div>
          <div className="w-1/2 flex flex-col">
              <TextField
                label="End Date"
                type="date"
                onChange={(val) => {
                  setDayEnd(convertDateToISOString(val.target.value))
                }}
                disabled={false}
                value={dayEnd}
              />
          </div>
        </div>
        <div className="w-1/2 mt-3 mx-auto">
          <Button
             title="Proceed" 
             onClick={() => setRunRefetch(true)}
             className="w-full"
          />
        </div>
      </Card>
    </div>
  )
}

const SummaryCardContainer: FC = () => {
  const { setModalContent } = useModalContext()
  const [periodFilter, setPeriodFilter] = useState('today');
  const { dashboardState, setDashboardState } = useDashboardState();
  const [dayStart, setDayStart] = useState<any>();
  const [dayEnd, setDayEnd] = useState<any>();
  const [runRefetch, setRunRefetch] = useState<boolean>(false);
  const {
    data: tripsInsight,
    isLoading: tripsInsightsLoading,
    isError: tripsInsightError,
    refetch: reloadTrips,
  } = useGetInsightsQuery({filter: periodFilter, dashboard_state: dashboardState, dayStart: dayStart, dayEnd: dayEnd}, { refetchOnReconnect: true });

  const loadingState =
    !tripsInsight && !tripsInsightError && tripsInsightsLoading;
  const errorState =
    !tripsInsight && !tripsInsightsLoading && tripsInsightError;
  const viewState = !tripsInsightError && !tripsInsightsLoading && tripsInsight;

  const periodFilterOptions = [
    { label: "Here's your insight for yesterday", value: "YESTERDAY"},
    { label: "Here's your insight for today", value: "TODAY", default: true  },
    { label: "Here's your insight for the last two weeks", value: "LAST_2_WEEKS" },
    { label: "Here's your insight for this month", value: "THIS_MONTH" },
    { label: "Here's your insight for last 3 months", value: "LAST_3_MONTHS" },
    { label: "Here's your insight for last 6 months", value: "LAST_6_MONTHS" },
    { label: "Here's your insight for this year", value: "THIS_YEAR" },
    { label: "Here's your insight for last year", value: "LAST_YEAR" },
    { label: "Here's your insight for all time", value: "ALL_TIME" },
    { label: "Custom Date", value: "custom" }
  ];

  const handlePeriodFilter = (e: any) => {
    console.log(e)
    if (e === 'custom') {
      setModalContent(
        <SetCustomDateRange dayStart={dayStart} dayEnd={dayEnd} setDayStart={setDayStart} setDayEnd={setDayEnd} setRunRefetch={setRunRefetch} />
      )
    } else {
      setPeriodFilter(e)
    }
  }

  useEffect(() => {
    if (runRefetch) setModalContent(null);
  }, [runRefetch])

  return (
    <>
      <div className="mt-2 inline-block max-w-full">
        <DropDownTwo  
          placeholder="Here's your insight for today"
          options={periodFilterOptions}
          value={periodFilter}
          handleChange={(val) => {
            handlePeriodFilter(String(val));
          }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {viewState &&
          tripsInsight?.headerCard?.map((item: any, idx: any) => {
            return <SummaryCard {...item} icon={icons[item.title]} key={idx} />;
          })}
          {loadingState &&
          [
            "SOS",
            "Total Earnings",
            "Total Riders",
            /*"Total trips",
            "Active trips",
            "Pending trips",
            "Total Drivers"*/
          ].map((item, idx) => (
            <SummaryCard loading={loadingState} title={item} key={idx} />
          ))}
        {errorState && 
        <div>
          <p className="text-sm text-rose-600 mb-2">Oops! Error getting insights</p>
          <Button title="Reload Insights" onClick={reloadTrips} />
        </div>}
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DriversChartCard title="Total Drivers" icon={icons["Total Drivers"]} periodFilter={periodFilter} driversChart={tripsInsight?.driversChart} />
        
        <TripsChartCard title="Total Trips" icon={icons["Total trips"]} periodFilter={periodFilter} tripsChart={tripsInsight?.tripsChart} />
        
        <OnlineStatusChartCard title="Drivers Online" icon={icons["Total Drivers"]} periodFilter={periodFilter} onlineStatusChart={tripsInsight?.onlineStatusChart} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <AreasOrdersContainer />
        
        <AreasDriversContainer />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <DriverOnboardingContainer />
        
        <RiderOnboardingContainer />
      </div>
    </>
  );
};

export default SummaryCardContainer;

const icons: { [key: string]: ReactNode } = {
  "Total trips": <TripsIcon />,

  "Active trips": (
    <span style={{ color: "#fff" }}>
      <TripsIcon />
    </span>
  ),

  SOS: (
    <span style={{ color: "#ffffff" }}>
      <SosIcon />
    </span>
  ),

  "Pending trips": <TripsIcon />,

  "Total Earnings": <WithdrawalIcon />,

  "Total Drivers": <UserSquareIcon />,

  "Total Riders": <UserIcon />,
};
