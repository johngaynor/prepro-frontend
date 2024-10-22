import { FETCH_SLEEP_LOGS, LOAD_SLEEP_LOGS } from "../../store/actionTypes";

const DEFAULT_STATE = {
  logs: null,
  logsLoading: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_SLEEP_LOGS:
      return { ...state, logsLoading: true };
    case LOAD_SLEEP_LOGS:
      return { ...state, logs: action.logs, logsLoading: false };
    default:
      return state;
  }
};
