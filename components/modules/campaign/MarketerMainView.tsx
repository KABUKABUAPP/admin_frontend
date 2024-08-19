import React, { useState, useEffect } from 'react'
import PerformanceChartContainer from "@/components/modules/campaign/PerformanceChartContainer";
import OnboardDriversTable from './OnboardDriversTable';
import { useGetMarketerDashboardQuery } from '@/api-services/marketerService';
import Route from '@/components/icons/Route';
import RouteBlue from '@/components/icons/RouteBlue';
import Loader from '@/components/ui/Loader/Loader';

const MarketerMainView = () => {
    const [chartFilterVal, setChartFilterVal] = useState<string>("7_days");
    const [userType, setUserType] = useState('rider');
    const [userTypeText, setUserTypeText] = useState('Drivers');
    const [summaryView, setSummaryView] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    
    const handleFilterChart = (val: string | Number) => {
      setChartFilterVal(val.toString());
    };
 
    const chartFilterOptions = [
        { value: "7_days", label: "Past Week", default: true },
        { value: "6_months", label: "Past 6 Months" },
        { value: "12_months", label: "Past 12 Months" },
    ];

    const {
        data: marketerData, isLoading, isError, refetch
      } = useGetMarketerDashboardQuery(
        {limit: 5, page: currentPage, user_type: userType},
        { refetchOnReconnect: true, refetchOnMountOrArgChange: true }
    );

    return (
        <>
            {
                isLoading ? 
                <Loader /> :
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-3/4 w-full p-4">
                        
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-2/6 w-full p-4">
                                <a href="#" className="text-black bg-white" style={{display: 'flex', borderRadius: '1rem'}}>
                                    <span style={{margin: '1.5vh 1vw'}}>
                                    <Route />
                                    </span>
                                    <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
                                    <b>{marketerData ? marketerData?.onboarded_drivers : 0}</b><br />
                                    <small>Drivers Onboarded</small>
                                    </span>
                                </a>
                            </div>
                            <div className="md:w-2/6 w-full p-4">
                                <a href="#" className="text-black bg-white" style={{display: 'flex', borderRadius: '1rem'}}>
                                    <span style={{margin: '1.5vh 1vw'}}>
                                    <RouteBlue />
                                    </span>
                                    <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
                                    <b>{marketerData ? marketerData?.online_drivers : 0}</b><br />
                                    <small>Drivers Online</small>
                                    </span>
                                </a>
                            </div>
                            <div className="md:w-2/6 w-full p-4">
                                <a href="#" className="text-black bg-white" style={{display: 'flex', borderRadius: '1rem'}}>
                                    <span style={{margin: '1.5vh 1vw'}}>
                                    <RouteBlue />
                                    </span>
                                    <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
                                    <b>{marketerData ? marketerData?.offline_drivers : 0}</b><br />
                                    <small>Drivers Offline</small>
                                    </span>
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-2/6 w-full p-4">
                                <a href="#" className="text-black bg-white" style={{display: 'flex', borderRadius: '1rem'}}>
                                    <span style={{margin: '1.5vh 1vw'}}>
                                    <Route />
                                    </span>
                                    <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
                                    <b>{marketerData ? marketerData?.pending_drivers : 0}</b><br />
                                    <small>Pending Drivers</small>
                                    </span>
                                </a>
                            </div>
                            <div className="md:w-2/6 w-full p-4">
                                <a href="#" className="text-black bg-white" style={{display: 'flex', borderRadius: '1rem'}}>
                                    <span style={{margin: '1.5vh 1vw'}}>
                                    <RouteBlue />
                                    </span>
                                    <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
                                    <b>{marketerData ? marketerData?.total_drivers : 0}</b><br />
                                    <small>Total Drivers</small>
                                    </span>
                                </a>
                            </div>
                            <div className="md:w-2/6 w-full p-4">
                                <a href="#" className="text-black bg-white" style={{display: 'flex', borderRadius: '1rem'}}>
                                    <span style={{margin: '1.5vh 1vw'}}>
                                    <RouteBlue />
                                    </span>
                                    <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
                                    <b>{marketerData ? marketerData?.offline_riders : 0}</b><br />
                                    <small>Riders Offline</small>
                                    </span>
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-2/6 w-full p-4">
                                <a href="#" className="text-black bg-white" style={{display: 'flex', borderRadius: '1rem'}}>
                                    <span style={{margin: '1.5vh 1vw'}}>
                                    <Route />
                                    </span>
                                    <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
                                    <b>{marketerData ? marketerData?.online_riders : 0}</b><br />
                                    <small>Online Riders</small>
                                    </span>
                                </a>
                            </div>
                            <div className="md:w-2/6 w-full p-4">
                                <a href="#" className="text-black bg-white" style={{display: 'flex', borderRadius: '1rem'}}>
                                    <span style={{margin: '1.5vh 1vw'}}>
                                    <RouteBlue />
                                    </span>
                                    <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
                                    <b>{marketerData ? marketerData?.total_riders : 0}</b><br />
                                    <small>Total Riders</small>
                                    </span>
                                </a>
                            </div>
                        </div>

                        <PerformanceChartContainer
                            chartData={marketerData?.bar_chart}
                            loading={isLoading}
                            error={isError}
                            refetch={refetch}
                            handleDropDown={(val) => handleFilterChart(val)}
                            dropDownOptionSelected={chartFilterVal}
                        />
                    </div>
            
                    <div className="md:w-1/4 w-full p-4">
                        <OnboardDriversTable type={userTypeText} data={marketerData?.latest_onboarded} handleCurrentPage={(e: any) => setCurrentPage(e)} currentPage={currentPage} />
                    </div>
                </div>
            }
        </>
    );
};
  
export default MarketerMainView;
  