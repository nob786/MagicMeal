import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';


// importing reducers
import dataReducers from './dataReducers';
import counterReducer from './counterReducer';
import cartReducer from './cartReducer';




const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['data','cart']
}

const reducers = combineReducers({
    data: dataReducers,
    counter: counterReducer,
    cart: cartReducer,
  });


  export default persistReducer(persistConfig, reducers);