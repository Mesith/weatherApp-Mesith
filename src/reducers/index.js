import { combineReducers } from "redux";
import authReducer from "./authReducer";
import weatherReducer from "./weatherReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    weather: weatherReducer
})