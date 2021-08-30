import { AUTH_REST,AUTH_CUST,
  ADD_CUSTOMER_DATA } from "./types";


export const authRest = (token) => (dispatch) => {
    
    dispatch({
      type: AUTH_REST,
      payload: token,
    });
  
  };

  export const authCust = (token) => (dispatch) => {
  
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