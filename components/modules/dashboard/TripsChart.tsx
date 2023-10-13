import React, { FC } from "react";
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
        display: false,
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
  chartData?: number[]
  labels: string[]
}

const TripsChart: FC<Props> = ({ chartData, labels }) => {
  
  const isDay = labels.length === 7

  const data = {
    labels,
    datasets: [
      {
        label: isDay? "Trips for Day" : "Trips for month",
        data: chartData,
        backgroundColor: ["#FFF5D8"],
        hoverBackgroundColor: "#FFBF00",
        barPercentage: 0.6,
        maxBarThickness: 40,
        borderRadius: 8,
        borderSkipped: false,
        color: ["red"],
        fontSize: 30,
      },
    ],
  };

  return <Bar options={options} data={data} width={"30%"} />;
};

export default TripsChart;
