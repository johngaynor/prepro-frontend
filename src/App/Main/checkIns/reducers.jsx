const DEFAULT_STATE = {
  checkIns: null,
  checkInsLoading: false,
  dailyLogs: null,
  logsLoading: false,
  commentary: null,
  commentaryLoading: false,
  commentaryId: null,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "FETCH_CHECKINS":
      return { ...state, checkInsLoading: true };
    case "LOAD_CHECKINS":
      return { ...state, checkIns: action.checkIns, checkInsLoading: false };
    case "FETCH_DAILY_LOGS":
      return { ...state, logsLoading: true };
    case "LOAD_DAILY_LOGS":
      return { ...state, dailyLogs: action.dailyLogs, logsLoading: false };
    case "FETCH_CHECKIN_COMMENTARY":
      return { ...state, commentaryLoading: true };
    case "LOAD_CHECKIN_COMMENTARY":
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
