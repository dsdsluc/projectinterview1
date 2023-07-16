import { combineReducers } from "redux";
import { CartReducer } from "./Cart"
import { FinshReducer } from "./Finsh"
const allReducers = combineReducers({
    CartReducer,FinshReducer
})
export default allReducers;