import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashboardChart({ data }) {
  const chartData = {
    labels: [
      "Income",
      "Expenses",
      "Profit",
      "Estimated Tax",
      "GST Payable",
      "TDS",
    ],
    datasets: [
      {
        label: "₹ Value",
        data: [
          data.income,
          data.expenses,
          data.profit,
          data.estimated_tax,
          data.gst_payable,
          data.tds_deducted,
        ],
        backgroundColor: [
          "#4caf50",
          "#f44336",
          "#2196f3",
          "#ff9800",
          "#9c27b0",
          "#607d8b",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Balance Sheet Overview",
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `₹ ${tooltipItem.raw.toLocaleString()}`,
              },
            },
          },
        }}
      />
    </div>
  );
}

export default DashboardChart;
