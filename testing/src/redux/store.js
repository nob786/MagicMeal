import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

// Importing reducers
import authReducers from "./reducers/authReducers";
import dataReducers from "./reducers/dataReducers";

const initialState = [];

const middleware = [thunk];

const reducers = combineReducers({
  auth: authReducers,
  data: dataReducers,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
