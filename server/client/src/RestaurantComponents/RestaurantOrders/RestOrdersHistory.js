import React, { useEffect } from "react";
import TitleTag from "../../Components/SpecialComp/TitleTag";
import SingleRestOrder from "./SingleRestOrder";
import axios from "../../axios";

//===========================Redux Imports=========================
import { useSelector } from "react-redux";

//============================Material Ui Imports================
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

//==========================Main Function==================

const RestOrdersHistory = () => {
  const [loading, setLoading] = React.useState(true);
  const [orders, setOrders] = React.useState([]);
  //const[customerId,setCustomerId]= React.useState();
  const filteredOrders = orders.filter(
    (n) => n.status === "delivered" || n.status === "cancelled"
  );

  const { restData } = useSelector((state) => state.auth);
  let restId = restData._id;
  // console.log("Restaurant Id", restId);

  useEffect(async () => {
    axios
      .get(`/item/get-pending-orders/${restId}`)
      .then((res) => {
        if (res) console.log("Response", res);
        const pendingOrders = res.data.pendingOrders;
        //console.log("RESTORDERS FETCH",updatedOrders);
        setOrders(pendingOrders);
        setLoading(false);
        //window.alert("REST Orders Imported");
      })
      .catch((err) => {
        console.log("Error in FE", err);
      });
  }, []);

  return loading === true ? (
    <div class="d-flex justify-content-center">
      <div
        class="spinner-border m-5"
        role="status"
        style={{ color: "#fe724c" }}
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="orders-history">
      <TitleTag title="Orders history" />

      {filteredOrders.length > 0 ? (
        filteredOrders.map((n, index) => (
          <SingleRestOrder key={index} orders={n} />
        ))
      ) : (
        <div class="alert alert-secondary text-center" role="alert">
          NO ORDERS FOUND. <a href="/restaurants" class="alert-link"></a>
        </div>
      )}
    </div>
  );
};

export default RestOrdersHistory;
