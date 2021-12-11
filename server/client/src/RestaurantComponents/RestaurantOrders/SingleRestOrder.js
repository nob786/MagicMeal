import axios from "../../axios";
import React, { Component } from "react";

import "./SingleRestOrder.css";

//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//==========================Redux imports===================================

import { useDispatch, useSelector } from "react-redux";
import { LaptopWindows } from "@material-ui/icons";
import { Redirect, useHistory } from "react-router";

//==========================Material Ui Imports=============================

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

toast.configure();

const steps = ["Delivered"];

const SingleRestOrder = ({ orders }) => {
  const { restData } = useSelector((state) => state.auth);
  const history = useHistory();

  //Approve order fuction
  const approveOrder = async () => {
    const restId = restData._id;
    let pushOrderStatus;
    if (orders.status === "pending") pushOrderStatus = "accepted";
    else if (orders.status === "accepted") pushOrderStatus = "ready";
    else if (orders.status === "ready") pushOrderStatus = "delivered";
    await axios
      .put(
        `/item/update-pending-orders/${restId}`,
        {
          orderId: orders._id,
          status: pushOrderStatus,
        },
        {
          headers: {
            authorization:
              localStorage.getItem("token") !== null
                ? JSON.parse(localStorage.getItem("token"))
                : null,
          },
        }
      )
      .then((response) => {
        //window.alert("Order Successfully Approved");
        toast.success(`Order Status Updated to: ${pushOrderStatus}`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(
          () => window.location.replace("/admin/orders-pending"),
          1000
        );

        //console.log(response.data);
        //const token = localStorage.getItem("token");
        //const newToken = console.log(JSON.parse(token["_id"]));
        //console.log(newToken);
      });
  };

  // Cancel Order
  const cancelOrder = async () => {
    const restId = restData._id;
    await axios
      .put(
        `/item/update-pending-orders/${restId}`,
        {
          orderId: orders._id,
          status: "cancelled",
        },
        {
          headers: {
            authorization:
              localStorage.getItem("token") !== null
                ? JSON.parse(localStorage.getItem("token"))
                : null,
          },
        }
      )
      .then((response) => {
        //window.alert("Order Successfully Approved");
        toast.success(`Order Cancelled`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(
          () => window.location.replace("/admin/orders-pending"),
          1000
        );
      });
  };

  return (
    <Accordion className="restaurant-order-history" style={{ margin: "5%" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box sx={{ width: "100%", margin: "1%" }}>
          {orders.status === "delivered" ? (
            <Stepper
              style={{ marginTop: "1%", marginBottom: "2%" }}
              activeStep={orders.status === "delivered" ? 1 : null}
            >
              {steps.map((label, index) => {
                const labelProps = {};

                return (
                  <Step key={label}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          ) : null}
          {orders.status === "cancelled" ? (
            <Typography
              variant="caption"
              color="error"
              style={{ fontSize: "18px" }}
            >
              Order Cancelled/Rejected
            </Typography>
          ) : null}

          {orders.status === "pending" ? (
            // <button onClick={approveOrder}>Approve Order</button>
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Update Order Status
              </button>
              <div class="dropdown-menu " aria-labelledby="dropdownMenuButton">
                <button onClick={approveOrder} class="dropdown-item">
                  Accepted
                </button>
                <button disabled class="dropdown-item">
                  Ready
                </button>
                <button disabled class="dropdown-item">
                  Delivered
                </button>
              </div>
            </div>
          ) : orders.status === "accepted" ? (
            // <button onClick={approveOrder}>Ready For Take-Away</button>
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Update Order Status
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button disabled class="dropdown-item">
                  Accepted
                </button>
                <button onClick={approveOrder} class="dropdown-item">
                  Ready
                </button>
                <button disabled class="dropdown-item">
                  Delivered
                </button>
              </div>
            </div>
          ) : orders.status === "ready" ? (
            // <button onClick={approveOrder}>Delivered to Customer</button>
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Update Order Status
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button disabled class="dropdown-item">
                  Accepted
                </button>
                <button disabled class="dropdown-item">
                  Ready
                </button>
                <button onClick={approveOrder} class="dropdown-item">
                  Delivered
                </button>
              </div>
            </div>
          ) : null}
          {orders.status === "pending" ? (
            // <button onClick={cancelOrder}>Cancel/Reject Order</button>
            // <button onClick={cancelOrder}>Cancel/Reject Order</button>
            <button
              style={{ marginTop: "30px" }}
              type="button"
              class="btn btn-warning"
            >
              Cancel/Reject Order
            </button>
          ) : null}
          <span className="user-order-id">
            <h2>Order ID: {orders._id}</h2>
          </span>
          <span className="user-order-restaurant-name">
            <h2>Customer Name: {orders.customer.name}</h2>
          </span>
          <span className="user-order-status">
            <h2>
              Current Order Status:{" "}
              {orders.status === "pending"
                ? "PENDING APPROVAL"
                : orders.status === "accepted"
                ? "Accepted"
                : orders.status === "cancelled"
                ? "Order Cancelled"
                : orders.status === "ready"
                ? "Oreder is Ready"
                : orders.status === "delivered"
                ? "Delivered to Customer"
                : null}
            </h2>
          </span>
          <span className="user-order-restaurant-name">
            <h2>Customer Contact: {orders.customer.contact}</h2>
          </span>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {orders.items.map((item, index) => (
          <div className="order-history-details">
            <span className="order-history-item-name">
              Item Name: {item.itemName}
            </span>
            <br />
            <span className="order-history-item-price">
              Price: {item.price}
            </span>
            <br />
            <span className="order-history-item-quantity">
              Quantity: {item.quantity}
            </span>
            <br />
            <span className="order-history-item-total">
              Total: {item.total}
            </span>
            <br />
            <br />
          </div>
        ))}
        <span className="order-history-item-grand-total">
          Grand Total: {orders.grandTotal}
        </span>
        {/*orders.status==="accepted" ?<button className="user-order-status-confirm" style={{ width: "100%"}}>Confirm Received</button>: null*/}
        <br />
        <br />
        <br />
      </AccordionDetails>
    </Accordion>
  );
};

export default SingleRestOrder;
