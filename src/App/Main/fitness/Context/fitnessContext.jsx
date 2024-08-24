import React, { createContext, useState } from "react";
import { apiCall } from "../../../services/api";
import toast from "react-hot-toast";

export const FitnessContext = createContext();

export const FitnessProvider = ({ children }) => {
  const [period, setPeriod] = useState(null); // will be used later to only grab logs within a certain period
  const [workoutLogs, setWorkoutLogs] = useState(null);
  const [exerciseTypes, setExerciseTypes] = useState(null);
  const [workoutTemplates, setWorkoutTemplates] = useState(null);
  // loading states
  const [logsLoading, setLogsLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [exerciseTypesLoading, setExerciseTypesLoading] = useState(false);
  const [templatesLoading, setTemplatesLoading] = useState(false);

  function editWorkoutSummary(values) {
    setEditLoading(true);
    apiCall("post", "/api/fitness/logs/summary", { ...values })
      .then((res) => {
        setWorkoutLogs(null);
        toast.success("Successfully edited workout log!");
      })
      .catch((err) => {
        toast.error(
          `Error ${values.workoutId ? "updating" : "adding"} workout: ${
            err.message
          }`
        );
      })
      .finally(() => setEditLoading(false));
  }

  function getWorkoutLogs() {
    setLogsLoading(true);
    apiCall("get", "/api/fitness/logs")
      .then((res) => {
        if (res.result) {
          setWorkoutLogs(res.result);
        } else {
          throw new Error("No result from API call...");
        }
      })
      .catch((err) => {
        toast.error(`Error getting workout logs: ${err.message}`);
      })
      .finally(() => setLogsLoading(false));
  }

  function getExerciseTypes() {
    setExerciseTypesLoading(true);
    apiCall("get", "/api/fitness/exercises/types")
      .then((res) => {
        if (res.result) {
          setExerciseTypes(res.result);
        } else {
          throw new Error("No result from API call...");
        }
      })
      .catch((err) => {
        toast.error(`Error getting exercise types: ${err.message}`);
      })
      .finally(() => setExerciseTypesLoading(false));
  }

  // better handling for this so that the whole page doesn't have to refresh and reset tab status
  function deleteWorkoutExercise(id) {
    setEditLoading(true);
    apiCall("delete", `/api/fitness/logs/workout/exercise/${id}`)
      .then((res) => {
        setWorkoutLogs(null);
        toast.success("Successfully deleted workout exercise!");
      })
      .catch((err) => {
        toast.error(`Error deleting workout exercise: ${err.message}`);
      })
      .finally(() => setEditLoading(false));
  }

  function deleteExerciseType(id) {
    setEditLoading(true);
    apiCall("delete", `/api/fitness/exercises/types/${id}`)
      .then((res) => {
        setExerciseTypes(null);
        toast.success("Successfully deleted exercise type!");
      })
      .catch((err) => {
        toast.error(`Error deleting exercise type: ${err.message}`);
      })
      .finally(() => setEditLoading(false));
  }

  function addExerciseType(name) {
    setEditLoading(true);
    apiCall("post", "/api/fitness/exercises/types", { name })
      .then((res) => {
        setExerciseTypes(null);
        toast.success("Successfully added exercise type!");
      })
      .catch((err) => {
        toast.error(`Error adding exercise type: ${err.message}`);
      })
      .finally(() => setEditLoading(false));
  }

  function editWorkoutExercises(values) {
    setEditLoading(true);
    apiCall("post", "/api/fitness/logs/exercises", { ...values })
      .then((res) => {
        setWorkoutLogs(null);
        toast.success("Successfully edited workout exercise!");
      })
      .catch((err) => {
        toast.error(
          `Error ${
            values.workoutId ? "updating" : "adding"
          } workout exercise: ${err.message}`
        );
      })
      .finally(() => setEditLoading(false));
  }

  function getWorkoutTemplates() {
    setTemplatesLoading(true);
    apiCall("get", "/api/fitness/templates")
      .then((res) => {
        if (res.result) {
          setWorkoutTemplates(res.result);
        } else {
          throw new Error("No result from API call...");
        }
      })
      .catch((err) => {
        toast.error(`Error getting workout templates: ${err.message}`);
      })
      .finally(() => setTemplatesLoading(false));
  }

  function editWorkoutTemplate(values) {
    setEditLoading(true);
    apiCall("post", "/api/fitness/templates", { ...values })
      .then((res) => {
        setWorkoutTemplates(null);
        toast.success("Successfully edited workout template!");
      })
      .catch((err) => {
        toast.error(
          `Error ${values.workoutId ? "updating" : "adding"} workout: ${
            err.message
          }`
        );
      })
      .finally(() => setEditLoading(false));
  }

  return (
    <FitnessContext.Provider
      value={{
        editLoading,
        editWorkoutSummary,
        exerciseTypes,
        exerciseTypesLoading,
        getExerciseTypes,
        workoutLogs,
        logsLoading,
        getWorkoutLogs,
        deleteWorkoutExercise,
        deleteExerciseType,
        addExerciseType,
        editWorkoutExercises,
        getWorkoutTemplates,
        workoutTemplates,
        templatesLoading,
        editWorkoutTemplate,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export default FitnessContext;
