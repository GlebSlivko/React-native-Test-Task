import {combineReducers} from "redux";
import categoriesReducer from "./categoriesReducer"
import allPostsReducer from "./allPostsReducer";

export default combineReducers({
    categoriesReducer,
    allPostsReducer,
});
