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
        //window.alert("REST Orders Imported");
      })
      .catch((err) => {
        console.log("Error in FE", err);
      });
  }, []);

  return (
    <div className="orders-history">
      <TitleTag title="Orders history" />

      {filteredOrders.length > 0 ? (
        filteredOrders.map((n, index) => (
          <SingleRestOrder key={index} orders={n} />
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
      )}
    </div>
  );
};

export default RestOrdersHistory;
