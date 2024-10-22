import { FETCH_SLEEP_LOGS, LOAD_SLEEP_LOGS } from "../../store/actionTypes";
import API from "../../services/api";

export function getSleepLogs() {
  return API.get(
    "/api/sleep/logs",
    "Error getting sleep logs",
    (logs) => ({ type: LOAD_SLEEP_LOGS, logs }),
    () => ({ type: FETCH_SLEEP_LOGS })
  );
}
