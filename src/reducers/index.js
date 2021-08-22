import { combineReducers } from 'redux';
import { googleReducer } from './reducerGoogle';

const rootReducer = combineReducers({
    googleReducer,
})

export default rootReducer;