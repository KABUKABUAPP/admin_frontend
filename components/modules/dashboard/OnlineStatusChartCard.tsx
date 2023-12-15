import React, { FC, ReactNode, useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useGetInsightsQuery } from "@/api-services/dashboardService";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  title?: string;
  value?: string | number;
  icon?: ReactNode;
  iconBg?: string;
  loading?: boolean;
  periodFilter: string;
  onlineStatusChart: any;
}

const OnlineStatusChartCard: FC<Props> = ({ title, value, icon, iconBg = "#FFBF00", loading=false, periodFilter, onlineStatusChart }) => {
    

    const {
      data: tripsInsight,
      isLoading: tripsInsightsLoading,
      isError: tripsInsightError,
      refetch: reloadTrips,
    } = useGetInsightsQuery({filter: periodFilter}, { refetchOnReconnect: true });

    const dataSets = {
        labels: [],
        datasets: [
        {
            label: 'Drivers',
            data: [onlineStatusChart?.online, onlineStatusChart?.offline],
            backgroundColor: [
            '#1FD11B',
            '#9A9A9A'
            ],
            borderColor: [
            '#1FD11B',
            '#9A9A9A'
            ],
            borderWidth: 1,
        },
        ],
    };

    const options = {
        legend: {
            display: false
        },
        maintainAspectRatio: false, // Disable the aspect ratio lock
        responsive: true,
        aspectRatio: 1, // Set the width and height ratio (1:1 in this case for a square chart)
    };

    return (
        <div className="bg-[#FDFDFD] w-full max-w-[245px] gap-5 p-4 rounded-lg items-center">
            <div className="flex">
                <div className="w-1/2">
                    <div
                        className={`flex items-center justify-center w-8 h-8 rounded-lg mb-5 mt-4`}
                        style={{ backgroundColor: iconBg }}
                    >
                        {icon}
                    </div>
                    <div>
                        <p className="font-bold">{loading ? <Skeleton /> : onlineStatusChart?.online}</p>
                        <p className="text-xs">{title}</p>
                    </div>    
                </div>
                <div className="w-1/2">
                    <Doughnut data={dataSets} options={options} />
                </div>
            </div>
            <div className="flex">
                <div className="w-full">
                    <div className="flex my-3">
                        <p className="w-[1.25vw] h-3vh bg-[#1FD11B] mx-3"></p>
                        <p className="w-4/5 text-xs">{onlineStatusChart?.online} Drivers Online</p>
                    </div>
                    <div className="flex my-3">
                        <p className="w-[1.25vw] h-3vh bg-[#9A9A9A] mx-3"></p>
                        <p className="w-4/5 text-xs">{onlineStatusChart?.offline} Drivers Offline</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnlineStatusChartCard;
