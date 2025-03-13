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
  FETCH_CHANGE_EXERCISE_POSITION,
  LOAD_CHANGE_EXERCISE_POSITION,
  FETCH_START_WORKOUT,
  LOAD_START_WORKOUT,
  FETCH_EDIT_WORKOUT_START,
  LOAD_EDIT_WORKOUT_START,
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

export function editWorkoutSummary(values) {
  return API.post(
    "/api/fitness/logs/summary",
    "Error updating workout summary",
    values,
    () => ({ type: LOAD_EDIT_WORKOUT_SUMMARY }),
    () => ({ type: FETCH_EDIT_WORKOUT_SUMMARY })
  );
}

export function deleteWorkoutSummary(workoutId) {
  return API.delete(
    `/api/fitness/logs/summary/${workoutId}`,
    "Error deleting workout summary",
    (failed) => ({ type: LOAD_DELETE_WORKOUT_SUMMARY, failed }),
    () => ({ type: FETCH_DELETE_WORKOUT_SUMMARY, workoutId })
  );
}

export function editWorkoutExercise(values) {
  return API.post(
    "/api/fitness/logs/exercise",
    "Error updating workout exercise",
    values,
    () => ({ type: LOAD_EDIT_WORKOUT_EXERCISE }),
    () => ({ type: FETCH_EDIT_WORKOUT_EXERCISE })
  );
}

export function deleteWorkoutExercise(exerciseId) {
  return API.delete(
    `/api/fitness/logs/exercise/${exerciseId}`,
    "Error deleting workout exercise",
    () => ({ type: LOAD_DELETE_WORKOUT_EXERCISE }),
    () => ({ type: FETCH_DELETE_WORKOUT_EXERCISE })
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

export function changeExercisePosition(direction, exercise) {
  return API.post(
    "/api/fitness/exercise/order",
    "Error changing exercise position",
    { direction, exercise },
    () => ({ type: LOAD_CHANGE_EXERCISE_POSITION, exercise }),
    () => ({ type: FETCH_CHANGE_EXERCISE_POSITION })
  );
}

export function editTemplateExercise(values) {
  return API.post(
    "/api/fitness/templates/exercise",
    "Error updating template exercise",
    values,
    () => ({ type: LOAD_EDIT_TEMPLATE_EXERCISE }),
    () => ({ type: FETCH_EDIT_TEMPLATE_EXERCISE })
  );
}

export function deleteTemplateExercise(exerciseId) {
  return API.delete(
    `/api/fitness/templates/exercise/${exerciseId}`,
    "Error deleting template exercise",
    () => ({ type: LOAD_DELETE_TEMPLATE_EXERCISE }),
    () => ({ type: FETCH_DELETE_TEMPLATE_EXERCISE })
  );
}

export function addExerciseType(name, target) {
  return API.post(
    "/api/fitness/exercises/type",
    "Error adding exercise type",
    { name, target },
    () => ({ type: LOAD_ADD_EXERCISE_TYPE }),
    () => ({ type: FETCH_ADD_EXERCISE_TYPE })
  );
}

export function deleteExerciseType(id) {
  return API.delete(
    `/api/fitness/exercises/type/${id}`,
    "Error deleting exercise type",
    () => ({ type: LOAD_DELETE_EXERCISE_TYPE }),
    () => ({ type: FETCH_DELETE_EXERCISE_TYPE })
  );
}

export function startWorkout(date, templateId, noTemplate) {
  return API.post(
    "/api/fitness/logs/new",
    "Error starting workout",
    { date, templateId, noTemplate },
    () => ({ type: LOAD_START_WORKOUT }),
    () => ({ type: FETCH_START_WORKOUT })
  );
}

export function editWorkoutStart(id, timeStarted) {
  return API.post(
    "/api/fitness/logs/workout/start",
    "Error editing workout start",
    { id, timeStarted },
    (failed) => ({ type: LOAD_EDIT_WORKOUT_START, failed }),
    () => ({ type: FETCH_EDIT_WORKOUT_START, values: { id, timeStarted } })
  );
}
