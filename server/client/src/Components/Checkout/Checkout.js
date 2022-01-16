import React from "react";
import axios from "../../axios";

//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//========================Material Ui Imports

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

import "./Checkout.css";
import Cart from "../Cart/Cart";

//===========================Redux Imports=========================
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../Redux/actions/cartAction";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        MagicMeal.com.pk
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "fixed",
  },
  layout: {
    maxWidth: "1000px",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: "60%",
      marginLeft: "20%",
      marginTop: "0px",
      marginRight: "20%",
      marginBottom: "5%",
    },
  },
  paper: {
    height: "100%",
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
    // display: "flex",
    // justifyContent: "flex-end",
  },
  button: {
    // marginTop: theme.spacing(1),
    // marginLeft: theme.spacing(1),
  },
}));

const steps = ["Cart", "Checkout"];
let showNext = true;
/*const checkItems = (number) => {
  if (number >=1) 
  showNext=true;
};*/

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Cart />;
    /*case 1:
      return <AddressForm className="address-form"/>;*/
    // case 1:
    //   return <PaymentForm className="payment-form" />;
    case 1:
      return <Review className="review-form" />;
    default:
      throw new Error("Unknown step");
  }
}
toast.configure();

export default function Checkout() {
  const [errors, setErrors] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  //
  const [pickButton, setPickButton] = React.useState(false);
  const [dineButton, setDineButton] = React.useState(false);
  //
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [orderType, setOrderType] = React.useState("pickup");
  const [tableNumber, setTableNumber] = React.useState("");

  //=================Post Order Data ================

  const { custData } = useSelector((state) => state.auth);

  const { deliveryAddress } = useSelector((state) => state.cart);

  //=====================================Check Out Data=========================
  const customerData = {
    name: custData.firstName,
    contact: custData.contact,
    customerId: custData._id,
    customerAddress: deliveryAddress,
  };

  const { cartRestaurant } = useSelector((state) => state.cart);
  const { cartRestaurantId } = useSelector((state) => state.cart);

  const { clickedMenuId } = useSelector((state) => state.cart);
  const { cartTotal } = useSelector((state) => state.cart);

  let restId = cartRestaurantId;

  console.log("REST ORDER ID", restId);

  const OrderData = {
    customerData: customerData,
    restaurantData: cartRestaurant,
    items: clickedMenuId,
    grandTotal: cartTotal,
    orderDate: new Date(),
    orderType: "pickup",
    // orderType: "dinein",
    // tableNumber: tableNumber,
  };
  const DineInOrderData = {
    customerData: customerData,
    restaurantData: cartRestaurant,
    items: clickedMenuId,
    grandTotal: cartTotal,
    orderDate: new Date(),
    orderType: "dinein",
    // orderType: "dinein",
    tableNumber: tableNumber,
  };

  console.log("Checkout ORDER DATA", OrderData);
  console.log("Checkout DineIn ORDER DATA", DineInOrderData);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  //===========================================Dine-In Orders=====================================================
  const approveValidate = (tableNumber) => {
    const errors = {};

    if (tableNumber === "" || tableNumber <= 0) {
      errors.tableNumber = "Please Enter Table Number Correctly";
    }
    return errors;
  };

  const placeDineInOrder = async (event) => {
    // let newDate = new Date();
    // OrderData.orderDate = newDate;
    //Order Post //

    event.preventDefault();
    setErrors(approveValidate(tableNumber));

    if (Object.keys(approveValidate(tableNumber)).length === 0) {
      setLoading(true);
      await axios
        .post(`/user/post-order/${restId}`, DineInOrderData, {
          headers: {
            authorization:
              localStorage.getItem("token") !== null
                ? JSON.parse(localStorage.getItem("token"))
                : null,
          },
        })
        .then((res) => {
          if (res) {
            setLoading(false);
            dispatch(clearCart());
            toast.success(`Dine in Order Placed`, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
            //window.alert("Order Placed");
            setActiveStep(activeStep + 1);
            console.log("Response of Order Placed", res);
          } else console.log("Response Not Avalable");
        })
        .catch((err) => {
          setLoading(false);
          console.log("Error in Order Place", err.response.data.message);
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        });
    } else if (Object.keys(approveValidate(tableNumber)).length > 0) {
      // setLoading(false);
    }
  };

  //==========================================Pickup Order=========================================================
  const placeOrder = async (event) => {
    // let newDate = new Date();
    // OrderData.orderDate = newDate;
    //Order Post //
    setLoading(true);
    event.preventDefault();
    await axios
      .post(`/user/post-order/${restId}`, OrderData, {
        headers: {
          authorization:
            localStorage.getItem("token") !== null
              ? JSON.parse(localStorage.getItem("token"))
              : null,
        },
      })
      .then((res) => {
        if (res) {
          setLoading(false);
          dispatch(clearCart());
          toast.success(`Pickup Order Placed`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          //window.alert("Order Placed");
          setActiveStep(activeStep + 1);
          console.log("Response of Order Placed", res);
        } else console.log("Response Not Avalable");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error in Order Place", err.response.data.message);
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      });
  };
  // test
  const handleRadioPick = () => {
    setDineButton(false);
    setPickButton(true);
  };
  const handleRadioDine = () => {
    setDineButton(true);
    setPickButton(false);
  };

  return loading === true ? (
    <div class="d-flex justify-content-center">
      <span class="spinner-grow m-5" role="status" style={{ color: "#fe724c" }}>
        <span class="sr-only">Loading...</span>
      </span>
      <span class="sr-only text-center">Loading...</span>
    </div>
  ) : (
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
          <Typography component="h1" variant="h4" align="center"></Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
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
                  Your order has received. Please wait for final Approval from
                  the Restaurant. You Patience will be Appreciated. You can view
                  approvals in Order History Section.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  <br />

                  {/* {activeStep !== 0 && (
                    <button
                      className="go-back-button"
                      class="btn go-back-button"
                      style={{ color: "black" }}
                      // className="update-order-status-button"
                      // class="btn update-order-status-time-button"
                      onClick={handleBack}
                      // className={classes.button}
                    >
                      {"<<"} Go Back to Cart
                    </button>
                  )} */}

                  {activeStep === steps.length - 1 ? (
                    <div>
                      {/* ========================================= */}
                      <div style={{ fontSize: "14px", textAlign: "center" }}>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio1"
                            value="option1"
                            onClick={handleRadioPick}
                          />
                          <label class="form-check-label" for="inlineRadio1">
                            PickUp
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio2"
                            value="option2"
                            onClick={handleRadioDine}
                          />
                          <label class="form-check-label" for="inlineRadio2">
                            Dine In
                          </label>
                        </div>
                      </div>
                      {/* =================================== */}
                      <form
                        style={{
                          justifyContent: "center",
                          // marginBottom: "30px",
                        }}
                        class="form-inline"
                      >
                        {" "}
                        {activeStep !== 0 && (
                          <button
                            className="go-back-button"
                            class="btn go-back-button"
                            style={{ color: "black" }}
                            // className="update-order-status-button"
                            // class="btn update-order-status-time-button"
                            onClick={handleBack}
                            // className={classes.button}
                          >
                            Go Back
                          </button>
                        )}
                        {pickButton === false && dineButton === true ? (
                          <>
                            <input
                              style={{ marginTop: "5px" }}
                              type="number"
                              class="form-control"
                              placeholder="Enter Table Number"
                              onChange={(event) => {
                                setTableNumber(event.target.value);
                              }}
                              value={tableNumber}
                            />
                            <div style={{ display: "default" }}>
                              {errors.tableNumber ? (
                                <div
                                  style={{
                                    color: "red",
                                    margin: "5px",
                                    fontSize: "12px",
                                    marginLeft: "3%",
                                  }}
                                >
                                  {" "}
                                  {errors.tableNumber}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <button
                              style={{ marginTop: "5px" }}
                              onClick={placeDineInOrder}
                              className="update-order-status-button"
                              class="btn update-order-status-time-button"
                            >
                              Place Dine-In Order
                            </button>
                          </>
                        ) : null}
                        <br />
                        {/* <p>OR</p> */}
                        {pickButton === true && dineButton === false ? (
                          <button
                            className="update-order-status-button"
                            class="btn update-order-status-time-button"
                            // variant="contained"
                            // color="primary"
                            onClick={placeOrder}
                            // className={classes.button}
                          >
                            Place Pickup Order
                          </button>
                        ) : null}
                      </form>
                    </div>
                  ) : clickedMenuId.length > 0 ? (
                    <button
                      // variant="contained"
                      // color="primary"
                      style={{ width: "100%" }}
                      className="update-order-status-button"
                      class="btn update-order-status-time-button"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      GO TO CHECKOUT
                    </button>
                  ) : (
                    <button
                      disabled
                      className="update-order-status-button"
                      class="btn update-order-status-time-button"
                      // variant="contained"
                      // color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </button>
                  )}
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
