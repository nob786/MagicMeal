import React, { useEffect } from "react";
import axios from "../../axios";

//===========================Redux Imports=========================
import { useSelector } from "react-redux";

//============================Material Ui Imports================
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { makeStyles } from "@mui/styles";

import SingleOrder from "./SingleOrder";

const OrdersHistory = () => {
  const [loading, setLoading] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [value, setValue] = React.useState(0);

  //===================Mui Styles=====================

  const pendingFilteredOrders = orders.filter(
    (n) =>
      n.status === "pending" || n.status === "accepted" || n.status === "ready"
  );

  const filteredOrders = orders.filter(
    (n) => n.status === "delivered" || n.status === "cancelled"
  );

  const [t1, setT1] = React.useState(true);
  const [t2, setT2] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //const[customerId,setCustomerId]= React.useState();

  const { custData } = useSelector((state) => state.auth);

  useEffect(async () => {
    axios
      .get(`/user/get-updated-order/${customerId}`)
      .then((res) => {
        //if (res) console.log("Response", res);
        const updatedOrders = res.data.updatedOrder;
        //console.log("orderss", updatedOrders);
        setOrders(updatedOrders);
        setLoading(true);
        //window.alert("Orders Imported");
      })
      .catch((err) => {
        console.log("Error in FE", err);
      });
  }, []);

  //console.log("a", custData);

  /*if(custData._id!=null){
      setCustomerId(custData._id);
    }*/

  let customerId = custData._id;
  //console.log("cust Id", customerId);
  //orders.map((order) => {
  //console.log("ORders", order);
  //});

  //orders
  // .filter((n) => n.restaurant.status != "pending")
  //.map((n) => console.log("filtered orders", n));

  //filteredOrders.map((or) => console.log("filtered Orders" + or));

  //console.log("ORDERS", filteredOrders);

  const handleClickT1 = () => {
    setT2(false);
    setT1(true);
  };
  const handleClickT2 = () => {
    setT1(false);
    setT2(true);
  };

  return (
    <div className="orders">
      <Tabs
        TabIndicatorProps={{ style: { background: "#fe724c", color: "red" } }}
        value={value}
        onChange={handleChange}
        centered
      >
        <Tab onClick={handleClickT1} label="Active Orders" />
        <Tab onClick={handleClickT2} label="Past Orders" />
      </Tabs>
      {loading === false ? (
        <div class="d-flex justify-content-center">
          <div
            class="spinner-border m-5"
            role="status"
            style={{ color: "#fe724c" }}
          >
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : t1 === true && loading === true ? (
        pendingFilteredOrders.length > 0 ? (
          pendingFilteredOrders.map((order, index) => (
            <SingleOrder key={index} orders={order} />
          ))
        ) : (
          <div class="alert alert-secondary text-center" role="alert">
            No Active Orders.
          </div>
        )
      ) : t2 === true && loading === true ? (
        filteredOrders.length > 0 ? (
          filteredOrders.map((n, index) => (
            <SingleOrder key={index} orders={n} />
          ))
        ) : (
          <div class="alert alert-secondary text-center mt-5 mb-5" role="alert">
            Currently There are no Past Orders
          </div>
        )
      ) : null}
    </div>
  );
};

export default OrdersHistory;
