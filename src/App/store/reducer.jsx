import { combineReducers } from "redux";
import checkIns from "../Main/checkIns/reducers";
import activities from "../Main/activity/reducers";
import physique from "../Main/physique/reducers";
import nutrition from "../Main/nutrition/reducers";
import supplements from "../Main/nutrition/supplements/reducers";
import app from "../Main/reducers";
import admin from "../Main/admin/reducers";
import fitness from "../Main/fitness/reducers";
import sleep from "../Main/sleep/reducers";

const rootReducer = combineReducers({
  app,
  supplements,
  activities,
  physique,
  nutrition,
  checkIns,
  admin,
  fitness,
  sleep,
});

export default rootReducer;
