import React, { useState } from 'react'
import PerformanceChartContainer from "@/components/modules/marketer/PerformanceChartContainer";
import OnboardDriversTable from './OnboardDriversTable';
import { useGetTripChartDataQuery } from "@/api-services/dashboardService";
import Route from '@/components/icons/Route';
import RouteBlue from '@/components/icons/RouteBlue';

const MarketerMainView = () => {
    const [chartFilterVal, setChartFilterVal] = useState<string>("7_days");;
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
    } = useGetTripChartDataQuery(
        { range: chartFilterVal },
        { refetchOnReconnect: true, refetchOnMountOrArgChange: true }
    );

    return (
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 w-full p-4">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-2/6 w-full p-4">
                    <a href="#" className="text-black bg-white" style={{display: 'flex', borderRadius: '1rem'}}>
                        <span style={{margin: '1.5vh 1vw'}}>
                        <Route />
                        </span>
                        <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
                        <b>30</b><br />
                        <small>Drivers Onboarded Today</small>
                        </span>
                    </a>
                </div>
                <div className="md:w-2/6 w-full p-4">
                    <a href="#" className="text-black bg-white" style={{display: 'flex', borderRadius: '1rem'}}>
                        <span style={{margin: '1.5vh 1vw'}}>
                        <RouteBlue />
                        </span>
                        <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
                        <b>30</b><br />
                        <small>Drivers Onboarded This Week</small>
                        </span>
                    </a>
                </div>
                <div className="md:w-2/6 w-full p-4">
                    <a href="#" className="text-black bg-white" style={{display: 'flex', borderRadius: '1rem'}}>
                        <span style={{margin: '1.5vh 1vw'}}>
                        <RouteBlue />
                        </span>
                        <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
                        <b>N50,000</b><br />
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
                filterOptions={chartFilterOptions}
                handleDropDown={(val) => handleFilterChart(val)}
                dropDownOptionSelected={chartFilterVal}
              />
        </div>
  
        <div className="md:w-1/4 w-full p-4">
          <OnboardDriversTable />
        </div>
      </div>
    );
};
  
export default MarketerMainView;
  