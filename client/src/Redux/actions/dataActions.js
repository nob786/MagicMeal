import { SET_RESTAURANT, SET_RESTAURANTS, PUSH_RESTAURANT_ID } from "./types";
import axios from "../../axios";
export const getRestaurants = () => (dispatch) => {
  axios
    .get("/user/get-restaurants")
    .then((res) => {
      dispatch({
        type: SET_RESTAURANTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("Error while fetching restaurants");
      dispatch({
        type: SET_RESTAURANTS,
        payload: [],
      });
    });
};

export const getRestaurant = (restId) => (dispatch) => {
  axios
    .get(`http://localhost:3001/user/get-restaurant-menu/${restId}`)
    .then((res) => {
      dispatch({
        type: SET_RESTAURANT,
        payload: res.data.data.items,
      });
    })
    .catch((err) => {
      console.log("Error while fetching restaurants");
      dispatch({
        type: SET_RESTAURANT,
        payload: [],
      });
    });
};

export const pushRestaurantId = (restaurantId) => (dispatch) => {
  dispatch({
    type: PUSH_RESTAURANT_ID,
    payload: restaurantId,
  });
};
