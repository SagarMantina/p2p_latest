import React from "react";
import SellerProfile from "./SellerProfile";
import SellerGames from "./SellerGames";
import SellerSalesInfo from "./SellerSalesInfo";
import SellGame from "./SellGame";

const SellerDashboard = (props) => {
  return (
    <div className="sellerdashboard" style={{minHeight:'100vh'}}>
      <h1 style={{position:'relative', left:'25%', color:'white'}}>Seller DashBoard</h1>
      {
          props.sellnav === "Dashboard" ? <SellerSalesInfo /> : null   
      }
      {
          props.sellnav === "AccountDetails" ? <SellerProfile /> : null
      }
      {
          props.sellnav === "MyGames" ? <SellerGames /> : null
      }
      {
          props.sellnav === "Sell" ? <SellGame /> : null
      }
    </div>
  );
};

export default SellerDashboard;
