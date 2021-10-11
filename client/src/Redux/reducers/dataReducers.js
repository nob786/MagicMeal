import { SET_RESTAURANT, SET_RESTAURANTS, PUSH_RESTAURANT_ID, PUSH_MENU_ID , PUSH_CART_DATA, PUSH_CART_TOTAL,
PUSH_INCDEC} from "../actions/types";

const initialState = {
  restaurants: [],
  restaurant: [],
  clickedRestaurantId: "",
  
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
    default:
      return state;
  }
}
