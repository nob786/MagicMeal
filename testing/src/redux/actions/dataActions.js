import axios from "axios";
import { useEffect } from "react";
import {
  SERVER_ERROR,
  FETCH_ERROR,
  ADD_ITEM,
  ADD_ITEM_ERROR,
  GET_RESTAURANTS,
  GET_MENUS,
  DELETE_ITEM,
  DELETE_ITEM_ERROR,
  UPDATE_ITEM,
  UPDATE_ITEM_ERROR,
} from "./types";

//All actions for fetching data for restaurants

// Action for fetching restaurants without login
export const getRestaurants = () => (dispatch) => {
  axios
    .get("http://localhost:3001/user/get-restaurants")
    .then((res) => {
      if (res) {
        dispatch({
          type: GET_RESTAURANTS,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      if (err) {
        dispatch({
          type: FETCH_ERROR,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
          payload: err.response.data,
        });
      }
    });
};

// Fetching All Menus
export const getMenus = () => (dispatch) => {
  axios
    .get("http://localhost:3001/item/get-items")
    .then((res) => {
      dispatch({
        type: GET_MENUS,
        paylaod: res.data,
      });
      console.log("Get Menus Called");
    })
    .catch((err) => {
      if (err) {
        dispatch({
          type: FETCH_ERROR,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

// Adding a menu
export const addMenu = (menuData, history) => (dispatch) => {
  axios
    .post("http://localhost:3001/add-item", menuData)
    .then((res) => {
      dispatch({
        type: ADD_ITEM,
        payload: res.data.itemData,
      });
      if (history) {
        history.push("/restaurant-display-menu");
      } else {
        window.alert(
          "Could not re-route you because instance of history is not available"
        );
      }
    })
    .catch((err) => {
      if (err) {
        dispatch({
          type: ADD_ITEM_ERROR,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

// Deleting a menu
export const delMenu = (menuId, history) => (dispatch) => {
  axios
    .delete(`http://localhost:3001/delete-item/${menuId}`)
    .then((res) => {
      dispatch({
        type: DELETE_ITEM,
        payload: menuId,
      });
      window.alert("Item deleted");

      if (history) {
        history.push("/restaurant-display-menu");
      } else {
        window.alert(
          "Could not re-route you because instance of history is not available"
        );
      }
    })
    .catch((err) => {
      if (err) {
        dispatch({
          type: DELETE_ITEM_ERROR,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

// Updating a menu
export const updateMenu = (menuId, history) => (dispatch) => {
  axios
    .put(`http://localhost:3001/update-item/${menuId}`)
    .then((res) => {
      dispatch({
        type: UPDATE_ITEM,
        payload: res.data.item,
      });
      window.alert("Item Updated");

      if (history) {
        history.push("/restaurant-display-menu");
      } else {
        window.alert(
          "Could not re-route you because instance of history is not available"
        );
      }
    })
    .catch((err) => {
      if (err) {
        dispatch({
          type: UPDATE_ITEM_ERROR,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};
