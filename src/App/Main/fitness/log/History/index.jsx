import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { connect } from "react-redux";
import {
  getWorkoutLogs,
  getExerciseTypes,
  getWorkoutTemplates,
} from "../../actions";
import HorizontalSlide from "../../../components/Motion/HorizontalSlide";
import Spinner from "../../../components/Spinner";

// pages
import Start from "./Start";
import View from "./View";

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

  function handleChangeDate(direction) {
    const currentDate = DateTime.fromISO(date);
    let newDate;

    if (direction === "left") {
      newDate = currentDate.minus({ days: 1 });
    } else if (direction === "right") {
      newDate = currentDate.plus({ days: 1 });
    }

    navigate(`/fitness/log/${newDate.toFormat("yyyy-MM-dd")}`);
  }

  return (
    <HorizontalSlide
      handleChangeDate={handleChangeDate}
      pageKey={date}
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {logsLoading || exerciseTypesLoading || templatesLoading ? (
        <Spinner />
      ) : activeWorkout ? (
        <View activeWorkout={activeWorkout} />
      ) : (
        <Start />
      )}
    </HorizontalSlide>
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
