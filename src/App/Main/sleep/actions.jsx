import {
  FETCH_SLEEP_LOGS,
  LOAD_SLEEP_LOGS,
  FETCH_SLEEP_INTEGRATIONS,
  LOAD_SLEEP_INTEGRATIONS,
} from "../../store/actionTypes";
import API from "../../services/api";

export function getSleepLogs() {
  return API.get(
    "/api/sleep/logs",
    "Error getting sleep logs",
    (logs) => ({ type: LOAD_SLEEP_LOGS, logs }),
    () => ({ type: FETCH_SLEEP_LOGS })
  );
}

export function getSleepIntegrations() {
  return API.get(
    "/api/sleep/integrations",
    "Error getting sleep integrations",
    (integrations) => ({ type: LOAD_SLEEP_INTEGRATIONS, integrations }),
    () => ({ type: FETCH_SLEEP_INTEGRATIONS })
  );
}
