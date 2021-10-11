import React, { Component } from "react";
import {Link} from "react-router-dom"


import "./SingleOrder.css"

//==========================Redux imports===================================

const SingleOrder = ({ orders }) => {
  const [showDetails, setShowDetails] = React.useState(false);
  

const handleDetails=()=>{
  showDetails===true ? setShowDetails(false) : setShowDetails(true);
}




  return (
    <div className="orders-history">
      <div >
        <h2>Order ID: {orders._id}</h2>

        <h2>Restaurant Name: {orders.restaurant.restaurantName}</h2>

      
      <h2>Order Status: {orders.status}</h2>


       {orders.status==="accepted" ?<button>Confirm Received</button>: null}
      </div>
      

      <Link onClick={handleDetails}>Details {showDetails===true ? "-" : "+"}</Link>
        
    {showDetails===true ? 
    <div>
      {orders.itemName}
      jdjk
    </div> : null}

    </div>
  );
};

export default SingleOrder;
