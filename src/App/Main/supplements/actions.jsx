import {
  FETCH_SUPPLEMENTS,
  LOAD_SUPPLEMENTS,
  FETCH_SUPPLEMENT_LOGS,
  LOAD_SUPPLEMENT_LOGS,
  LOAD_EDIT_SUPPLEMENT_LOGS,
  FETCH_EDIT_SUPPLEMENT_LOGS,
  LOAD_ADD_MISSED_SUPPLEMENT_LOGS,
  FETCH_ADD_MISSED_SUPPLEMENT_LOGS,
} from "../../store/actionTypes";
import API from "../../services/api";

export function getSupplements() {
  return API.get(
    "/api/supplements",
    "Error getting supplements",
    (supplements) => ({ type: LOAD_SUPPLEMENTS, supplements }),
    () => ({ type: FETCH_SUPPLEMENTS })
  );
}

export function getSupplementLogs() {
  return API.get(
    `/api/supplements/logs`,
    "Error getting supplement logs",
    (logs) => ({
      type: LOAD_SUPPLEMENT_LOGS,
      logs,
    }),
    () => ({ type: FETCH_SUPPLEMENT_LOGS })
  );
}

export function toggleSupplementLog(item, date) {
  return API.post(
    "/api/supplements/logs",
    "Error toggling supplement log",
    { item, date },
    (failed) => ({ type: LOAD_EDIT_SUPPLEMENT_LOGS, failed }),
    () => ({ type: FETCH_EDIT_SUPPLEMENT_LOGS, item, date })
  );
}

export function addMissedSupplement(item, date, reason) {
  return API.post(
    "/api/supplements/logs/missed",
    "Error adding missed supplement",
    { item, date, reason },
    (failed) => ({ type: LOAD_ADD_MISSED_SUPPLEMENT_LOGS, failed }),
    () => ({ type: FETCH_ADD_MISSED_SUPPLEMENT_LOGS, item, date, reason })
  );
}

// export function toggleSupplementLog(item, date) {
//   return API.post(
//     "/api/supplements/logs",
//     "Error toggling supplement log",
//     { item, date },
//     getCompletedSupplements
//   );
// }
