import {
  FETCH_ALL_APPS,
  LOAD_ALL_APPS,
  FETCH_APP_ACCESS,
  LOAD_APP_ACCESS,
  FETCH_ADD_APP_ACCESS,
  LOAD_ADD_APP_ACCESS,
  FETCH_DELETE_APP_ACCESS,
  LOAD_DELETE_APP_ACCESS,
} from "../../store/actionTypes";

const DEFAULT_STATE = {
  allApps: null,
  appsLoading: false,
  appAccess: null,
  accessLoading: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_APPS:
      return { ...state, appsLoading: true };
    case LOAD_ALL_APPS:
      return { ...state, allApps: action.apps, appsLoading: false };
    case FETCH_APP_ACCESS:
      return { ...state, accessLoading: true };
    case LOAD_APP_ACCESS:
      return { ...state, appAccess: action.access, accessLoading: false };
    case FETCH_ADD_APP_ACCESS:
      // update locally
      const newAccess = [
        ...state.appAccess,
        { userId: action.userId, appId: action.appId },
      ];
      return { ...state, accessLoading: true, appAccess: newAccess };
    case LOAD_ADD_APP_ACCESS:
      // handle failure case
      return {
        ...state,
        accessLoading: false,
        appAccess: action.failed ? null : state.appAccess,
      };
    case FETCH_DELETE_APP_ACCESS:
      // update locally
      const removedAccess = [...state.appAccess].filter(
        (a) => a.userId !== action.userId || a.appId !== action.appId
      );
      return { ...state, accessLoading: true, appAccess: removedAccess };
    case LOAD_DELETE_APP_ACCESS:
      // handle failure case
      return {
        ...state,
        accessLoading: false,
        appAccess: action.failed ? null : state.appAccess,
      };
    default:
      return state;
  }
};
