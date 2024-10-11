import {
  FETCH_SUPPLEMENTS,
  LOAD_SUPPLEMENTS,
  FETCH_SUPPLEMENT_LOGS,
  LOAD_SUPPLEMENT_LOGS,
  FETCH_EDIT_SUPPLEMENT_LOGS,
  LOAD_EDIT_SUPPLEMENT_LOGS,
  FETCH_ADD_MISSED_SUPPLEMENT_LOGS,
  LOAD_ADD_MISSED_SUPPLEMENT_LOGS,
} from "../../store/actionTypes";

const DEFAULT_STATE = {
  supplements: null,
  supplementsLoading: false,
  logs: null,
  logsLoading: false,
  editLoading: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_SUPPLEMENTS:
      return { ...state, supplementsLoading: true };
    case LOAD_SUPPLEMENTS:
      return {
        ...state,
        supplements: action.supplements,
        supplementsLoading: false,
      };
    case FETCH_SUPPLEMENT_LOGS:
      return { ...state, logsLoading: true };
    case LOAD_SUPPLEMENT_LOGS:
      return {
        ...state,
        logs: action.logs,
        logsLoading: false,
      };
    case FETCH_EDIT_SUPPLEMENT_LOGS:
      const newLogs = [...state.logs];
      if (action.item.completed) {
        // removing locally
        const filteredLogs = newLogs.filter(
          (log) =>
            log.supplementId !== action.item.id || log.date !== action.date
        );
        return { ...state, logs: filteredLogs, editLoading: true };
      } else {
        // adding locally
        newLogs.push({
          supplementId: action.item.id,
          date: action.date,
          completed: 1,
        });
        return { ...state, logs: newLogs, editLoading: true };
      }
    case LOAD_EDIT_SUPPLEMENT_LOGS:
      return {
        ...state,
        logs: action.failed ? null : state.logs,
        editLoading: false,
      };
    case FETCH_ADD_MISSED_SUPPLEMENT_LOGS:
      // adding locally
      return {
        ...state,
        editLoading: true,
        logs: [
          ...state.logs,
          {
            supplementId: action.item.id,
            date: action.date,
            completed: 0,
            reason: action.reason,
          },
        ],
      };
    case LOAD_ADD_MISSED_SUPPLEMENT_LOGS:
      return {
        ...state,
        logs: action.failed ? null : state.logs,
        editLoading: false,
      };

    default:
      return state;
  }
};
