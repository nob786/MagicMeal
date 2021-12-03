import React, { useEffect } from "react";
import axios from "../../axios";

//===========================Redux Imports=========================
import { useSelector } from "react-redux";

//============================Material Ui Imports================
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import SingleOrder from "./SingleOrder";

const OrdersHistory = () => {
  const [orders, setOrders] = React.useState([]);
  const [value, setValue] = React.useState(0);

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
      <Tabs value={value} onChange={handleChange} centered>
        <Tab onClick={handleClickT1} label="Pending Orders" />
        <Tab onClick={handleClickT2} label="Completed Orders" />
      </Tabs>
      {t1 === true ? (
        pendingFilteredOrders.length > 0 ? (
          pendingFilteredOrders.map((order, index) => (
            <SingleOrder key={index} orders={order} />
          ))
        ) : (
          <Alert
            severity="info"
            style={{
              justifyContent: "center",
            }}
          >
            <AlertTitle>
              {" "}
              <h2> Currently There are no Pending Orders</h2>
            </AlertTitle>
          </Alert>
        )
      ) : t2 === true ? (
        filteredOrders.length > 0 ? (
          filteredOrders.map((n, index) => (
            <SingleOrder key={index} orders={n} />
          ))
        ) : (
          <Alert
            severity="info"
            style={{
              justifyContent: "center",
              marginTop: "10%",
              marginBottom: "10%",
            }}
          >
            <AlertTitle>
              {" "}
              <h2> Currently There are no Completed Orders</h2>
            </AlertTitle>
          </Alert>
        )
      ) : null}
    </div>
  );
};

export default OrdersHistory;
