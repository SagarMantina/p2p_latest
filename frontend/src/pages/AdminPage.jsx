
import React from 'react';
import '../styles/Sidebar.css';
import Dashboard from '../components/Dashboard';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faMoneyCheck, faGamepad, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Header from './Header'
import Footer from './Footer';
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";


const AdminPage = () => {
  const [nav, setNav] = useState("Dashboard");
  
  const handleLogout = async () => {
    try {
      const response = await fetch(`${baseUrl}/signout`, {
        method: 'GET',
        credentials: 'include', 
      });

     
     
        window.location.href = ('/login');
     
    } catch (error) {
      console.error("Error during logout:", error);
      alert('Error processing logout.');
    }
  };

  return (
   <>
   <Header />
   <div className='admin-page'  style={{minHeight:'100vh'}}>
      <div className="sidebar">
        <ul>
          <li onClick={() => setNav("Dashboard")}><FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</li>
          <li onClick={() => setNav("Profile")}><FontAwesomeIcon icon={faUser} /> Profile</li>
          <li onClick={() => setNav("Transcation")}><FontAwesomeIcon icon={faMoneyCheck} /> Transactions</li>
          <li onClick={() => setNav("Games")}><FontAwesomeIcon icon={faGamepad} /> Games</li>
          <li onClick={() => setNav("Users")}><FontAwesomeIcon icon={faUsers} /> Users</li>
          <li onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> Log Out</li>
        </ul>
      </div>
      <Dashboard nav={nav} />
    </div>
    <Footer />
   </>
  );
}

export default AdminPage;
