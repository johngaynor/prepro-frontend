import {
  FETCH_USER_ACTIVITIES,
  LOAD_USER_ACTIVITIES,
} from "../../store/actionTypes";

const DEFAULT_STATE = {
  activities: null,
  activitiesLoading: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_ACTIVITIES:
      return { ...state, activitiesLoading: true };
    case LOAD_USER_ACTIVITIES:
      return {
        ...state,
        activities: action.activities,
        activitiesLoading: false,
      };

    default:
      return state;
  }
};
