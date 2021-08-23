import { CLEAR_ERRORS, UPDATE_ITEM_ERROR } from "../actions/types";
import {
  SERVER_ERROR,
  FETCH_ERROR,
  ADD_ITEM,
  ADD_ITEM_ERROR,
  GET_RESTAURANTS,
  GET_MENUS,
  DELETE_ITEM,
  DELETE_ITEM_ERROR,
  UPDATE_ITEM,
} from "../actions/types";

const initialState = {
  fetchedRestaurants: [],
  fetchedMenus: [],
  itemAdded: false,
  itemDeleted: false,
  itemUpdated: false,
  serverError: false,
  errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RESTAURANTS:
      return {
        ...state,
        fetchedRestaurants: action.paylaod,
      };

    case GET_MENUS:
      return {
        ...state,
        fetchedMenus: action.paylaod,
      };

    case ADD_ITEM:
      return {
        ...state,
        itemAdded: true,
      };

    case DELETE_ITEM:
      return {
        ...state,
        itemDeleted: true,
      };

    case UPDATE_ITEM:
      return {
        ...state,
        itemUpdated: true,
      };
    case ADD_ITEM_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case UPDATE_ITEM_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case DELETE_ITEM_ERROR:
      return {
        ...state,
        errors: action.payload,
      };

    case FETCH_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case SERVER_ERROR:
      return {
        ...state,
        serverError: true,
      };
    default:
      return state;
  }
}
