import { ADD_DELIVERY_ADDRESS,
  ADD_CART_RESTAURANT_ID} from "./types";


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
