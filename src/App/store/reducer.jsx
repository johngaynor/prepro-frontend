import { combineReducers } from "redux";
// import checkIns from "./Main/checkIns/reducers";
import supplements from "../Main/supplements/reducers";
import activities from "../Main/activity/reducers";
import physique from "../Main/physique/reducers";

const rootReducer = combineReducers({ supplements, activities, physique });

export default rootReducer;
