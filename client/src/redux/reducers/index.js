import { combineReducers } from 'redux';
import addItems from "./addItem";


const rootReducers = combineReducers({
    addItem: addItems, // Use the reducer as 'addItem'
});

export default rootReducers;