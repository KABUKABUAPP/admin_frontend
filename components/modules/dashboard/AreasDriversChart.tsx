import React, { FC, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useGetConcentratedDriversQuery } from "@/api-services/dashboardService";
import Loader from "@/components/ui/Loader/Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.color = "#000";
ChartJS.defaults.font.size = 12;

export const options: any = {
  indexAxis: 'y',
  responsive: true,
  scaleShowLabels: false,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        display: true,
      },
      border: {
        width: 0,
      },
    },
  },
  plugins: {
    legend: {
      position: "right",
      display: false,
    },

    title: {
      display: false,
      text: "Device States",
    },
  },
  layout: {
    padding: 10,
  },
};


const AreasDriversChart: FC = () => {
    const {
        data: chartDataDrivers,
        isLoading: chartDataLoading,
        isError: chartDataError,
        refetch: chartDataRefetch,
    } = useGetConcentratedDriversQuery({ refetchOnReconnect: true });
    
    const data = {
        labels: chartDataDrivers?.areas,
        datasets: [
        {
            label: "Areas with Most Drivers",
            data:  chartDataDrivers?.drivers,
            backgroundColor: ["#977100"],
            hoverBackgroundColor: "#FFBF00",
            barPercentage: 0.6,
            maxBarThickness: 80,
            borderRadius: 4,
            borderSkipped: false,
            color: ["red"],
            fontSize: 30,
        },
        ],
    };

    return (
        <>
            {chartDataDrivers && <Bar options={options} data={data} width={"30%"} />}
            {chartDataLoading && <Loader />}
        </>
    )
};

export default AreasDriversChart;
