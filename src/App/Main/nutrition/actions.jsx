import {
  FETCH_WEIGHT_LOGS,
  LOAD_WEIGHT_LOGS,
  FETCH_EDIT_WEIGHT_LOG,
  LOAD_EDIT_WEIGHT_LOG,
} from "../../store/actionTypes";
import API from "../../services/api";

export function getWeightLogs() {
  return API.get(
    "/api/nutrition/weight/logs",
    "Error getting weight logs",
    (weightLogs) => ({ type: LOAD_WEIGHT_LOGS, weightLogs }),
    () => ({ type: FETCH_WEIGHT_LOGS })
  );
}

export function editWeightLog(date, weight) {
  return API.post(
    "/api/nutrition/weight/logs/log",
    "Error editing weight log",
    { date, weight },
    () => ({ type: LOAD_EDIT_WEIGHT_LOG }),
    () => ({ type: FETCH_EDIT_WEIGHT_LOG })
  );
}
