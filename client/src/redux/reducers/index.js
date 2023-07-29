import { combineReducers } from 'redux';
import addItems from "./addItem";


const rootReducers = combineReducers({
    addItem: addItems
});

export default rootReducers;