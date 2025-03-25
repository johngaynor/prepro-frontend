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
import API from "../../services/api";

// exercise types
export function getExerciseTypes() {
  return API.get(
    "/api/fitness/exercises/types",
    "Error getting exercise types",
    (exerciseTypes) => ({ type: LOAD_EXERCISE_TYPES, exerciseTypes }),
    () => ({ type: FETCH_EXERCISE_TYPES })
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

// templates
export function getWorkoutTemplates() {
  return API.get(
    "/api/fitness/templates",
    "Error getting workout templates",
    (templates) => ({ type: LOAD_WORKOUT_TEMPLATES, templates }),
    () => ({ type: FETCH_WORKOUT_TEMPLATES })
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

// workouts
export function getWorkoutLogs() {
  return API.get(
    "/api/fitness/logs",
    "Error getting workout logs",
    (workoutLogs) => ({ type: LOAD_WORKOUT_LOGS, workoutLogs }),
    () => ({ type: FETCH_WORKOUT_LOGS })
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

export function deleteWorkout(id) {
  return API.delete(
    `/api/fitness/logs/workout/${id}`,
    "Error deleting workout",
    (failed) => ({ type: LOAD_DELETE_WORKOUT, failed }),
    () => ({ type: FETCH_DELETE_WORKOUT, id })
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

export function editWorkoutEnd(id, timeCompleted, comments) {
  return API.post(
    "/api/fitness/logs/workout/end",
    "Error editing workout end",
    { id, timeCompleted, comments },
    (failed) => ({ type: LOAD_EDIT_WORKOUT_END, failed }),
    () => ({
      type: FETCH_EDIT_WORKOUT_END,
      values: { id, timeCompleted, comments },
    })
  );
}

export function editWorkoutExercise(values) {
  return API.post(
    "/api/fitness/logs/exercise",
    "Error updating workout exercise",
    values,
    (failed) => ({ type: LOAD_EDIT_WORKOUT_EXERCISE, failed }),
    () => ({ type: FETCH_EDIT_WORKOUT_EXERCISE, values })
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

export function changeExercisePosition(direction, exercise) {
  return API.post(
    "/api/fitness/exercise/order",
    "Error changing exercise position",
    { direction, exercise },
    () => ({ type: LOAD_CHANGE_EXERCISE_POSITION, exercise }),
    () => ({ type: FETCH_CHANGE_EXERCISE_POSITION })
  );
}
