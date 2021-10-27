import React, { Component } from "react";
import {Link} from "react-router-dom"


import "./SingleOrder.css"

//==========================Redux imports===================================





//==========================Material Ui Imports=============================

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';





const steps = ['Order Placed', 'Accepted', 'Ready for Take Away'];

const SingleOrder = ({ orders }) => {


  const [showDetails, setShowDetails] = React.useState(false);
  

  const handleDetails=()=>{
    showDetails===true ? setShowDetails(false) : setShowDetails(true);
  }


  const isStepFailed = (step) => {
    return step === 1;
  };



  return (
      <Accordion className="user-order-history" style={{margin: "5%"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >

          <Box sx={{width: "100%", margin: "2%"}} >
            <Stepper 
            style={{marginTop: "1%", marginBottom: "2%"}}
            activeStep={orders.status==="pending" ? 1 : orders.status==="accepted" ? 2 : orders.status==="outfordelivery" ? 3 : null }>
              {steps.map((label, index) => {
                  const labelProps = {};
               

          return (
            <Step key={label}> 
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <span className="user-order-id"><h2>Order ID: {orders._id}</h2></span>
    <span className="user-order-restaurant-name"><h2>Restaurant Name: {orders.restaurant.restaurantName}</h2></span>
    <span className="user-order-status"><h2>Order Status: {orders.status}</h2></span>
    </Box>
</AccordionSummary>
        <AccordionDetails >
          
          {orders.items.map((item, index) => (
          <div className="order-history-details">
             <span className="order-history-item-name">Item Name: {item.itemName}</span>
             <br/>
             <span className="order-history-item-price">Price: {item.price}</span>
             <br/>
             <span className="order-history-item-quantity">Quantity: {item.quantity}</span> 
             <br/>
             <span className="order-history-item-total">Total: {item.total}</span>
             <br/>
             <br/>
          </div>
            ))}
            <span className="order-history-item-grand-total">Grand Total: {orders.grandTotal}</span>
            {orders.status==="accepted" ?<button className="user-order-status-confirm" style={{ width: "100%"}}>Confirm Received</button>: null}
            <br/>
             <br/>
             <br/>
        </AccordionDetails>
      </Accordion>
      
        
   
  );
};

export default SingleOrder;
