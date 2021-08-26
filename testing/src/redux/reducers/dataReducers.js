import {
  ADD_TO_CART_ERROR,
  CLEAR_ERRORS,
  PUSH_RESTAURANT_ID,
  UPDATE_ITEM_ERROR,
} from "../actions/types";
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
  FETCH_MENU_FOR_CUSTOMER,
  ADD_TO_CART,
} from "../actions/types";

const initialState = {
  fetchedRestaurants: [],
  fetchedMenus: [],
  restId: [],
  fetchedMenusForCustomer: [],
  cart: [],
  itemAdded: false,
  itemDeleted: false,
  itemUpdated: false,
  serverError: false,
  cartError: false,
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

    case PUSH_RESTAURANT_ID:
      return {
        ...state,
        restId: action.payload,
      };

    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
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

    case FETCH_MENU_FOR_CUSTOMER:
      return {
        ...state,
        fetchedMenusForCustomer: action.payload,
      };

    case ADD_TO_CART_ERROR:
      return {
        ...state,
        cartError: action.payload,
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
