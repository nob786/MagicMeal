import { ADD_DELIVERY_ADDRESS ,
  ADD_CART_RESTAURANT_ID,
  PUSH_MENU_ID,
  ADD_CART_RESTAURANT,
  PUSH_ITEMS_LENGTH,
  PUSH_CART_TOTAL} from "../actions/types";
    
    const initialState = {
      clickedMenuId: [],
      deliveryAddress: "",
      cartRestaurantId: "",
      cartRestaurant: {},
      itemsLength: 0,
      cartTotal: 0,
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
            case ADD_CART_RESTAURANT:
            return {
              ...state,
              cartRestaurant: action.payload,
            };
            case PUSH_ITEMS_LENGTH:
            return {
              ...state,
              itemsLength: action.payload,
            };
            case PUSH_CART_TOTAL:
            return {
              ...state,
              cartTotal: action.payload,
            };
          default:
            return state;
        }
    }