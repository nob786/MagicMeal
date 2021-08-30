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
  CATCH_ERROR,
  PUSH_RESTAURANT_ID,
  FETCH_MENU_FOR_CUSTOMER,
  ADD_TO_CART,
  ADD_TO_CART_ERROR,
} from "./types";

//_________All actions for fetching data for restaurants__________//

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
export const getMenus = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/item/get-items", {
        headers: {
          authorization:
            localStorage.getItem("token") !== null
              ? JSON.parse(localStorage.getItem("token"))
              : null,
        },
      });
      const resData = await response.data;
      if (!resData) {
        dispatch({
          type: FETCH_ERROR,
          paylaod: resData,
        });
      }

      console.log("Data fetched", resData);

      dispatch({
        type: GET_MENUS,
        paylaod: resData,
      });
    } catch (error) {
      if (error) {
        console.log("Error in catch block", error);
        dispatch({
          type: CATCH_ERROR,
          payload: error,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
        console.log("Server Erorr");
      }
    }

    // .then((res) => {
    //   dispatch({
    //     type: GET_MENUS,
    //     paylaod: res.data,
    //   });
    //   console.log("Get Menus Called");
    // })
    // .catch((err) => {
    //   if (err) {
    //     dispatch({
    //       type: FETCH_ERROR,
    //       payload: err.response.data,
    //     });
    //   } else {
    //     dispatch({
    //       type: SERVER_ERROR,
    //     });
    //   }
    // });
  };
};

// Adding a menu
export const addMenu = (menuData) => async (dispatch) => {
  axios
    .post("http://localhost:3001/item/add-item", menuData, {
      headers: {
        authorization:
          localStorage.getItem("token") !== null
            ? JSON.parse(localStorage.getItem("token"))
            : null,
      },
    })
    .then((res) => {
      dispatch({
        type: ADD_ITEM,
        payload: res.data.itemData,
      });
      console.log("Dispatch action called for ADD_ITEM");
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
export const delMenu = (itemId) => {
  console.log("itemId", itemId);
  return async (dispatch) => {
    try {
      console.log("item id in try", itemId);
      const response = await axios.delete(
        `http://localhost:3001/item/delete-item/${itemId}`,
        {
          headers: {
            authorization:
              localStorage.getItem("token") !== null
                ? JSON.parse(localStorage.getItem("token"))
                : null,
          },
        }
      );
      console.log(
        "Called delMenu action with token:",
        localStorage.getItem("token")
      );
      if (!response) {
        dispatch({
          type: DELETE_ITEM_ERROR,
          payload: response.error,
        });
        window.alert("Did not get response from server.");
      } else {
        dispatch({
          type: DELETE_ITEM,
          payload: true,
        });
        window.alert("Item deleted");
      }
    } catch (error) {
      if (error) {
        dispatch({
          type: CATCH_ERROR,
          paylaod: error,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    }
  };
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

//____________________________________ All User Actions______________________________________//

// Getting restaurant id for accessing its menus
export const pushRestId = (restId) => (dispatch) => {
  dispatch({
    type: PUSH_RESTAURANT_ID,
    payload: restId,
  });
};

// Fetching menus of a specific restaurant
export const fetchMenusForCustomer = (restId) => {
  return async (dispatch) => {
    console.log("Action dispatched fetchMenusForCustomer");
    axios
      .get(`http://localhost:3001/user/get-restaurant-menu/${restId}`)
      .then((response) => {
        console.log("API for fetchMenusForCustomer called!");
        dispatch({
          type: FETCH_MENU_FOR_CUSTOMER,
          payload: response.data,
        });
      });
  };
};

// Adding items to redux cart for checkout
export const addToReduxCart = (item) => (dispatch) => {
  console.log("Add to cart action called");
  if (!item) {
    dispatch({
      type: ADD_TO_CART_ERROR,
      paylaod: true,
    });
  } else {
    dispatch({
      type: ADD_TO_CART,
      payload: {
        item: item,
        //quantity: 1,
      },
    });
  }
};
