import { combineReducers, createStore } from "redux";
import countReducer from "./countReducer";
import shopCarReducer from "./shopCarReducer";
const allReducer = combineReducers({
    count: countReducer,
    shopCar: shopCarReducer
})
const store = createStore(allReducer);

export default store