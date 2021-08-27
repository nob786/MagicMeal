import { SET_RESTAURANT, SET_RESTAURANTS, PUSH_RESTAURANT_ID, PUSH_MENU_ID , PUSH_CART_DATA, PUSH_CART_TOTAL,
PUSH_INCDEC} from "../actions/types";

const initialState = {
  restaurants: [],
  restaurant: [],
  clickedRestaurantId: "",
  clickedMenuId: [],
  cartData: [],
  cartTotal: 0,
  incdec: 1,
};


export default function (state = initialState, action) {
  switch (action.type) {
    case SET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
      };

    case SET_RESTAURANT:
      return {
        ...state,
        restaurant: action.payload,
      };
      case PUSH_RESTAURANT_ID:
      return {
        ...state,
        clickedRestaurantId: action.payload,
      };
      case PUSH_MENU_ID:
      return {
        ...state,
        clickedMenuId: [...state.clickedMenuId, action.payload],
      };
      case PUSH_CART_DATA:
      return {
        ...state,
        cartData:  [...state.cartData, action.payload],
      };
      case PUSH_CART_TOTAL:
      return {
        ...state,
        cartTotal:  action.payload,
      };
      case PUSH_INCDEC:
      return {
        ...state,
        incdec:  action.payload,
      };
    default:
      return state;
  }
}
