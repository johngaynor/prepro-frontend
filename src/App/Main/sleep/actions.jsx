import {
  FETCH_SLEEP_LOGS,
  LOAD_SLEEP_LOGS,
  FETCH_SLEEP_INTEGRATIONS,
  LOAD_SLEEP_INTEGRATIONS,
  FETCH_SLEEP_SETTINGS,
  LOAD_SLEEP_SETTINGS,
  FETCH_UPDATE_SLEEP_SETTINGS,
  LOAD_UPDATE_SLEEP_SETTINGS,
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

export function getSleepSettings() {
  return API.get(
    "/api/sleep/settings",
    "Error getting sleep settings",
    (settings) => ({ type: LOAD_SLEEP_SETTINGS, settings }),
    () => ({ type: FETCH_SLEEP_SETTINGS })
  );
}

export function updateSleepSettings(name, value) {
  return API.post(
    "/api/sleep/settings",
    "Error updating sleep settings",
    { [name]: value },
    (failed) => ({ type: LOAD_UPDATE_SLEEP_SETTINGS, failed }),
    () => ({ type: FETCH_UPDATE_SLEEP_SETTINGS, name, value })
  );
}
