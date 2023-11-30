import React, { useState, useEffect } from 'react'
import PerformanceChartContainer from "@/components/modules/marketer/PerformanceChartContainer";
import OnboardDriversTable from './OnboardDriversTable';
import { useGetMarketerQuery, useGetPerformanceChartDataQuery } from '@/api-services/marketerService';
import Route from '@/components/icons/Route';
import RouteBlue from '@/components/icons/RouteBlue';
import Cookies from "js-cookie";

const MarketerMainView = () => {
    const [onboardedDaily, setOnboardedDaily] = useState<string>('0')
    const [onboardedWeekly, setOnboardedWeekly] = useState<string>('0')
    const [marketerEarnings, setMarketerEarnings] = useState<string>('0')
    const [chartFilterVal, setChartFilterVal] = useState<string>("7_days");
    const [userType, setUserType] = useState('driver');
    const [userTypeText, setUserTypeText] = useState('Drivers');
    const [summaryView, setSummaryView] = useState(true)
    const driverBold = summaryView ? 'font-bold' : '';
    const riderBold = !summaryView ? 'font-bold' : '';
    
    const handleFilterChart = (val: string | Number) => {
      setChartFilterVal(val.toString());
    };
 
    const chartFilterOptions = [
        { value: "7_days", label: "Past Week", default: true },
        { value: "6_months", label: "Past 6 Months" },
        { value: "12_months", label: "Past 12 Months" },
    ];

    const {
        data: chartData,
        isLoading: chartLoading,
        isError: chartError,
        refetch: reloadChart,
    } = useGetPerformanceChartDataQuery(
        { limit: 10, page: 1, user_type: userType },
        { refetchOnReconnect: true, refetchOnMountOrArgChange: true }
    );
    const {
        data: marketerData, isLoading, isError, refetch
      } = useGetMarketerQuery(
        {limit: 10, page: 1, user_type: userType},
        { refetchOnReconnect: true, refetchOnMountOrArgChange: true }
      );

    useEffect(() => {
        if (marketerData) {
            setOnboardedDaily(marketerData.total_drivers_onboarded_today);
            setOnboardedWeekly(marketerData.total_drivers_onboarded_this_week);
            setMarketerEarnings(marketerData.total_earnings);
        }
    }, [marketerData])

    return (
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 w-full p-4">
            
            <div className="text-md flex">
            <p className={`cursor-pointer mx-5 ${driverBold}`} onClick={() => {
                setSummaryView(true);
                setUserTypeText('Drivers')
                setUserType('driver')
            }}>Driver</p>
            <p>|</p>
            <p className={`cursor-pointer mx-5 ${riderBold}`} onClick={() => {
                setSummaryView(false);
                setUserTypeText('Riders')
                setUserType('rider')
            }}>Rider</p>
            </div>

            <div className="flex flex-col md:flex-row">
                <div className="md:w-2/6 w-full p-4">
                    <a href="#" className="text-black bg-white" style={{display: 'flex', borderRadius: '1rem'}}>
                        <span style={{margin: '1.5vh 1vw'}}>
                        <Route />
                        </span>
                        <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
                        <b>{onboardedDaily}</b><br />
                        <small>{userTypeText} Onboarded Today</small>
                        </span>
                    </a>
                </div>
                <div className="md:w-2/6 w-full p-4">
                    <a href="#" className="text-black bg-white" style={{display: 'flex', borderRadius: '1rem'}}>
                        <span style={{margin: '1.5vh 1vw'}}>
                        <RouteBlue />
                        </span>
                        <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
                        <b>{onboardedWeekly}</b><br />
                        <small>{userTypeText} Onboarded This Week</small>
                        </span>
                    </a>
                </div>
                <div className="md:w-2/6 w-full p-4">
                    <a href="#" className="text-black bg-white" style={{display: 'flex', borderRadius: '1rem'}}>
                        <span style={{margin: '1.5vh 1vw'}}>
                        <RouteBlue />
                        </span>
                        <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
                        <b>N{marketerEarnings}</b><br />
                        <small>Your Earnings</small>
                        </span>
                    </a>
                </div>
            </div>

            <PerformanceChartContainer
                chartData={chartData}
                loading={chartLoading}
                error={chartError}
                refetch={reloadChart}
                handleDropDown={(val) => handleFilterChart(val)}
                dropDownOptionSelected={chartFilterVal}
              />
        </div>
  
        <div className="md:w-1/4 w-full p-4">
          <OnboardDriversTable type={userTypeText} />
        </div>
      </div>
    );
};
  
export default MarketerMainView;
  