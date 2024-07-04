import React from "react";
import { apiCall } from "../../../services/api";
import toast from "react-hot-toast";

export const FitnessContext = React.createContext();

export const FitnessProvider = ({ children }) => {
  const [workoutTypes, setWorkoutTypes] = React.useState(null);
  // loading states
  const [workoutTypesLoading, setWorkoutTypesLoading] = React.useState(false);

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

  return (
    <FitnessContext.Provider
      value={{
        workoutTypes,
        workoutTypesLoading,
        getWorkoutTypes,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export default FitnessContext;
