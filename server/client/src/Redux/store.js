import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist'
import thunk from "redux-thunk";

// importing reducers
import  reducers  from './reducers/rootReducer';

const initialState = {};

const middleware = [thunk];

/*const reducers = combineReducers({
  data: dataReducers,
  counter: counterReducer,
});*/

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
export const store = createStore(reducers, initialState, enhancer);
export const persistor = persistStore(store);


export default {store, persistor};
