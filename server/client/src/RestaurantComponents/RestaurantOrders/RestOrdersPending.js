import React, { useEffect } from "react";
import TitleTag from "../../Components/SpecialComp/TitleTag";
import axios from "../../axios";

//===========================Redux Imports=========================
import { useSelector } from "react-redux";

import SingleRestOrder from "./SingleRestOrder";

//============================Material Ui Imports================
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

//=====================Other Imports
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const RestOrdersPending = () => {
  const [loading, setLoading] = React.useState(true);
  const [orders, setOrders] = React.useState([]);
  //const[customerId,setCustomerId]= React.useState();

  const { restData } = useSelector((state) => state.auth);

  let restId = restData._id;
  console.log("Restaurant Id", restId);

  const filteredOrders = orders.filter(
    (n) =>
      n.status === "pending" || n.status === "accepted" || n.status === "ready"
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
        setLoading(false);
        //window.alert("REST Orders Imported");
      })
      .catch((err) => {
        console.log("Error in FE", err);
      });
  }, []);

  //console.log("ORDERS",orders);
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
      {/*test  */}
      <Tabs
        style={{
          textAlign: "center",
          //   marginTop: "5%",
          marginBottom: "5%",
          // marginRight: "5%",
          // marginLeft: "5%",
          fontSize: "20px",
        }}
      >
        <TabList
          style={{
            backgroundColor: "#f3724c",
            color: "white",
            borderRadius: "5px",
          }}
        >
          <Tab style={{ transitionDuration: "1.2s" }}>Pending Approvals</Tab>
          <Tab style={{ transitionDuration: "1.2s" }}>Accepted Orders</Tab>
          <Tab style={{ transitionDuration: "1.2s" }}>Ready Orders</Tab>
          <Tab style={{ transitionDuration: "1.2s" }}>Completed Orders</Tab>
        </TabList>

        <TabPanel>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <SingleRestOrder key={index} orders={order} />
            ))
          ) : (
            <div class="alert alert-secondary text-center" role="alert">
              No Orders Found. <a href="/restaurants" class="alert-link"></a>
            </div>
          )}
        </TabPanel>

        <TabPanel>skdjkadj</TabPanel>

        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>

        <TabPanel>sjksjk</TabPanel>
      </Tabs>
      {/* test */}
      {/* <TitleTag title="Pending Orders' Approval" /> */}
    </div>
  );
};

export default RestOrdersPending;
