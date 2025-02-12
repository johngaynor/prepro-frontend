import {
  FETCH_CHECKINS,
  LOAD_CHECKINS,
  FETCH_CHECKIN_COMMENTARY,
  LOAD_CHECKIN_COMMENTARY,
  FETCH_EDIT_CHECKIN,
  LOAD_EDIT_CHECKIN,
  FETCH_DELETE_CHECKIN,
  LOAD_DELETE_CHECKIN,
  FETCH_ADD_CHECKIN_COMMENTARY,
  LOAD_ADD_CHECKIN_COMMENTARY,
  FETCH_SEND_CHECKIN_PDF,
  LOAD_SEND_CHECKIN_PDF,
  FETCH_CHECKIN_AI_SUMMARY,
  LOAD_CHECKIN_AI_SUMMARY,
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
  pdfLoading: false,
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
    case FETCH_EDIT_CHECKIN:
      return { ...state, editLoading: true };
    case LOAD_EDIT_CHECKIN:
      return {
        ...state,
        editLoading: false,
        checkIns: null,
      };
    case FETCH_DELETE_CHECKIN:
      // update locally
      const newCheckIns = state.checkIns.filter(
        (c) => c.id !== action.checkInId
      );
      return { ...state, checkIns: newCheckIns, editLoading: true };
    case LOAD_DELETE_CHECKIN:
      // handle failure case
      return {
        ...state,
        editLoading: false,
        checkIns: action.failed ? null : state.checkIns,
      };
    case FETCH_ADD_CHECKIN_COMMENTARY:
      // update locally
      const newComments = [...state.commentary, { ...action.values }];
      return { ...state, commentaryLoading: true, commentary: newComments };
    case LOAD_ADD_CHECKIN_COMMENTARY:
      // handle failure case
      return {
        ...state,
        commentary: action.failed ? null : state.commentary,
        commentaryLoading: false,
      };
    case FETCH_SEND_CHECKIN_PDF:
      return { ...state, pdfLoading: true };
    case LOAD_SEND_CHECKIN_PDF:
      return { ...state, pdfLoading: false, commentaryId: null };
    case FETCH_CHECKIN_AI_SUMMARY:
      return { ...state, editLoading: true };
    case LOAD_CHECKIN_AI_SUMMARY:
      return { ...state, editLoading: false, checkIns: null };
    default:
      return state;
  }
};
