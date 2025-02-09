import {
  FETCH_SLEEP_LOGS,
  LOAD_SLEEP_LOGS,
  FETCH_SLEEP_INTEGRATIONS,
  LOAD_SLEEP_INTEGRATIONS,
} from "../../store/actionTypes";

const DEFAULT_STATE = {
  logs: null,
  logsLoading: false,
  integrations: null,
  integrationsLoading: false,
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
    default:
      return state;
  }
};
