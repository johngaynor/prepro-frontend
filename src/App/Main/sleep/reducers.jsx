import {
  FETCH_SLEEP_LOGS,
  LOAD_SLEEP_LOGS,
  FETCH_SLEEP_INTEGRATIONS,
  LOAD_SLEEP_INTEGRATIONS,
  FETCH_SLEEP_SETTINGS,
  LOAD_SLEEP_SETTINGS,
  FETCH_UPDATE_SLEEP_SETTINGS,
  LOAD_UPDATE_SLEEP_SETTINGS,
  FETCH_GET_OURA_LOG,
  LOAD_GET_OURA_LOG,
} from "../../store/actionTypes";

const DEFAULT_STATE = {
  editLoading: false,
  logs: null,
  logsLoading: false,
  integrations: null,
  integrationsLoading: false,
  settings: null,
  settingsLoading: false,
  checkedOura: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_SLEEP_LOGS:
      return { ...state, logsLoading: true };
    case LOAD_SLEEP_LOGS:
      return { ...state, logs: action.logs, logsLoading: false };
    case FETCH_SLEEP_INTEGRATIONS:
      return { ...state, integrationsLoading: true };
    case LOAD_SLEEP_INTEGRATIONS:
      return {
        ...state,
        integrations: action.integrations,
        integrationsLoading: false,
      };
    case FETCH_SLEEP_SETTINGS:
      return { ...state, settingsLoading: true };
    case LOAD_SLEEP_SETTINGS:
      return {
        ...state,
        settings: action.settings,
        settingsLoading: false,
      };
    case FETCH_UPDATE_SLEEP_SETTINGS:
      const { name, value } = action;
      // update locally
      const newSettings = { ...state.settings, [name]: value };
      return { ...state, editLoading: true, settings: newSettings };
    case LOAD_UPDATE_SLEEP_SETTINGS:
      // handle failure case
      return {
        ...state,
        editLoading: false,
        settings: action.failed ? null : state.settings,
      };
    case FETCH_GET_OURA_LOG:
      return { ...state, editLoading: true };
    case LOAD_GET_OURA_LOG:
      return { ...state, editLoading: false, checkedOura: true, logs: null };
    default:
      return state;
  }
};
