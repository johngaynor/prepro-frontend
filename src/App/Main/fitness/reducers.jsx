import {
  FETCH_WORKOUT_LOGS,
  LOAD_WORKOUT_LOGS,
  FETCH_EDIT_WORKOUT_SUMMARY,
  LOAD_EDIT_WORKOUT_SUMMARY,
  FETCH_EDIT_WORKOUT_EXERCISE,
  LOAD_EDIT_WORKOUT_EXERCISE,
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
  FETCH_EDIT_EXERCISE_TYPE,
  LOAD_EDIT_EXERCISE_TYPE,
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
    case FETCH_EDIT_WORKOUT_SUMMARY:
      return { ...state, editLoading: true };
    case LOAD_EDIT_WORKOUT_SUMMARY:
      return { ...state, editLoading: false, workoutLogs: null };
    case FETCH_EDIT_WORKOUT_EXERCISE:
      return { ...state, editLoading: true };
    case LOAD_EDIT_WORKOUT_EXERCISE:
      // will want to optimistically update the state here
      return { ...state, editLoading: false, workoutLogs: null };
    case FETCH_DELETE_WORKOUT_SUMMARY:
      // update locally
      const newLogs = state.workoutLogs.filter(
        (l) => l.id !== action.workoutId
      );
      return { ...state, workoutLogs: newLogs, editLoading: true };
    case LOAD_DELETE_WORKOUT_SUMMARY:
      // handle failure case
      return {
        ...state,
        editLoading: false,
        workoutLogs: action.failed ? null : state.workoutLogs,
      };
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
    case FETCH_COPY_WORKOUT_FROM_TEMPLATE:
      return { ...state, editLoading: true };
    case LOAD_COPY_WORKOUT_FROM_TEMPLATE:
      return { ...state, editLoading: false, workoutLogs: null };
    case FETCH_CHANGE_EXERCISE_POSITION:
      return { ...state, editLoading: true };
    case LOAD_CHANGE_EXERCISE_POSITION:
      return {
        ...state,
        editLoading: false,
        workoutLogs: action.exercise.workoutId ? null : state.workoutLogs,
        templates: action.exercise.templateId ? null : state.templates,
      };
    case FETCH_EDIT_EXERCISE_TYPE:
      const newTypes = state.exerciseTypes.map((t) =>
        t.id === action.exercise.id ? { id: action.id, name: action.name } : t
      );
      return { ...state, exerciseTypes: newTypes, editLoading: true };
    case LOAD_EDIT_EXERCISE_TYPE:
      return {
        ...state,
        editLoading: false,
        exerciseTypes: action.failed ? null : state.exerciseTypes,
      };

    default:
      return state;
  }
};
