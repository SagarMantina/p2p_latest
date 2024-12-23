import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faGamepad, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/SellerPage.css';
import SellerDashboard from '../components/sellerpage/SellerDashboard';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Header from './Header';
import Footer from './Footer'
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
const SellerPage = () => {
  const [sellnav, setSellNav] = useState("Dashboard");
  

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
    <div className='sellerpage'>
      <div className="sellsidebar">
        <ul>
          <li onClick={() => setSellNav("Dashboard")}><FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</li>
          <li onClick={() => setSellNav("AccountDetails")}><FontAwesomeIcon icon={faUser} /> Account Details</li>
          <li onClick={() => setSellNav("MyGames")}><FontAwesomeIcon icon={faGamepad} /> My Games</li>
          <li onClick={() => setSellNav("Sell")}><FontAwesomeIcon icon={faUsers} /> Sell</li>
          <li onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> Log Out</li> {/* Call handleLogout on logout */}
        </ul>
      </div>

      <SellerDashboard sellnav={sellnav} />
    </div>
    <Footer />
  </>
  );
}

export default SellerPage;
