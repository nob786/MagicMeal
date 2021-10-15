import React, { useEffect } from "react";
import TitleTag from "../../Components/SpecialComp/TitleTag";
import axios from "../../axios";

//===========================Redux Imports=========================
import { useSelector } from "react-redux";

import SingleRestOrder from "./SingleRestOrder";

const RestOrdersPending = () => {
  const [orders, setOrders] = React.useState([]);
  //const[customerId,setCustomerId]= React.useState();

  const { restData } = useSelector((state) => state.auth);

  //console.log("a", custData);

  /*if(custData._id!=null){
      setCustomerId(custData._id);
    }*/

  let restId = restData._id;
  console.log("Restaurant Id", restId);

  useEffect(async () => {
    axios
      .get(`/item/get-pending-orders/${restId}`)
      .then((res) => {
        if (res) console.log("Response", res);
        const pendingOrders = res.data.pendingOrders;
        //console.log("RESTORDERS FETCH",updatedOrders);
        setOrders(pendingOrders);
        window.alert("REST Orders Imported");
      })
      .catch((err) => {
        console.log("Error in FE", err);
      });
  }, []);

  //console.log("ORDERS",orders);
  return (
    <div className="orders-history">
      <TitleTag title="Pending Orders" />

      {orders.map((order, index) => (
        <SingleRestOrder key={index} orders={order} />
      ))}
    </div>
  );
};

export default RestOrdersPending;
