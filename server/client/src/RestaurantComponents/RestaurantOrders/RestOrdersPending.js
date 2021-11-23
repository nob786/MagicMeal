import React, { useEffect } from "react";
import TitleTag from "../../Components/SpecialComp/TitleTag";
import axios from "../../axios";

//===========================Redux Imports=========================
import { useSelector } from "react-redux";

import SingleRestOrder from "./SingleRestOrder";

//============================Material Ui Imports================
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const RestOrdersPending = () => {
  const [orders, setOrders] = React.useState([]);
  //const[customerId,setCustomerId]= React.useState();

  const { restData } = useSelector((state) => state.auth);

  let restId = restData._id;
  console.log("Restaurant Id", restId);

  const filteredOrders = orders.filter(
    (n) =>
      n.status === "pending" ||
      n.status === "accepted" ||
      n.status === "ready" ||
      n.status === null
  );

  useEffect(async () => {
    axios
      .get(`/item/get-pending-orders/${restId}`)
      .then((res) => {
        if (res) console.log("Response", res);
        console.log("pending order rest", res.data);
        const pendingOrders = res.data.pendingOrders;
        //console.log("RESTORDERS FETCH",updatedOrders);
        setOrders(pendingOrders);
        //window.alert("REST Orders Imported");
      })
      .catch((err) => {
        console.log("Error in FE", err);
      });
  }, []);

  //console.log("ORDERS",orders);
  return (
    <div className="orders-history">
      <TitleTag title="Pending Orders' Approval" />

      {filteredOrders.length > 0 ? (
        filteredOrders.map((order, index) => (
          <SingleRestOrder key={index} orders={order} />
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
            <h2> Currently There are no Pending Approvals</h2>
          </AlertTitle>
        </Alert>
      )}
    </div>
  );
};

export default RestOrdersPending;
