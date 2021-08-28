import { AUTH_REST,AUTH_CUST } from "./types";


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