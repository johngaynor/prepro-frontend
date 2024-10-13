import {
  FETCH_USER,
  LOAD_USER,
  FETCH_USERS,
  LOAD_USERS,
  FETCH_APPS,
  LOAD_APPS,
  FETCH_CHANGELOG,
  LOAD_CHANGELOG,
} from "../store/actionTypes";

const DEFAULT_STATE = {
  user: {},
  auth: false,
  apps: [],
  apiUsers: null,
  userLoading: true,
  appsLoading: false,
  changeLog: null,
  logLoading: false,
  usersLoading: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state };
    case LOAD_USER:
      return { ...state, user: action.user, auth: true, userLoading: false };
    case FETCH_USERS:
      return { ...state, usersLoading: true };
    case LOAD_USERS:
      return { ...state, apiUsers: action.users, usersLoading: false };
    case FETCH_APPS:
      return { ...state, appsLoading: true };
    case LOAD_APPS:
      return { ...state, apps: action.apps, appsLoading: false };
    case FETCH_CHANGELOG:
      return { ...state, logLoading: true };
    case LOAD_CHANGELOG:
      return { ...state, changeLog: action.payload, logLoading: false };
    default:
      return state;
  }
};
