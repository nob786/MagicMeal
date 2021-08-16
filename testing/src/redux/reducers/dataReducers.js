import { SET_RESTAURANT, SET_RESTAURANTS } from "../actions/types";

const initialState = {
  restaurants: [],
  restaurant: [],
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
    default:
      return state;
  }
}
