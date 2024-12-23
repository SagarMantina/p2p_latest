import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import '../styles/Users.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faEye, faChartBar } from '@fortawesome/free-solid-svg-icons';
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Users = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [dailyVisits, setDailyVisits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/allusers`); // Replace with your API endpoint
        const data = await response.json();

        // Assuming the API response structure is:
        // { total_users: 120, total_visits: 2400, weekly_visits: [120, 200, 150, 80, 170, 220, 190] }
        setTotalUsers(data.total_users);
        setTotalVisits(data.total_visits);
        setDailyVisits(data.weekly_visits);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Visits',
        data: dailyVisits,
        fill: false,
        backgroundColor: '#4299e1',
        borderColor: '#4299e1',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Daily Visits',
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
          <FontAwesomeIcon icon={faUsers} className="metric-icon" />
          <p>{totalUsers}</p>
          <h2>Total Users</h2>
        </div>
        <div className="metric-card">
          <FontAwesomeIcon icon={faEye} className="metric-icon" />
          <p>{totalVisits}</p>
          <h2>Total Visits</h2>
        </div>
        <div className="metric-card">
          <FontAwesomeIcon icon={faChartBar} className="metric-icon" />
          <p>{dailyVisits.reduce((acc, val) => acc + val, 0)}</p>
          <h2>Weekly Visits</h2>
        </div>
      </div>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Users;
