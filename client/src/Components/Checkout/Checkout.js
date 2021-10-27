import React from 'react';
import axios from "../../axios";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';

import "./Checkout.css";
import Cart from '../Cart/Cart';



//===========================Redux Imports=========================
import { useSelector } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Eatsabyte.com.pk
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'fixed',
  },
  layout: {
    
    maxWidth: '1000px',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: "60%",
      marginLeft: '20%',
      marginTop: '0px',
      marginRight: '20%',
    },
  },
  paper: {
    height: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(3),
      fontSize: "50px",
    },
  },
  stepper: {
    padding: theme.spacing(0, 1, 3),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Cart','Shipping address', 'Payment details', 'Review and Place your order'];
let showNext=true;
/*const checkItems = (number) => {
  if (number >=1) 
  showNext=true;
};*/

function getStepContent(step) {
  

  switch (step) {
    case 0:
      return <Cart className="address-form" />;
    case 1:
      return <AddressForm className="address-form"/>;
    case 2:
      return <PaymentForm className="payment-form"/>;
      case 3:
        return <Review className="review-form"/>;
    default:
      throw new Error('Unknown step');
  }
}
export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  

  //=================Post Order Data ================

  const {custData} = useSelector(
    (state) => state.auth
  );
  
  const {deliveryAddress} = useSelector(
    (state) => state.cart
  );

  const customerData= {
    name: custData.firstName,
    contact: custData.contact,
    customerId: custData._id,
    customerAddress: deliveryAddress,

  };
  
  const {cartRestaurant} = useSelector(
    (state) => state.cart
  );
  const {cartRestaurantId} = useSelector(
    (state) => state.cart
  );

  const {clickedMenuId} = useSelector(
    (state) => state.cart
  );
  const {cartTotal} = useSelector(
    (state) => state.cart
  );

let restId=cartRestaurantId;

console.log("REST ORDER ID",restId);

const OrderData= {
  customerData: customerData,
  restaurantData: cartRestaurant,
  items: clickedMenuId,
  grandTotal: cartTotal,
}

console.log("PLACED ORDER DATA",OrderData);


  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const placeOrder = async (event) => {
    //Order Post //
    event.preventDefault();
    await axios.post(`/user/post-order/${restId}`, OrderData,{
      headers: {
        authorization:
          localStorage.getItem("token") !== null
            ? JSON.parse(localStorage.getItem("token"))
            : null,
      },
    }
    ).then((res)=>{
      if(res){
      window.alert("Order Placed");
      setActiveStep(activeStep + 1);
      console.log("Response of Order Placed", res);
      }
      else 
      console.log("Response Not Avalable");
      
    }).catch((err)=>{
      console.log("Error in FE",err);
    })
    
  };
  
  
  


  return (
    <React.Fragment>
      <CssBaseline />
      {/*<AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className="title">
            Magic Meal Checkout
          </Typography>
        </Toolbar>
  </AppBar>*/}
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper} >
            {steps.map((label) => (
              <Step key={label} >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order has received. Please wait for final Approval from the Restaurant. You Patience will be Appreciated.
                  You can view approvals in Order History Section.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                
                    { (activeStep === steps.length - 1)  ?   <Button
                    variant="contained"
                    color="primary"
                    onClick={placeOrder}
                    className={classes.button}
                  >
                    Place Order
                    </Button> : 
                   clickedMenuId.length > 0 ?
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Next
                    </Button> :

                    
                    <Button
                    disabled
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Next
                    </Button>
                    }
                  
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}