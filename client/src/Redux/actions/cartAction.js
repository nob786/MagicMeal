import { ADD_DELIVERY_ADDRESS,
  ADD_CART_RESTAURANT_ID, PUSH_MENU_ID,} from "./types";




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
