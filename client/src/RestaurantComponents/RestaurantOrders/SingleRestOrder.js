import React, { Component } from "react";

import "./SingleRestOrder.css";

//==========================Redux imports===================================

const SingleRestOrder = ({ orders }) => {
  



const approveOrder=()=>{
  window.alert('Approve Request Sent');
}


  return (
    <div className="Single_Restaurant">
    <div className="container">
      <img className="restaurant_image" src={"../Pictures/R7.jpg"} />
    </div>
    <div>
      <h1>Order Id: {orders._id}</h1>
    </div>
    <div>
      <h3>Restaurant Name: {orders.restaurant.restaurantName}</h3>
    </div>

    <div className="order-status">
    <h3>Order Status: {orders.status==="pending"? "PENDING APPROVAL": null}</h3>
    </div>

    <div className="order-received">
      {
      orders.status==="pending" ? <button onClick={approveOrder}>
        Approve Order
      </button>
      : null
      }
    </div>

  </div>
  );
};

export default SingleRestOrder;
