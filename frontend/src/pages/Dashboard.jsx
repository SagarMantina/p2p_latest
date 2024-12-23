import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SellerPage from "./SellerPage";
import ProfilePage from "./ProfilePage";
import AdminPage from "./AdminPage";
import Unauthorized from "./Unauthorized";
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
const Dashboard = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data (role) when the dashboard is loaded
    const getUserData = async () => {
      try {
        const response = await fetch(`${baseUrl}/userdata`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Include credentials for sending cookies
          }
        ); // Replace with your API endpoint
        const data = await response.json();
        console.log("User data:", data.role);
        setRole(data.role); // Assume the API returns the role
      } catch (error) {
        console.error("Failed to fetch user role:", error);
        setRole("unauthorized");
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Render different components based on user role
  if (role === "admin") {
    return <AdminPage />;
  } else if (role === "Seller") {
    return <SellerPage />;
  } else if (role === "User") {
    return <ProfilePage />;
  } else {
    return <Unauthorized />;
  }
};

export default Dashboard;
