import React, { Component } from "react";

import "./SingleOrder.css";

//==========================Redux imports===================================

const SingleOrder = ({ orders }) => {
  






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
        Order Status
      </div>

    </div>
  );
};

export default SingleOrder;
