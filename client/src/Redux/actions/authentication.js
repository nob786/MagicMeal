import { AUTH_REST,AUTH_CUST,
  ADD_CUSTOMER_DATA,
  ADD_RESTAURANT_DATA } from "./types";


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