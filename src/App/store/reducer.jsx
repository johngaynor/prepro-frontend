import { combineReducers } from "redux";
import checkIns from "../Main/checkIns/reducers";
import supplements from "../Main/supplements/reducers";
import activities from "../Main/activity/reducers";
import physique from "../Main/physique/reducers";
import nutrition from "../Main/nutrition/reducers";
import app from "../Main/reducers";
import admin from "../Main/admin/reducers";

const rootReducer = combineReducers({
  app,
  supplements,
  activities,
  physique,
  nutrition,
  checkIns,
  admin,
});

export default rootReducer;
