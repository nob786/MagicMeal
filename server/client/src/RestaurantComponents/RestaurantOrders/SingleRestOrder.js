import axios from "../../axios";
import React, { Component } from "react";

import "./SingleRestOrder.css";

//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//==========================Redux imports===================================

import { useDispatch, useSelector } from "react-redux";
import { LaptopWindows } from "@material-ui/icons";
import { Redirect, useHistory } from "react-router";

toast.configure();

const SingleRestOrder = ({ orders }) => {
  const { restData } = useSelector((state) => state.auth);
  const history = useHistory();

  const approveOrder = async () => {
    //window.alert(restData._id);
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
        //window.alert("Order Successfully Approved");
        toast.success(`Order Approved`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(
          () => window.location.replace("/admin/orders-pending"),
          1000
        );

        //console.log(response.data);
        //const token = localStorage.getItem("token");
        //const newToken = console.log(JSON.parse(token["_id"]));
        //console.log(newToken);
      });
  };

  return (
    <div className="Single-Restaurant">
      <h1>Order Id: {orders._id}</h1>

      <h2>Restaurant Name: {orders.restaurant.restaurantName}</h2>

      <h2>
        Order Status: {orders.status === "pending" ? "PENDING APPROVAL" : null}
      </h2>

      {orders.status === "pending" ? (
        <button onClick={approveOrder}>Approve Order</button>
      ) : null}
    </div>
  );
};

export default SingleRestOrder;
