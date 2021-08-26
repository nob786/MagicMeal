import {
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SERVER_ERROR,
  CLEAR_ERRORS,
  LOGOUT_SUCCESS,
} from "../actions/types";
import { appReducers } from "../store";
const initialState = {
  signupSuccess: false,
  loginSuccess: false,
  logoutSuccess: false,
  serverError: false,
  errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupSuccess: true,
      };

    case SIGNUP_ERROR:
      return {
        ...state,
        errors: action.paylaod,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: true,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        errors: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutSuccess: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        signupSuccess: false,
        loginSuccess: false,
        serverError: false,
        errors: null,
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
