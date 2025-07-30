// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import CryptoChart from './CryptoChart';
import './Dashboard.css';

const mockData = [
  { timestamp: Date.now() - 60000 * 5, price: 30000, market_cap: 600000000, volume: 35000000 },
  { timestamp: Date.now() - 60000 * 4, price: 30250, market_cap: 605000000, volume: 36000000 },
  { timestamp: Date.now() - 60000 * 3, price: 30100, market_cap: 602000000, volume: 35500000 },
  { timestamp: Date.now() - 60000 * 2, price: 30300, market_cap: 607000000, volume: 36200000 },
  { timestamp: Date.now() - 60000 * 1, price: 30450, market_cap: 610000000, volume: 36500000 },
  { timestamp: Date.now(),           price: 30500, market_cap: 612000000, volume: 37000000 },
];

// Mock market dominance data for doughnut chart
const marketDominanceMock = {
  labels: ["Bitcoin", "Ethereum", "Other Coins"],
  values: [60, 25, 15],
};

export default function Dashboard() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/historical')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch historical data');
        return res.json();
      })
      .then(data => {
        setChartData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(err.message);
        setChartData(mockData);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="dashboard-container">Loading dashboard...</p>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📊 Crypto Dashboard</h1>
      {error && <p className="error-message">Error fetching live data: {error}. Showing fallback data.</p>}
      <DashboardCharts data={chartData} />
      <MarketDominanceChart />
    </div>
  );
}

function DashboardCharts({ data }) {
  const timestamps = data.map(d => d.timestamp);
  const prices = data.map(d => d.price);
  const marketCaps = data.map(d => d.market_cap);
  const volumes = data.map(d => d.volume);

  return (
    <>
      <CryptoChart
        title="BTC Price Trend"
        timestamps={timestamps}
        values={prices}
        label="Price (USD)"
        color="rgba(255, 99, 132, 1)"
        type="line"
      />
      <CryptoChart
        title="Market Cap Over Time"
        timestamps={timestamps}
        values={marketCaps}
        label="Market Cap (USD)"
        color="rgba(54, 162, 235, 1)"
        type="bar"
      />
      <CryptoChart
        title="Trading Volume"
        timestamps={timestamps}
        values={volumes}
        label="Volume (USD)"
        color="rgba(255, 206, 86, 1)"
        type="line"
      />
    </>
  );
}

function MarketDominanceChart() {
  // Using mock dominance data
  const labels = marketDominanceMock.labels;
  const values = marketDominanceMock.values;

  return (
    <CryptoChart
      title="Cryptocurrency Market Share Dominance"
      labels={labels}
      values={values}
      label="Market Share (%)"
      type="doughnut"
    />
  );
}
