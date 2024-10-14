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
import API from "../../services/api";

export function getWorkoutLogs() {
  return API.get(
    "/api/fitness/logs",
    "Error getting workout logs",
    (workoutLogs) => ({ type: LOAD_WORKOUT_LOGS, workoutLogs }),
    () => ({ type: FETCH_WORKOUT_LOGS })
  );
}

export function getExerciseTypes() {
  return API.get(
    "/api/fitness/exercises/types",
    "Error getting exercise types",
    (exerciseTypes) => ({ type: LOAD_EXERCISE_TYPES, exerciseTypes }),
    () => ({ type: FETCH_EXERCISE_TYPES })
  );
}

export function getWorkoutTemplates() {
  return API.get(
    "/api/fitness/templates",
    "Error getting workout templates",
    (templates) => ({ type: LOAD_WORKOUT_TEMPLATES, templates }),
    () => ({ type: FETCH_WORKOUT_TEMPLATES })
  );
}

// export function toggleSupplementLog(item, date) {
//   return API.post(
//     "/api/nutrition/supplements/logs",
//     "Error toggling supplement log",
//     { item, date },
//     (failed) => ({ type: LOAD_EDIT_SUPPLEMENT_LOGS, failed }),
//     () => ({ type: FETCH_EDIT_SUPPLEMENT_LOGS, item, date })
//   );
// }

// export function addMissedSupplement(item, date, reason) {
//   return API.post(
//     "/api/nutrition/supplements/logs/missed",
//     "Error adding missed supplement",
//     { item, date, reason },
//     (failed) => ({ type: LOAD_ADD_MISSED_SUPPLEMENT_LOGS, failed }),
//     () => ({ type: FETCH_ADD_MISSED_SUPPLEMENT_LOGS, item, date, reason })
//   );
// }
