import React, { useEffect } from "react";
import TitleTag from "../SpecialComp/TitleTag";
import axios from "../../axios";
//===========================Redux Imports=========================
import { useSelector } from "react-redux";

import SingleOrder from "./SingleOrder";

const OrdersHistory = () => {
  const [orders, setOrders] = React.useState([]);
  //const[customerId,setCustomerId]= React.useState();

  const { custData } = useSelector((state) => state.auth);

  //console.log("a", custData);

  /*if(custData._id!=null){
      setCustomerId(custData._id);
    }*/

  let customerId = custData._id;
  //console.log("cust Id", customerId);

  useEffect(async () => {
    axios
      .get(`/user/get-updated-order/${customerId}`)
      .then((res) => {
        if (res) console.log("Response", res);
        const updatedOrders = res.data.updatedOrder;
        //console.log("orderss",updatedOrders);
        setOrders(updatedOrders);
        window.alert("Orders Imported");
      })
      .catch((err) => {
        console.log("Error in FE", err);
      });
  }, []);

  //console.log("ORDERS",orders);

  return (
    <div className="orders">
      <TitleTag title="Pending Orders" />
      {orders.map((order, index) => (
        <SingleOrder key={index} orders={order} />
      ))}
      {/*<div className="restaurants_grid">
        {d.map((item, key) => (
          <SingleRestaurant key={key} restaurant={item} />
        ))}
        </div>*/}
      <TitleTag title="Completed/Cancelled Orders" />
    </div>
  );
};

export default OrdersHistory;
