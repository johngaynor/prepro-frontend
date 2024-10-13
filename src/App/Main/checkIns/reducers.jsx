import {
  FETCH_CHECKINS,
  LOAD_CHECKINS,
  FETCH_CHECKIN_COMMENTARY,
  LOAD_CHECKIN_COMMENTARY,
} from "../../store/actionTypes";

const DEFAULT_STATE = {
  checkIns: null,
  checkInsLoading: false,
  weightLogs: null,
  logsLoading: false,
  commentary: null,
  commentaryLoading: false,
  commentaryId: null,
  editLoading: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_CHECKINS:
      return { ...state, checkInsLoading: true };
    case LOAD_CHECKINS:
      return { ...state, checkIns: action.checkIns, checkInsLoading: false };
    case FETCH_CHECKIN_COMMENTARY:
      return { ...state, commentaryLoading: true };
    case LOAD_CHECKIN_COMMENTARY:
      return {
        ...state,
        commentary: action.commentary,
        commentaryId: action.checkInId,
        commentaryLoading: false,
      };
    default:
      return state;
  }
};
