import {
  SET_RESTAURANT,
  SET_RESTAURANTS,
  PUSH_RESTAURANT_ID,
  PUSH_CLICKED_RESTAURANT_DATA,
} from "./types";
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
    .get(`/user/get-restaurant-menu/${restId}`)
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

export const pushClickedRestaurantData = (restaurantData) => (dispatch) => {
  dispatch({
    type: PUSH_CLICKED_RESTAURANT_DATA,
    payload: restaurantData,
  });
};
