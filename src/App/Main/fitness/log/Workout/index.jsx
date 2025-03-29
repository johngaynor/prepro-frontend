import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import HorizontalSlide from "../../../components/Motion/HorizontalSlide";
import {
  getExerciseTypes,
  getWorkoutLogs,
  getWorkoutTemplates,
} from "../../actions";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import EditWorkout from "./Edit";

const Workout = ({
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
  const [activeIndex, setActiveIndex] = useState(0);

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

  const { id } = useParams();
  const workout = workoutLogs?.find((l) => l.id === parseInt(id));
  const template = templates?.find((t) => t.id === workout?.workoutTemplateId);
  const lastWorkout = workoutLogs
    ?.filter((l) => l.workoutTemplateId === template?.id)
    .sort((a, b) => b.date.localeCompare(a.date))[1];

  function handleSwipe(direction) {
    if (direction === "left") {
      if (activeIndex !== 0) {
        setActiveIndex(activeIndex - 1);
      }
    } else if (direction === "right") {
      if (activeIndex < workout?.exercises.length + 1) {
        setActiveIndex(activeIndex + 1);
      }
    }
  }

  return (
    <HorizontalSlide
      handleSwipe={handleSwipe}
      pageKey={activeIndex}
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {logsLoading || exerciseTypesLoading || templatesLoading ? (
        <Spinner />
      ) : workout ? (
        <EditWorkout
          workout={workout}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          template={template}
          lastWorkout={lastWorkout}
        />
      ) : (
        <em>
          There is no workout associated with this ID or you don't have access.
        </em>
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
})(Workout);
