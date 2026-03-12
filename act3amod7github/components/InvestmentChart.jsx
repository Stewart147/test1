// InvestmentChart.jsx

import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

// Register chart components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const InvestmentChart = ({ data, viewMode }) => {

  // Labels for x-axis (Year or Month)
  const labels = data.map(item => item.period);

  // Investment value for each period
  const values = data.map(item => item.valueEndOfPeriod);

  // Chart dataset
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Investment Growth",
        data: values,
        borderColor: "#3498db",
        backgroundColor: "#3498db",
        tension: 0.3, // smooth line
        pointRadius: 3
      }
    ]
  };

  // Chart configuration
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: viewMode === "monthly" ? "Months" : "Years"
        }
      },
      y: {
        title: {
          display: true,
          text: "Investment Value ($)"
        }
      }
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
      <h3 style={{ textAlign: "center" }}>Investment Growth Chart</h3>

      {/* Render line chart */}
      <Line data={chartData} options={options} />
    </div>
  );
};

export default InvestmentChart;