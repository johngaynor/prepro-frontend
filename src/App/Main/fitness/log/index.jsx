import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { connect } from "react-redux";
import {
  getWorkoutLogs,
  getExerciseTypes,
  getWorkoutTemplates,
} from "../actions";

// pages
import LandingPage from "./LandingPage";
import Workout from "./Workout";

const FitnessLog = ({
  workoutLogs,
  logsLoading,
  getWorkoutLogs,
  exerciseTypes,
  exerciseTypesLoading,
  getExerciseTypes,
  templates,
  templatesLoading,
  getWorkoutTemplates,
}) => {
  useEffect(() => {
    if (!exerciseTypes && !exerciseTypesLoading) getExerciseTypes();
    if (!workoutLogs && !logsLoading) getWorkoutLogs();
    if (!templates && !templatesLoading) getWorkoutTemplates();
  }, [
    exerciseTypes,
    exerciseTypesLoading,
    workoutLogs,
    logsLoading,
    templates,
    templatesLoading,
  ]);

  const { date } = useParams();
  const navigate = useNavigate();

  // set the date in params if there isn't one given or if the date is invalid
  useEffect(() => {
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const currentDate = DateTime.now().toFormat("yyyy-MM-dd");
      navigate(`/fitness/log/${currentDate}`);
    }
  });

  const activeWorkout = workoutLogs?.find((l) => l.date === date);
  // const lastWorkout = workoutLogs
  //   ?.filter(
  //     (l) =>
  //       l.workoutTemplateId === activeWorkout?.workoutTemplateId &&
  //       l.date !== activeWorkout.date
  //   )
  //   .sort((a, b) => {
  //     const dateA = DateTime.fromISO(a.date);
  //     const dateB = DateTime.fromISO(b.date);
  //     return dateB - dateA;
  //   })[0];

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {activeWorkout ? (
        <Workout activeWorkout={activeWorkout} />
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    workoutLogs: state.fitness.workoutLogs,
    logsLoading: state.fitness.logsLoading,
    exerciseTypes: state.fitness.exerciseTypes,
    exerciseTypesLoading: state.fitness.typesLoading,
    templates: state.fitness.templates,
    templatesLoading: state.fitness.templatesLoading,
  };
}

export default connect(mapStateToProps, {
  getWorkoutLogs,
  getExerciseTypes,
  getWorkoutTemplates,
})(FitnessLog);
