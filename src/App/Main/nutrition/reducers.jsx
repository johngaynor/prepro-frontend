import {
  FETCH_WEIGHT_LOGS,
  LOAD_WEIGHT_LOGS,
  FETCH_EDIT_WEIGHT_LOG,
  LOAD_EDIT_WEIGHT_LOG,
  FETCH_DIET_LOGS,
  LOAD_DIET_LOGS,
  FETCH_EDIT_DIET_LOG,
  LOAD_EDIT_DIET_LOG,
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
      // delete if weight is empty
      if (action.weight === "") {
        const newLogs = state.weightLogs.filter((l) => l.date !== action.date);
        return { ...state, weightLogs: newLogs, editLoading: true };
      }

      // add if no current log
      const currentLog = state.weightLogs.find((l) => l.date === action.date);
      if (!currentLog) {
        return {
          ...state,
          weightLogs: [
            ...state.weightLogs,
            { date: action.date, weight: action.weight },
          ],
          editLoading: true,
        };
      } else {
        // update existing log
        const newLogs = state.weightLogs.map((l) => {
          if (l.date === action.date) {
            return { ...l, weight: action.weight };
          }
          return l;
        });
        return { ...state, weightLogs: newLogs, editLoading: true };
      }
    case LOAD_EDIT_WEIGHT_LOG:
      return {
        ...state,
        editLoading: false,
        weightLogs: action.failed ? null : action.weightLogs,
      };
    case FETCH_DIET_LOGS:
      return { ...state, dietLogsLoading: true };
    case LOAD_DIET_LOGS:
      return { ...state, dietLogs: action.dietLogs, dietLogsLoading: false };
    case FETCH_EDIT_DIET_LOG:
      return { ...state, editLoading: true };
    case LOAD_EDIT_DIET_LOG:
      return { ...state, editLoading: false, dietLogs: null };
    default:
      return state;
  }
};
