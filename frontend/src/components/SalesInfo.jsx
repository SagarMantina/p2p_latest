import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import '../styles/SalesInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { faGamepad, faShoppingCart, faChartLine } from '@fortawesome/free-solid-svg-icons';
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SalesInfo() {
  const [totalGames, setTotalGames] = useState(103);
  const [totalPurchases, setTotalPurchases] = useState(50);
   const [todaySales ,setTodaySales] = useState(0);
  const [salesIncrease, setSalesIncrease] = useState(1);

  const [sellingData, setSellingData] = useState({
    labels: [],
    datasets: [{ label: 'Number of Sales', data: [], backgroundColor: '#4299e1' }],
  });
  const [profitedData, setProfitedData] = useState({
    labels: [],
    datasets: [{ label: 'Total Profit ($)', data: [], backgroundColor: '#16eca5' }],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dashboard metrics
        const metricsResponse = await fetch(`${baseUrl}/admin_data`);
        const metricsJson = await metricsResponse.json();
        setTotalGames(metricsJson.total_games);
        setTotalPurchases(metricsJson.total_purchases);
        setTodaySales(metricsJson.today_sales);
        setSalesIncrease(metricsJson.sales_increase);
        
        // Fetch top-selling games data
        const sellingResponse = await fetch(`${baseUrl}/api/top-selling`);
        
        const sellingJson = await sellingResponse.json();
        const sellingGames = sellingJson.data.map(game => game.game_name);
        const sellingCounts = sellingJson.data.map(game => game.quantity_sold);
        setSellingData({
          labels: sellingGames,
          datasets: [{ label: 'Number of Sales', data: sellingCounts, backgroundColor: '#4299e1' }],
        });

        // Fetch top-revenue games data
        const profitedResponse = await fetch(`${baseUrl}/api/top-revenue`);
    
        const profitedJson = await profitedResponse.json();
        const profitedGames = profitedJson.data.map(game => game.game_name);
        const profits = profitedJson.data.map(game => game.totalRevenue);
        setProfitedData({
          labels: profitedGames,
          datasets: [{ label: 'Total Profit ($)', data: profits, backgroundColor: '#16eca5' }],
        });

        
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Sales Information',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
      </div>
      <div className="dashboard-metrics" style={{display:'flex'}}>
        <div className="metric-card">
          <FontAwesomeIcon icon={faGamepad} className="metric-icon" />
          <h2>Total Games</h2>
          <p>{totalGames}</p>
        </div>
        <div className="metric-card">
          <FontAwesomeIcon icon={faShoppingCart} className="metric-icon" />
          <h2>Total Purchases</h2>
          <p>{totalPurchases}</p>
        </div>
        <div className="metric-card">
          <FontAwesomeIcon icon={faChartLine} className="metric-icon" />
          <h2>Sales Today</h2>
          <p>{todaySales}</p>
          <small>{salesIncrease}% increase</small>
        </div>
        
      </div>
      <div className="chart-container">
        <div className="graph-title">Most Selling Games</div>
        <Bar data={sellingData} options={chartOptions} />
      </div>
      <div className="chart-container">
        <div className="graph-title">Most Profited Games</div>
        <Bar data={profitedData} options={chartOptions} />
      </div>
      
    </div>
  );
}

export default SalesInfo;
