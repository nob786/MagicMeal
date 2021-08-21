import {
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_ERROR,
  SERVER_ERROR,
} from "./types";

import axios from "axios";

export const signupRestaurant = (restaurantData, history) => (dispatch) => {
  axios
    .post("http://localhost:3001/auth/signup-restaurant", restaurantData)
    .then((res) => {
      dispatch({
        type: SIGNUP_SUCCESS,
      });
      history.push("/login");
    })
    .catch((err) => {
      if (err) {
        dispatch({
          type: SIGNUP_ERROR,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const signupCustomer = (customerData, history) => (dispatch) => {
  axios
    .post("http://localhost:3001/auth/signup-customer", customerData)
    .then((res) => {
      dispatch({
        type: SIGNUP_SUCCESS,
      });
      history.push("/login");
    })
    .catch((err) => {
      if (err) {
        dispatch({
          type: SIGNUP_ERROR,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const login = (data, history) => (dispatch) => {
  axios
    .post("http://localhost:3001/auth/login", data)
    .then((res) => {
      const token = res.data.token;
      const role = res.data.role;
      const id = res.data.id;

      if (!token) {
        window.alert("No token provided", token);
      } else {
        localStorage.setItem("token", JSON.stringify(token));
        axios.defaults.headers.common["Authorization"] = token;

        if (role === "restaurant") {
          history.push("/restaurant-dashboard");
        } else if (role === "customer") {
          history.push("/customer-dashboard");
        }

        dispatch({
          type: LOGIN_SUCCESS,
        });
      }
    })
    .catch((err) => {
      if (err) {
        dispatch({
          type: LOGIN_ERROR,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const logout = (history) => (dispatch) => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({
    type: SET_UNATHENTICATED,
  });
  if (history) history.push("/login");
};
