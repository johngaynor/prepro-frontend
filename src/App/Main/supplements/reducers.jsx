import {
  FETCH_SUPPLEMENTS,
  LOAD_SUPPLEMENTS,
  FETCH_SUPPLEMENT_LOGS,
  LOAD_SUPPLEMENT_LOGS,
} from "../../store/actionTypes";

const DEFAULT_STATE = {
  supplements: null,
  supplementsLoading: false,
  logs: null,
  logsLoading: false,
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
    default:
      return state;
  }
};
