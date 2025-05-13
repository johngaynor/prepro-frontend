import {
  FETCH_WEIGHT_LOGS,
  LOAD_WEIGHT_LOGS,
  FETCH_EDIT_WEIGHT_LOG,
  LOAD_EDIT_WEIGHT_LOG,
  FETCH_DIET_LOGS,
  LOAD_DIET_LOGS,
  FETCH_EDIT_DIET_LOG,
  LOAD_EDIT_DIET_LOG,
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

export function editWeightLog(date, weight, steps) {
  return API.post(
    "/api/nutrition/weight/logs/log",
    "Error editing weight log",
    { date, weight, steps },
    (failed) => ({ type: LOAD_EDIT_WEIGHT_LOG, failed }),
    () => ({ type: FETCH_EDIT_WEIGHT_LOG, date, weight, steps })
  );
}

export function getDietLogs() {
  return API.get(
    "/api/nutrition/diet",
    "Error getting diet logs",
    (dietLogs) => ({ type: LOAD_DIET_LOGS, dietLogs }),
    () => ({ type: FETCH_DIET_LOGS })
  );
}

export function editDietLog(values) {
  return API.post(
    "/api/nutrition/diet",
    "Error editing diet log",
    { ...values },
    () => ({ type: LOAD_EDIT_DIET_LOG }),
    () => ({ type: FETCH_EDIT_DIET_LOG })
  );
}

export function deleteDietLog(id) {
  return API.delete(
    `/api/nutrition/diet/log/${id}`,
    "Error deleting diet log",
    () => ({ type: LOAD_EDIT_DIET_LOG }),
    () => ({ type: FETCH_EDIT_DIET_LOG })
  );
}
