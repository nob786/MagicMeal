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
  //=======================Search Terms===================================
  const [compSearchTerm, setCompSearchTerm] = React.useState("");
  const [readySearchTerm, setReadySearchTerm] = React.useState("");
  const [acceptedSearchTerm, setAcceptedSearchTerm] = React.useState("");
  //const[customerId,setCustomerId]= React.useState();

  const { restData } = useSelector((state) => state.auth);

  let restId = restData._id;
  console.log("Restaurant Id", restId);

  const pendingOrders = orders.filter((n) => n.status === "pending");
  const acceptedOrders = orders.filter((n) => n.status === "accepted");
  const readyOrders = orders.filter((n) => n.status === "ready");
  const completedOrders = orders.filter((n) => n.status === "delivered");
  const cancelledOrders = orders.filter((n) => n.status === "cancelled");

  useEffect(async () => {
    axios
      .get(`/item/get-pending-orders/${restId}`, {
        headers: {
          authorization:
            localStorage.getItem("token") !== null
              ? JSON.parse(localStorage.getItem("token"))
              : null,
        },
      })
      .then((res) => {
        if (res) console.log("Response", res);
        console.log("pending order rest", res.data);
        const pendingOrders = res.data.pendingOrders;
        //console.log("RESTORDERS FETCH",updatedOrders);
        setOrders(pendingOrders.filter((n) => n.orderType === "pickup"));
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
          // textAlign: "center",
          //   marginTop: "5%",

          marginBottom: "5%",
          // marginRight: "5%",
          // marginLeft: "5%",
          fontSize: "20px",
        }}
      >
        <TabList
          style={{
            paddingTop: "10px",
            minHeight: "70px",
            backgroundColor: "#f3724c",
            color: "white",
            textAlign: "center",
          }}
        >
          <Tab style={{ transitionDuration: "1.2s" }}>Pending Approvals</Tab>
          <Tab style={{ transitionDuration: "1.2s" }}>Accepted Orders</Tab>
          <Tab style={{ transitionDuration: "1.2s" }}>Ready Orders</Tab>
          <Tab style={{ transitionDuration: "1.2s" }}>Completed Orders</Tab>
          <Tab style={{ transitionDuration: "1.2s" }}>Cancelled Orders</Tab>
        </TabList>
        {/* =================================================================Pending Orders Tab=============================================== */}
        <TabPanel>
          <TitleTag title="Pick-Up Pending" />
          {pendingOrders.length > 0 ? (
            pendingOrders.map((order, index) => (
              <SingleRestOrder key={index} orders={order} />
            ))
          ) : (
            <div class="alert alert-secondary text-center m-5" role="alert">
              No Orders Found. <a href="/restaurants" class="alert-link"></a>
            </div>
          )}
        </TabPanel>
        {/* =================================================================Accepted Orders Tab=============================================== */}
        <TabPanel>
          <TitleTag title="Pick-Up  Accepted Orders" />
          <form
            style={{ justifyContent: "center" }}
            class="form-inline my-2 my-lg-0 text-center"
          >
            <input
              class="form-control mr-sm-2 w-50"
              type="search"
              placeholder="Search by Order-ID or Phone Number"
              aria-label="Search"
              value={acceptedSearchTerm}
              onChange={(event) => {
                setAcceptedSearchTerm(event.target.value);
              }}
            />
            {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button> */}
          </form>
          {acceptedOrders.length > 0 ? (
            acceptedOrders
              .filter((val) => {
                if (acceptedSearchTerm === "") {
                  return val;
                } else if (val._id.includes(acceptedSearchTerm)) {
                  return val;
                } else if (val.customer.contact.includes(acceptedSearchTerm)) {
                  return val;
                } else if (val.customer.name.includes(acceptedSearchTerm)) {
                  return val;
                }
              })
              .map((order, index) => (
                <SingleRestOrder key={index} orders={order} />
              ))
          ) : (
            <div class="alert alert-secondary text-center m-5" role="alert">
              No Orders Found. <a href="/restaurants" class="alert-link"></a>
            </div>
          )}
        </TabPanel>
        {/* =================================================================Ready Orders Tab=============================================== */}
        <TabPanel>
          <TitleTag title="Pick-Up Ready Orders" />
          <form
            style={{ justifyContent: "center" }}
            class="form-inline my-2 my-lg-0 text-center"
          >
            <input
              class="form-control mr-sm-2 w-50"
              type="search"
              placeholder="Search by Order-ID or Phone Number"
              aria-label="Search"
              value={readySearchTerm}
              onChange={(event) => {
                setReadySearchTerm(event.target.value);
              }}
            />
            {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button> */}
          </form>
          {readyOrders.length > 0 ? (
            readyOrders
              .filter((val) => {
                if (readySearchTerm === "") {
                  return val;
                } else if (val._id.includes(readySearchTerm)) {
                  return val;
                } else if (val.customer.contact.includes(readySearchTerm)) {
                  return val;
                } else if (val.customer.name.includes(readySearchTerm)) {
                  return val;
                }
              })
              .map((order, index) => (
                <SingleRestOrder key={index} orders={order} />
              ))
          ) : (
            <div class="alert alert-secondary text-center m-5" role="alert">
              No Orders Found. <a href="/restaurants" class="alert-link"></a>
            </div>
          )}
        </TabPanel>
        {/* =================================================================Completed Orders Tab=============================================== */}
        <TabPanel>
          <TitleTag title="Pick-Up Completed Orders" />
          <form
            style={{ justifyContent: "center" }}
            class="form-inline my-2 my-lg-0 text-center"
          >
            <input
              class="form-control mr-sm-2 w-50"
              type="search"
              placeholder="Search by Order-ID or Phone Number"
              aria-label="Search"
              value={compSearchTerm}
              onChange={(event) => {
                setCompSearchTerm(event.target.value);
              }}
            />
            {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button> */}
          </form>
          {completedOrders.length > 0 ? (
            completedOrders
              .filter((val) => {
                if (compSearchTerm === "") {
                  return val;
                } else if (val._id.includes(compSearchTerm)) {
                  return val;
                } else if (val.customer.contact.includes(compSearchTerm)) {
                  return val;
                } else if (val.customer.name.includes(compSearchTerm)) {
                  return val;
                }
              })
              .map((order, index) => (
                <SingleRestOrder key={index} orders={order} />
              ))
          ) : (
            <div class="alert alert-secondary text-center m-5" role="alert">
              No Orders Found. <a href="/restaurants" class="alert-link"></a>
            </div>
          )}
        </TabPanel>
        {/* =================================================================Cancelled Orders Tab=============================================== */}
        <TabPanel>
          <TitleTag title="Pick-Up Cancelled Orders" />

          {cancelledOrders.length > 0 ? (
            cancelledOrders.map((order, index) => (
              <SingleRestOrder key={index} orders={order} />
            ))
          ) : (
            <div class="alert alert-secondary text-center m-5" role="alert">
              No Orders Found. <a href="/restaurants" class="alert-link"></a>
            </div>
          )}
        </TabPanel>
      </Tabs>
      {/* test */}
      {/* <TitleTag title="Pending Orders' Approval" /> */}
    </div>
  );
};

export default RestOrdersPending;
