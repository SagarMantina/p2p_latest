import React, { useState } from 'react';
import SalesInfo from './SalesInfo';
import Profile from './Profile';
import Users from './Users';
import Transaction from './Transcation';
import Games from './Games';
import '../styles/Dashboard.css';
function Dashboard(props) {
   
   
    return (
        <div className="dashboard">
            <h1 style={{position:'relative', left:'25%', color:'white'}}>Admin Dashboard</h1>
            {
                props.nav === "Dashboard" ? <SalesInfo /> : null   
            }
            {
                props.nav === "Profile" ? <Profile /> : null
            }
            {
                props.nav === "Users" ? <Users /> : null
            }
            {
                props.nav === "Transcation" ? <Transaction /> : null
            }
            {
                props.nav === "Games" ? <Games /> : null
            }
        </div>
    );
}

export default Dashboard;
