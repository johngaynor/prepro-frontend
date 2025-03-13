import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import HorizontalSlide from "../../../components/Motion/HorizontalSlide";
import { getExerciseTypes, getWorkoutLogs } from "../../actions";
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
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!exerciseTypes && !exerciseTypesLoading) getExerciseTypes();
    if (!workoutLogs && !logsLoading) getWorkoutLogs();
  }, [exerciseTypes, exerciseTypesLoading, workoutLogs, logsLoading]);

  const { id } = useParams();
  const workout = workoutLogs?.find((l) => l.id === parseInt(id));

  function handleSwipe(direction) {
    if (direction === "left") {
      if (activeIndex !== 0) {
        setActiveIndex(activeIndex - 1);
      }
    } else if (direction === "right") {
      if (activeIndex < workout?.exercises.length) {
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
      {logsLoading || exerciseTypesLoading ? (
        <Spinner />
      ) : workout ? (
        <EditWorkout
          workout={workout}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
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
  };
}

export default connect(mapStateToProps, {
  getWorkoutLogs,
  getExerciseTypes,
})(Workout);
