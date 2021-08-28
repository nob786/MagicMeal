import { ADD_DELIVERY_ADDRESS ,
  ADD_CART_RESTAURANT_ID} from "../actions/types";
    
    const initialState = {
      deliveryAddress: "",
      cartRestaurantId: "",

    };


    export default function (state = initialState, action) {
        switch (action.type) {
          case ADD_DELIVERY_ADDRESS:
            return {
              ...state,
              deliveryAddress: action.payload,
            };
            case ADD_CART_RESTAURANT_ID:
            return {
              ...state,
              cartRestaurantId: action.payload,
            };
          default:
            return state;
        }
    }