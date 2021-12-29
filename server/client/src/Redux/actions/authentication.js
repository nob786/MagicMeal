import {
  AUTH_REST,
  AUTH_CUST,
  ADD_CUSTOMER_DATA,
  ADD_RESTAURANT_DATA,
  UPDATE_RESTAURANT_DATA,
} from "./types";
import axios from "axios";

export const addAuthRest = (token) => (dispatch) => {
  dispatch({
    type: AUTH_REST,
    payload: token,
  });
};

export const addAuthCust = (token) => (dispatch) => {
  dispatch({
    type: AUTH_CUST,
    payload: token,
  });
};

export const addCustomerData = (customer) => (dispatch) => {
  dispatch({
    type: ADD_CUSTOMER_DATA,
    payload: customer,
  });
};

export const addRestaurantData = (restaurant) => (dispatch) => {
  dispatch({
    type: ADD_RESTAURANT_DATA,
    payload: restaurant,
  });
};

export const updateRestaurantData = () => (dispatch) => {
  axios
    .get("/item/get-data", {
      headers: {
        authorization:
          localStorage.getItem("token") !== null
            ? JSON.parse(localStorage.getItem("token"))
            : null,
      },
    })
    .then((res) => {
      dispatch({
        type: UPDATE_RESTAURANT_DATA,
        payload: res.data.restaurant,
      });
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_RESTAURANT_DATA,
      });
    });
};
