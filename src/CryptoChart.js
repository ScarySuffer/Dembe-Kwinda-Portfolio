// src/CryptoChart.js
import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  ArcElement,          // for doughnut
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const CryptoChart = ({
  title = "Chart",
  timestamps,
  values,
  labels,           // for doughnut chart (e.g. ["Bitcoin", "Ethereum", "Others"])
  label = "Value",
  color = 'rgba(75,192,192,1)',
  type = "line"    // 'line', 'bar', or 'doughnut'
}) => {

  let data;
  let options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
      title: {
        display: true,
        text: title,
        font: { size: 18 }
      }
    },
  };

  if (type === "doughnut") {
    // For doughnut, use labels & values arrays, colors can be an array too
    data = {
      labels: labels || ["Bitcoin", "Ethereum", "Others"],
      datasets: [{
        label: label,
        data: values || [60, 25, 15],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',  // Bitcoin - red
          'rgba(54, 162, 235, 0.7)',  // Ethereum - blue
          'rgba(255, 206, 86, 0.7)'   // Others - yellow
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
      }]
    };
    options.plugins.tooltip.mode = 'nearest';
  } else {
    // For line or bar charts - time series
    data = {
      labels: timestamps?.map(t =>
        new Date(t).toLocaleString('en-ZA', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      ) || [],
      datasets: [
        {
          label: label,
          data: values || [],
          borderColor: color,
          backgroundColor: type === "bar" ? color.replace(/1\)$/, '0.5)') : 'transparent',
          fill: type === "line",
          tension: 0.3,
        },
      ],
    };
    options.scales = {
      x: { title: { display: true, text: 'Time' } },
      y: { title: { display: true, text: label }, beginAtZero: false }
    };
  }

  return (
    <div
      style={{
        marginBottom: '40px',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      }}
    >
      <h3>{title}</h3>
      {type === "line" && <Line data={data} options={options} />}
      {type === "bar" && <Bar data={data} options={options} />}
      {type === "doughnut" && <Doughnut data={data} options={options} />}
    </div>
  );
};

export default CryptoChart;
