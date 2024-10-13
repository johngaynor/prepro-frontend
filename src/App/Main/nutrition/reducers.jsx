import { FETCH_WEIGHT_LOGS, LOAD_WEIGHT_LOGS } from "../../store/actionTypes";

const DEFAULT_STATE = {
  weightLogs: null,
  logsLoading: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_WEIGHT_LOGS:
      return { ...state, logsLoading: true };
    case LOAD_WEIGHT_LOGS:
      return { ...state, weightLogs: action.weightLogs, logsLoading: false };
    default:
      return state;
  }
};
