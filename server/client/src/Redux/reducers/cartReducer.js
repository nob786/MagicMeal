import {
  ADD_DELIVERY_ADDRESS,
  ADD_CART_RESTAURANT_ID,
  PUSH_MENU_ID,
  ADD_CART_RESTAURANT,
  PUSH_ITEMS_LENGTH,
  PUSH_CART_TOTAL,
  INC_CART_ITEM_QUANTITY,
  DEC_CART_ITEM_QUANTITY,
  DELETE_CART_ITEM,
  CLEAR_CART,
} from "../actions/types";

const initialState = {
  clickedMenuId: [],
  deliveryAddress: "",
  cartRestaurantId: "",
  cartRestaurant: {},
  itemsLength: 0,
  cartTotal: 0,
  check: 0,
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
      let itemsLength = state.clickedMenuId.length;
      return {
        ...state,
        itemsLength: itemsLength,
      };
    case PUSH_CART_TOTAL:
      let total = 0;
      state.clickedMenuId.map((currItem) => {
        return (total = total + currItem.total);
      });
      return {
        ...state,
        cartTotal: total,
      };
    case INC_CART_ITEM_QUANTITY:
      let input = action.payload;
      //let a = state.clickedMenuId.filter((n) => n._id === input);
      //state.clickedMenuId[0].quantity = 2;
      //state.clickedMenuId[0].total =
      //state.clickedMenuId[0].quantity * state.clickedMenuId[0].price;
      //state.clickedMenuId.filter((n) => n._id === input).quantity = 9;
      //state.clickedMenuId.findIndex((obj) => obj._id === input);
      let index = state.clickedMenuId.findIndex((obj) => obj._id === input);
      state.clickedMenuId[index].quantity += 1;
      state.clickedMenuId[index].total =
        state.clickedMenuId[index].quantity * state.clickedMenuId[index].price;
      return {
        ...state,
        check: 1,
      };
    case DEC_CART_ITEM_QUANTITY:
      //let a = state.clickedMenuId.filter((n) => n._id === input);
      //state.clickedMenuId[0].quantity = 2;
      //state.clickedMenuId[0].total =
      //state.clickedMenuId[0].quantity * state.clickedMenuId[0].price;
      //state.clickedMenuId.filter((n) => n._id === input).quantity = 9;
      //state.clickedMenuId.findIndex((obj) => obj._id === input);
      let index2 = state.clickedMenuId.findIndex(
        (obj) => obj._id === action.payload
      );
      state.clickedMenuId[index2].quantity -= 1;
      state.clickedMenuId[index2].total =
        state.clickedMenuId[index2].quantity *
        state.clickedMenuId[index2].price;
      return {
        ...state,
        check: 2,
      };
    case DELETE_CART_ITEM:
      let filteredCart = state.clickedMenuId.filter(
        (n) => !(n._id === action.payload)
      );
      return {
        ...state,
        clickedMenuId: filteredCart,
      };
    case CLEAR_CART:
      let d;
      return {
        ...state,
        check: 4,
      };
    default:
      return state;
  }
}
