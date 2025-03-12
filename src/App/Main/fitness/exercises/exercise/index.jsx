import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import { getExerciseTypes } from "../../actions";
import { useParams } from "react-router-dom";

const Exercise = ({
  exerciseTypes,
  exerciseTypesLoading,
  getExerciseTypes,
}) => {
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (!exerciseTypes && !exerciseTypesLoading) getExerciseTypes();
  }, [exerciseTypes, exerciseTypesLoading]);

  const { exerciseId } = useParams();

  const activeExercise = exerciseTypes?.find(
    (e) => e.id === parseInt(exerciseId)
  );

  return (
    <Segment>
      {activeExercise ? (
        <div>hello</div>
      ) : (
        <em>
          <strong>Exercise not found.</strong>
        </em>
      )}
    </Segment>
  );
};

function mapStateToProps(state) {
  return {
    exerciseTypes: state.fitness.exerciseTypes,
    exerciseTypesLoading: state.fitness.typesLoading,
  };
}

export default connect(mapStateToProps, { getExerciseTypes })(Exercise);
