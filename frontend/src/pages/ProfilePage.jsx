import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faUser, faGamepad, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import UserDashboard from '../components/userpage/UserDashboard';
import './ProfilePage.css'
import Header from './Header'
import Footer from './Footer';

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
const ProfilePage = () => {
  const [usernav,setUserNav] = useState("AccountDetails");


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
    <div className='userprofilepage' style={{minHeight:'100vh'}}>
      <div className='usersidebar'>
      <ul>
          <li onClick={() => setUserNav("AccountDetails")}><FontAwesomeIcon icon={faUser} />Account Details</li>
          <li onClick={() => setUserNav("MyGames")}><FontAwesomeIcon icon={faGamepad} />My Games</li>
          <li onClick={() => setUserNav("Transactions")}><FontAwesomeIcon icon={faMoneyBill} />Transactions</li>
          <li onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> Log Out</li>
        </ul>
      </div>

      <UserDashboard usernav={usernav} />
    </div>
    <Footer />
    </>
  )
}

export default ProfilePage