import React, { Component } from "react";

import "./SingleRestOrder.css";

//==========================Redux imports===================================

const SingleRestOrder = ({ orders }) => {
<<<<<<< HEAD:server/client/src/RestaurantComponents/RestaurantOrders/SingleRestOrder.js
  const { restData } = useSelector((state) => state.auth);

  const approveOrder = async () => {
    window.alert(restData._id);
    const restId = restData._id;
    await axios
      .put(
        `/item/update-pending-orders/${restId}`,
        {
          orderId: orders._id,
          status: "accepted",
        },
        {
          headers: {
            authorization:
              localStorage.getItem("token") !== null
                ? JSON.parse(localStorage.getItem("token"))
                : null,
          },
        }
      )
      .then((response) => {
        window.alert("Order Successfully Approved");

        //console.log(response.data);
        //const token = localStorage.getItem("token");
        //const newToken = console.log(JSON.parse(token["_id"]));
        //console.log(newToken);
      });
  };
=======
  



const approveOrder=()=>{
  window.alert('Approve Request Sent');
}

>>>>>>> parent of 22f70fb (Accepted orders):client/src/RestaurantComponents/RestaurantOrders/SingleRestOrder.js

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
        <h3>
          Order Status:{" "}
          {orders.status === "pending" ? "PENDING APPROVAL" : null}
        </h3>
      </div>

      <div className="order-received">
        {orders.status === "pending" ? (
          <button onClick={approveOrder}>Approve Order</button>
        ) : null}
      </div>
    </div>
  );
};

export default SingleRestOrder;
