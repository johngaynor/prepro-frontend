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

  // get workout logs
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

  // edit workout summaries
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

  // edit workout exercises/sets
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

  // delete workout exercise/sets
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

  // get exercise types
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

  // add new exercise type
  function addExerciseType(name, target) {
    setEditLoading(true);
    apiCall("post", "/api/fitness/exercises/types", { name, target })
      .then((res) => {
        setExerciseTypes(null);
        toast.success("Successfully added exercise type!");
      })
      .catch((err) => {
        toast.error(`Error adding exercise type: ${err.message}`);
      })
      .finally(() => setEditLoading(false));
  }

  // delete exercise type
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

  // get exercise templates
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

  // edit template exercises/sets
  function editTemplateExercises(values) {
    setEditLoading(true);
    apiCall("post", "/api/fitness/templates/exercise", { ...values })
      .then((res) => {
        setWorkoutTemplates(null);
        toast.success("Successfully edited workout template!");
      })
      .catch((err) => {
        toast.error(
          `Error ${values.workoutId ? "updating" : "adding"} workout: ${err}`
        );
      })
      .finally(() => setEditLoading(false));
  }

  // delete template exercise/sets
  function deleteTemplateExercise(id) {
    setEditLoading(true);
    apiCall("delete", `/api/fitness/templates/exercise/${id}`)
      .then((res) => {
        setWorkoutTemplates(null);
        toast.success("Successfully deleted template exercise!");
      })
      .catch((err) => {
        toast.error(`Error deleting workout exercise: ${err.message}`);
      })
      .finally(() => setEditLoading(false));
  }

  // copy workout from template
  function copyWorkoutFromTemplate(workoutId, templateId) {
    setEditLoading(true);
    apiCall("post", "/api/fitness/logs/copy", { workoutId, templateId })
      .then((res) => {
        setWorkoutLogs(null);
        toast.success("Successfully copied workout template!");
      })
      .catch((err) => {
        toast.error(`Error copying workout from template: ${err.message}`);
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
        editTemplateExercises,
        deleteTemplateExercise,
        copyWorkoutFromTemplate,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export default FitnessContext;
