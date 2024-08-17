import React from "react";
import { apiCall } from "../../../services/api";
import toast from "react-hot-toast";

export const FitnessContext = React.createContext();

export const FitnessProvider = ({ children }) => {
  const [workoutLogs, setWorkoutLogs] = React.useState(null);
  // loading states
  const [editLoading, setEditLoading] = React.useState(false);
  const [logsLoading, setLogsLoading] = React.useState(false);

  function editWorkoutSummary(values) {
    setEditLoading(true);
    apiCall("post", "/api/fitness/logs/workout", { ...values })
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
