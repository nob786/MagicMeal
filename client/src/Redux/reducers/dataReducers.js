import { SET_RESTAURANT, SET_RESTAURANTS, PUSH_RESTAURANT_ID,PUSH_CLICKED_RESTAURANT_DATA} from "../actions/types";

const initialState = {
  restaurants: [],
  restaurant: [],
  clickedRestaurantId: "",
  clickedRestaurantData: {},
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
      case PUSH_CLICKED_RESTAURANT_DATA:
      return {
        ...state,
        clickedRestaurantData: action.payload,
      };
    default:
      return state;
  }
}
