import { ADD_DELIVERY_ADDRESS ,
  ADD_CART_RESTAURANT_ID,
  PUSH_MENU_ID} from "../actions/types";
    
    const initialState = {
      clickedMenuId: [],
      deliveryAddress: "",
      cartRestaurantId: "",

    };


    export default function (state = initialState, action) {
        switch (action.type) {
          case PUSH_MENU_ID:
            return {
              ...state,
              clickedMenuId: [...state.clickedMenuId, action.payload],
            };
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