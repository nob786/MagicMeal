import { INC_VAL, DEC_VAL } from "../actions/types";

const initialState = {
  counter: 5,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INC_VAL:
      return {
        ...state,
        counter: state.counter + 1,
      };

    case DEC_VAL:
      return {
        ...state,
        counter: state.counter + 1,
      };
    default:
      return state;
  }
}
