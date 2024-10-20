import {
  FETCH_WEIGHT_LOGS,
  LOAD_WEIGHT_LOGS,
  FETCH_EDIT_WEIGHT_LOG,
  LOAD_EDIT_WEIGHT_LOG,
} from "../../store/actionTypes";

const DEFAULT_STATE = {
  weightLogs: null,
  logsLoading: false,
  editLoading: false,
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
    default:
      return state;
  }
};
