import {
  FETCH_WORKOUT_LOGS,
  LOAD_WORKOUT_LOGS,
  FETCH_EDIT_WORKOUT_SUMMARY,
  LOAD_EDIT_WORKOUT_SUMMARY,
  FETCH_EDIT_WORKOUT_EXERCISES,
  LOAD_EDIT_WORKOUT_EXERCISES,
  FETCH_DELETE_WORKOUT_SUMMARY,
  LOAD_DELETE_WORKOUT_SUMMARY,
  FETCH_DELETE_WORKOUT_EXERCISE,
  LOAD_DELETE_WORKOUT_EXERCISE,
  FETCH_EXERCISE_TYPES,
  LOAD_EXERCISE_TYPES,
  FETCH_ADD_EXERCISE_TYPE,
  LOAD_ADD_EXERCISE_TYPE,
  FETCH_DELETE_EXERCISE_TYPE,
  LOAD_DELETE_EXERCISE_TYPE,
  FETCH_WORKOUT_TEMPLATES,
  LOAD_WORKOUT_TEMPLATES,
  FETCH_EDIT_TEMPLATE_EXERCISE,
  LOAD_EDIT_TEMPLATE_EXERCISE,
  FETCH_DELETE_TEMPLATE_EXERCISE,
  LOAD_DELETE_TEMPLATE_EXERCISE,
  FETCH_COPY_WORKOUT_FROM_TEMPLATE,
  LOAD_COPY_WORKOUT_FROM_TEMPLATE,
  FETCH_CHANGE_EXERCISE_POSITION,
  LOAD_CHANGE_EXERCISE_POSITION,
} from "../../store/actionTypes";

const DEFAULT_STATE = {
  workoutLogs: null,
  logsLoading: false,
  exerciseTypes: null,
  typesLoading: false,
  templates: null,
  templatesLoading: false,
  editLoading: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_WORKOUT_LOGS:
      return { ...state, logsLoading: true };
    case LOAD_WORKOUT_LOGS:
      return { ...state, workoutLogs: action.workoutLogs, logsLoading: false };
    // case FETCH_EDIT_WORKOUT_SUMMARY:
    //   return { ...state };
    // case LOAD_EDIT_WORKOUT_SUMMARY:
    //   return { ...state };
    // case FETCH_EDIT_WORKOUT_EXERCISES:
    //   return { ...state };
    // case LOAD_EDIT_WORKOUT_EXERCISES:
    //   return { ...state };
    // case FETCH_DELETE_WORKOUT_SUMMARY:
    //   return { ...state };
    // case LOAD_DELETE_WORKOUT_SUMMARY:
    //   return { ...state };
    // case FETCH_DELETE_WORKOUT_EXERCISE:
    //   return { ...state };
    // case LOAD_DELETE_WORKOUT_EXERCISE:
    //   return { ...state };
    case FETCH_EXERCISE_TYPES:
      return { ...state, typesLoading: true };
    case LOAD_EXERCISE_TYPES:
      return {
        ...state,
        exerciseTypes: action.exerciseTypes,
        typesLoading: false,
      };
    // case FETCH_ADD_EXERCISE_TYPE:
    //   return { ...state };
    // case LOAD_ADD_EXERCISE_TYPE:
    //   return { ...state };
    // case FETCH_DELETE_EXERCISE_TYPE:
    //   return { ...state };
    // case LOAD_DELETE_EXERCISE_TYPE:
    //   return { ...state };
    case FETCH_WORKOUT_TEMPLATES:
      return { ...state, templatesLoading: true };
    case LOAD_WORKOUT_TEMPLATES:
      return { ...state, templates: action.templates, templatesLoading: false };
    // case FETCH_EDIT_TEMPLATE_EXERCISE:
    //   return { ...state };
    // case LOAD_EDIT_TEMPLATE_EXERCISE:
    //   return { ...state };
    // case FETCH_DELETE_TEMPLATE_EXERCISE:
    //   return { ...state };
    // case LOAD_DELETE_TEMPLATE_EXERCISE:
    //   return { ...state };
    // case FETCH_COPY_WORKOUT_FROM_TEMPLATE:
    //   return { ...state };
    // case LOAD_COPY_WORKOUT_FROM_TEMPLATE:
    //   return { ...state };
    // case FETCH_CHANGE_EXERCISE_POSITION:
    //   return { ...state };
    // case LOAD_CHANGE_EXERCISE_POSITION:
    //   return { ...state };
    default:
      return state;
  }
};
