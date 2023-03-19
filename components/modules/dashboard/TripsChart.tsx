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
        width: 0
      }
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
    padding: 10
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Trips for month",
      data: [40, 66, 23, 44, 55, 21, 12, 34, 56, 76, 22, 55],
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

const TripsChart: FC = () => {
  return <Bar options={options} data={data} width={"30%"} />;
};

export default TripsChart;
