import { FETCH_WEIGHT_LOGS, LOAD_WEIGHT_LOGS } from "../../store/actionTypes";
import API from "../../services/api";

export function getWeightLogs() {
  return API.get(
    "/api/nutrition/weight/logs",
    "Error getting weight logs",
    (weightLogs) => ({ type: LOAD_WEIGHT_LOGS, weightLogs }),
    () => ({ type: FETCH_WEIGHT_LOGS })
  );
}
