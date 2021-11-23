import {
  ADD_DELIVERY_ADDRESS,
  ADD_CART_RESTAURANT_ID,
  PUSH_MENU_ID,
  ADD_CART_RESTAURANT,
  PUSH_ITEMS_LENGTH,
  PUSH_CART_TOTAL,
  INC_CART_ITEM_QUANTITY,
  DEC_CART_ITEM_QUANTITY,
  DELETE_CART_ITEM,
  CLEAR_CART,
} from "./types";

export const pushMenuId = (menu) => (dispatch) => {
  dispatch({
    type: PUSH_MENU_ID,
    payload: menu,
  });
};

export const addDeliveryAddress = (address) => (dispatch) => {
  dispatch({
    type: ADD_DELIVERY_ADDRESS,
    payload: address,
  });
};

export const pushcartRestaurantId = (id) => (dispatch) => {
  dispatch({
    type: ADD_CART_RESTAURANT_ID,
    payload: id,
  });
};

export const pushcartRestaurant = (restaurant) => (dispatch) => {
  dispatch({
    type: ADD_CART_RESTAURANT,
    payload: restaurant,
  });
};

export const pushItemsLength = () => (dispatch) => {
  dispatch({
    type: PUSH_ITEMS_LENGTH,
  });
};

export const pushCartTotal = () => (dispatch) => {
  dispatch({
    type: PUSH_CART_TOTAL,
  });
};

export const incCartItemQuantity = (menuId) => (dispatch) => {
  dispatch({
    type: INC_CART_ITEM_QUANTITY,
    payload: menuId,
  });
};

export const decCartItemQuantity = (menuId) => (dispatch) => {
  dispatch({
    type: DEC_CART_ITEM_QUANTITY,
    payload: menuId,
  });
};

export const deleteCartItem = (menuId) => (dispatch) => {
  dispatch({
    type: DELETE_CART_ITEM,
    payload: menuId,
  });
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });
};

//===============================================User Cart Testing=======================================
