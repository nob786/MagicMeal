import React, { useEffect } from "react";
import TitleTag from "../SpecialComp/TitleTag";
import axios from "../../axios";

//===========================Redux Imports=========================
import { useSelector } from "react-redux";

//============================Material Ui Imports================
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import SingleOrder from "./SingleOrder";

const OrdersHistory = () => {
  const [orders, setOrders] = React.useState([]);

  const [value, setValue] = React.useState(0);

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

  const filteredOrders = orders.filter(
    (o) => o.restaurant.status === "pending"
  );

  filteredOrders.map((or) => console.log("filtered Orders" + or));

  //console.log("ORDERS",orders);

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
      {t1 === true
        ? orders.map((order, index) => (
            <SingleOrder key={index} orders={order} />
          ))
        : t2 === true
        ? filteredOrders.map((order, index) => console.log(order))
        : null}
    </div>
  );
};

export default OrdersHistory;
