import {
  FETCH_WEIGHT_LOGS,
  LOAD_WEIGHT_LOGS,
  FETCH_EDIT_WEIGHT_LOG,
  LOAD_EDIT_WEIGHT_LOG,
  FETCH_DIET_LOGS,
  LOAD_DIET_LOGS,
} from "../../store/actionTypes";

const DEFAULT_STATE = {
  weightLogs: null,
  logsLoading: false,
  editLoading: false,
  dietLogs: null,
  dietLogsLoading: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_WEIGHT_LOGS:
      return { ...state, logsLoading: true };
    case LOAD_WEIGHT_LOGS:
      return { ...state, weightLogs: action.weightLogs, logsLoading: false };
    case FETCH_EDIT_WEIGHT_LOG:
      return { ...state, editLoading: true };
    case LOAD_EDIT_WEIGHT_LOG:
      return { ...state, editLoading: false };
    case FETCH_DIET_LOGS:
      return { ...state, dietLogsLoading: true };
    case LOAD_DIET_LOGS:
      return { ...state, dietLogs: action.dietLogs, dietLogsLoading: false };
    default:
      return state;
  }
};
