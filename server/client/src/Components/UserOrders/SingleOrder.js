import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./SingleOrder.css";

//==========================Redux imports===================================

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
import { makeStyles } from "@mui/styles";
import RatingModal from "../RatingModal/RatingModal";

const steps = ["Order Placed", "Accepted", "Ready"];

const SingleOrder = ({ orders }) => {
  const useStyles = makeStyles(() => ({
    root: {
      "& .Mui-disabled .MuiStepIcon-root": { color: "#5e5e5e" },
      "& .Mui-active": { color: "#5e5e5e" },
      "& .Mui-completed": { color: "#5cb85c" },
      // "#fe724c"
    },
  }));
  const c = useStyles();
  const [showDetails, setShowDetails] = React.useState(false);

  const handleDetails = () => {
    showDetails === true ? setShowDetails(false) : setShowDetails(true);
  };

  const isStepFailed = (step) => {
    return step === 1;
  };

  return (
    <Accordion className="user-order-history" style={{ margin: "5%" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box sx={{ width: "100%", margin: "1%" }}>
          {/* {!(orders.status === "cancelled" || orders.status === "delivered") ? (
            <div
              style={{
                textAlign: "center",
                fontSize: "32px",
                color: "#fe724c",
              }}
            >
              Estimated Ready Time: 45min
            </div>
          ) : null} */}
          {orders.status === "delivered" ? (
            <Stepper
              className={c.root}
              orientation="vertical"
              style={{ marginTop: "1%", marginBottom: "2%" }}
              activeStep={1}
            >
              <Step>
                <StepLabel>Completed</StepLabel>
              </Step>
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
          {!(orders.status === "cancelled" || orders.status === "delivered") ? (
            <Stepper
              className={c.root}
              orientation="vertical"
              style={{ marginTop: "1%", marginBottom: "2%" }}
              activeStep={
                orders.status === "pending"
                  ? 1
                  : orders.status === "accepted"
                  ? 2
                  : orders.status === "ready"
                  ? 3
                  : null
              }
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
          <span className="user-order-id">
            <h2>Order ID: {orders._id.slice(-5)}</h2>
          </span>
          <span className="user-order-status">
            <h2>Order Type: {orders.orderType.toUpperCase()}</h2>
          </span>
          {orders.orderType === "dinein" ? (
            <span className="user-order-status">
              <h2>Table Number: {orders.tableNumber}</h2>
            </span>
          ) : null}
          {orders.estimatedReadyTime !== null ? (
            <span className="user-order-status">
              <h2>Estimated Ready Time: {orders.estimatedReadyTime}min</h2>
            </span>
          ) : null}

          <span className="user-order-status">
            <h2>
              Order Date:{" "}
              {String(orders.orderDate).slice(0, 10) +
                " " +
                String(orders.orderDate).slice(11, 16)}
            </h2>
          </span>
          <span className="user-order-restaurant-name">
            <h2>{orders.restaurant.restaurantName}</h2>
          </span>
          <span className="user-order-status">
            <h2>Order Status: {orders.status}</h2>
          </span>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {orders.items.map((item, index) => (
          <div className="order-history-details">
            <span className="order-history-item-name">{item.itemName}</span>
            <br />
            <span className="order-history-item-price">
              {item.price} x {item.quantity} = {item.total}.Rs Total
            </span>
            <br />
            {/* <span className="order-history-item-quantity">
              Quantity: {item.quantity}
            </span>
            <br />
            <span className="order-history-item-total">
              Total: {item.total}
            </span> */}
            {/* <br /> */}
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
        {/* {(orders.status === "delivered" &&
          orders.isReviewSubmitted === false) ||
        (orders.status === "cancelled" &&
          orders.isReviewSubmitted === false) ? (
          <RatingModal order={orders} />
        ) : null} */}
        <RatingModal order={orders} />
      </AccordionDetails>
    </Accordion>
  );
};

export default SingleOrder;
