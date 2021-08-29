import React, { Component } from "react";

import "./SingleOrder.css";

//==========================Redux imports===================================

const SingleOrder = ({ order }) => {
  






  return (
    <div className="Single_Restaurant">
      <div className="container">
        <img className="restaurant_image" src={"../Pictures/R7.jpg"} />
      </div>
      <div>
        <FavoriteBorderIcon
          style={{ fontSize: 40, color: "red", float: "left" }}
        />
      </div>
      <div>
        <h1>Order Id</h1>
      </div>
      <div>
        <h3>Restaurant Name</h3>
      </div>

      <div className="order-status">
        Order Status
      </div>

      <div className="order-received">
        Order Status
      </div>

    </div>
  );
};

export default SingleOrder;
