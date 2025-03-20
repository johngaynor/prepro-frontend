import {
  FETCH_WORKOUT_LOGS,
  LOAD_WORKOUT_LOGS,
  FETCH_EDIT_WORKOUT_EXERCISE,
  LOAD_EDIT_WORKOUT_EXERCISE,
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
  FETCH_CHANGE_EXERCISE_POSITION,
  LOAD_CHANGE_EXERCISE_POSITION,
  FETCH_START_WORKOUT,
  LOAD_START_WORKOUT,
  FETCH_EDIT_WORKOUT_START,
  LOAD_EDIT_WORKOUT_START,
  FETCH_EDIT_WORKOUT_END,
  LOAD_EDIT_WORKOUT_END,
  FETCH_DELETE_WORKOUT,
  LOAD_DELETE_WORKOUT,
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
    case FETCH_EDIT_WORKOUT_EXERCISE:
      return { ...state, editLoading: true };
    case LOAD_EDIT_WORKOUT_EXERCISE:
      // will want to optimistically update the state here
      return { ...state, editLoading: false, workoutLogs: null };
    case FETCH_DELETE_WORKOUT_EXERCISE:
      // will want to set this up to only modify the active workout and not refresh the entire state
      return { ...state, editLoading: true };
    case LOAD_DELETE_WORKOUT_EXERCISE:
      return { ...state, editLoading: false, workoutLogs: null };
    case FETCH_EXERCISE_TYPES:
      return { ...state, typesLoading: true };
    case LOAD_EXERCISE_TYPES:
      return {
        ...state,
        exerciseTypes: action.exerciseTypes,
        typesLoading: false,
      };
    case FETCH_ADD_EXERCISE_TYPE:
      return { ...state, editLoading: true };
    case LOAD_ADD_EXERCISE_TYPE:
      return { ...state, editLoading: false, exerciseTypes: null };
    case FETCH_DELETE_EXERCISE_TYPE:
      return { ...state, editLoading: true };
    case LOAD_DELETE_EXERCISE_TYPE:
      return { ...state, editLoading: false, exerciseTypes: null };
    case FETCH_WORKOUT_TEMPLATES:
      return { ...state, templatesLoading: true };
    case LOAD_WORKOUT_TEMPLATES:
      return { ...state, templates: action.templates, templatesLoading: false };
    case FETCH_EDIT_TEMPLATE_EXERCISE:
      return { ...state, editLoading: true };
    case LOAD_EDIT_TEMPLATE_EXERCISE:
      return { ...state, editLoading: false, templates: null };
    case FETCH_DELETE_TEMPLATE_EXERCISE:
      return { ...state, editLoading: true };
    case LOAD_DELETE_TEMPLATE_EXERCISE:
      return { ...state, editLoading: false, templates: null };
    case FETCH_CHANGE_EXERCISE_POSITION:
      return { ...state, editLoading: true };
    case LOAD_CHANGE_EXERCISE_POSITION:
      return {
        ...state,
        editLoading: false,
        workoutLogs: action.exercise.workoutId ? null : state.workoutLogs,
        templates: action.exercise.templateId ? null : state.templates,
      };
    case FETCH_START_WORKOUT:
      return { ...state, editLoading: true };
    case LOAD_START_WORKOUT:
      return { ...state, editLoading: false, workoutLogs: null };
    // optimistically update
    case FETCH_EDIT_WORKOUT_START:
      const updatedStart = state.workoutLogs.map((l) => {
        if (l.id === action.values.id) {
          return { ...l, ...action.values };
        }
        return l;
      });
      return { ...state, editLoading: true, workoutLogs: updatedStart };
    case LOAD_EDIT_WORKOUT_START:
      return {
        ...state,
        editLoading: false,
        workoutLogs: action.failed ? null : state.workoutLogs,
      };
    case FETCH_EDIT_WORKOUT_END:
      const updatedEnd = state.workoutLogs.map((l) => {
        if (l.id === action.values.id) {
          return { ...l, ...action.values };
        }
        return l;
      });
      return { ...state, editLoading: true, workoutLogs: updatedEnd };
    case LOAD_EDIT_WORKOUT_END:
      return {
        ...state,
        editLoading: false,
        workoutLogs: action.failed ? null : state.workoutLogs,
      };
    case FETCH_DELETE_WORKOUT:
      const remainingLogs = state.workoutLogs.filter((l) => l.id !== action.id); // optimistic update
      return { ...state, editLoading: true, workoutLogs: remainingLogs };
    case LOAD_DELETE_WORKOUT:
      return {
        ...state,
        editLoading: false,
        workoutLogs: action.failed ? null : state.workoutLogs,
      };
    default:
      return state;
  }
};
