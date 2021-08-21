import axios from "axios";
import { SERVER_ERROR, FETCH_ERROR } from "./types";

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

export const getMenus = () => (dispatch) => {
  axios
    .get("http://localhost:3001/item/get-items")
    .then((res) => {
      dispatch({
        type: SET_MENUS,
        paylaod: res.data.items,
      });
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

export const delMenu = (menuId, history) => (dispatch) => {
  axios
    .delete(`http://localhost:3001/delete-item/${menuId}`)
    .then((res) => {
      dispatch({
        type: DEL_ITEM,
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
