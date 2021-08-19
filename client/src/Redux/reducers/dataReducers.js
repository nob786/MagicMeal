import { SET_RESTAURANT, SET_RESTAURANTS, PUSH_RESTAURANT_ID, PUSH_MENU_ID } from "../actions/types";

const initialState = {
  restaurants: [],
  restaurant: [],
  clickedRestaurantId: "",
  clickedMenuId: [],
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
    default:
      return state;
  }
}
