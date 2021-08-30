import { AUTH_REST,AUTH_CUST,ADD_CUSTOMER_DATA } from "../actions/types";
    
    const initialState = {
      authRest: false,
      authCust: false,
      custData: {},
      restData: {},

    };




    export default function (state = initialState, action) {
        switch (action.type) {
          case AUTH_REST:
            return {
              ...state,
              counter: state.counter+1,
            };
      
          case AUTH_CUST:
            return {
              ...state,
              counter: state.counter+1,
            }; 
            case ADD_CUSTOMER_DATA:
            return {
              ...state,
              custData: action.payload,
            };
          default:
            return state;
        }
      }