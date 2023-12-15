import React, { FC, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useGetConcentratedOrdersQuery } from "@/api-services/dashboardService";
import Loader from "@/components/ui/Loader/Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.color = "#000";
ChartJS.defaults.font.size = 12;

export const options: any = {
  indexAxis: 'x',
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

interface Props {
    chartData: any;
    chartDataLoading: boolean;
    type: string;
}


const OnboardingChart: FC<Props> = ({chartData, chartDataLoading, type}) => {
    
    const data = {
        labels: chartData?.thePeriod,
        datasets: [
        {
            label: `${type} Onboarding`,
            data:  chartData?.theData,
            backgroundColor: ["#FFBF00"],
            hoverBackgroundColor: "#9747FF",
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
            {chartData && <Line options={options} data={data} />}
            {chartDataLoading && <Loader />}
        </>
    )
};

export default OnboardingChart;
