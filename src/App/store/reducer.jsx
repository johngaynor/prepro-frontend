import { combineReducers } from "redux";
// import checkIns from "./Main/checkIns/reducers";
import supplements from "../Main/supplements/reducers";

const rootReducer = combineReducers({ supplements });

export default rootReducer;
