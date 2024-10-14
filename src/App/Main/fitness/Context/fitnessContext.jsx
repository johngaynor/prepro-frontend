import React, { createContext, useState } from "react";
import { apiCall } from "../../../services/api";
import toast from "react-hot-toast";

export const FitnessContext = createContext();

export const FitnessProvider = ({ children }) => {
  // const [period, setPeriod] = useState(null); // will be used later to only grab logs within a certain period
  const [exerciseTypes, setExerciseTypes] = useState(null);
  const [workoutTemplates, setWorkoutTemplates] = useState(null);
  // loading states
  const [editLoading, setEditLoading] = useState(false);
  const [exerciseTypesLoading, setExerciseTypesLoading] = useState(false);
  const [templatesLoading, setTemplatesLoading] = useState(false);

  // add new exercise type
  function addExerciseType(name, target) {
    setEditLoading(true);
    apiCall("post", "/api/fitness/exercises/types", { name, target })
      .then(() => {
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
      .then(() => {
        setExerciseTypes(null);
        toast.success("Successfully deleted exercise type!");
      })
      .catch((err) => {
        toast.error(`Error deleting exercise type: ${err.message}`);
      })
      .finally(() => setEditLoading(false));
  }

  // edit template exercises/sets
  function editTemplateExercises(values) {
    setEditLoading(true);
    apiCall("post", "/api/fitness/templates/exercise", { ...values })
      .then(() => {
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
      .then(() => {
        setWorkoutTemplates(null);
        toast.success("Successfully deleted template exercise!");
      })
      .catch((err) => {
        toast.error(`Error deleting workout exercise: ${err.message}`);
      })
      .finally(() => setEditLoading(false));
  }

  return (
    <FitnessContext.Provider
      value={{
        editLoading,
        deleteExerciseType,
        addExerciseType,
        workoutTemplates,
        templatesLoading,
        editTemplateExercises,
        deleteTemplateExercise,
        exerciseTypes,
        exerciseTypesLoading,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export default FitnessContext;
