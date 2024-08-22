import React, { createContext, useState } from "react";
import { apiCall } from "../../../services/api";
import toast from "react-hot-toast";

export const FitnessContext = createContext();

export const FitnessProvider = ({ children }) => {
  const [workoutSummaries, setWorkoutSummaries] = useState(null);
  const [exerciseTypes, setExerciseTypes] = useState(null);
  // loading states
  const [editLoading, setEditLoading] = useState(false);
  const [summariesLoading, setSummariesLoading] = useState(false);
  const [exerciseTypesLoading, setExerciseTypesLoading] = useState(false);

  function editWorkoutSummary(values) {
    setEditLoading(true);
    apiCall("post", "/api/fitness/logs/workout", { ...values })
      .then((res) => {
        setWorkoutSummaries(null);
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

  function getWorkoutSummaries() {
    setSummariesLoading(true);
    apiCall("get", "/api/fitness/logs/workouts")
      .then((res) => {
        if (res.result) {
          setWorkoutSummaries(res.result);
        } else {
          throw new Error("No result from API call...");
        }
      })
      .catch((err) => {
        toast.error(`Error getting workout logs: ${err.message}`);
      })
      .finally(() => setSummariesLoading(false));
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

  return (
    <FitnessContext.Provider
      value={{
        editLoading,
        editWorkoutSummary,
        summariesLoading,
        workoutSummaries,
        getWorkoutSummaries,
        exerciseTypes,
        exerciseTypesLoading,
        getExerciseTypes,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export default FitnessContext;
