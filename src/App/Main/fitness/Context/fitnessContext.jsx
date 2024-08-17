import React from "react";
import { apiCall } from "../../../services/api";
import toast from "react-hot-toast";

export const FitnessContext = React.createContext();

export const FitnessProvider = ({ children }) => {
  const [workoutTypes, setWorkoutTypes] = React.useState(null);
  // loading states
  const [workoutTypesLoading, setWorkoutTypesLoading] = React.useState(false);
  const [editLoading, setEditLoading] = React.useState(false);
  const [workoutLogs, setWorkoutLogs] = React.useState(null);
  const [logsLoading, setLogsLoading] = React.useState(false);

  function getWorkoutTypes() {
    setWorkoutTypesLoading(true);
    apiCall("get", "/api/fitness/workouts/types")
      .then((res) => {
        if (res.result) {
          setWorkoutTypes(res.result);
        } else {
          toast.error("Something went wrong retrieving workout types...");
        }
      })
      .catch((err) => {
        toast.error(`Error getting workout types: ${err}`);
      })
      .finally(() => setWorkoutTypesLoading(false));
  }

  function editWorkoutSummary(values) {
    setEditLoading(true);
    apiCall("post", "/api/fitness/logs/workout", { ...values })
      .then((res) => {})
      .catch((err) => {
        toast.error(
          `Error ${values.workoutId ? "updating" : "adding"} workout: ${err}`
        );
      })
      .finally(() => setEditLoading(false));
  }

  function getWorkoutLogs() {
    setLogsLoading(true);
    apiCall("get", "/api/fitness/logs/workouts")
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

  return (
    <FitnessContext.Provider
      value={{
        workoutTypes,
        workoutTypesLoading,
        getWorkoutTypes,
        editLoading,
        editWorkoutSummary,
        logsLoading,
        workoutLogs,
        getWorkoutLogs,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export default FitnessContext;
