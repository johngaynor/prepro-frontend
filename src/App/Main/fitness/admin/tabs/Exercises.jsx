import React, { useEffect, useState } from "react";
import { Header, Tab, Grid, Confirm, Button } from "semantic-ui-react";
import ExerciseCard from "../components/ExerciseCard";
import TypeForm from "../components/TypeForm";
import {
  getExerciseTypes,
  addExerciseType,
  deleteExerciseType,
} from "../../actions";
import { connect } from "react-redux";

const Exercises = ({
  exerciseTypes,
  exerciseTypesLoading,
  getExerciseTypes,
  deleteExerciseType,
  addExerciseType,
}) => {
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    if (!exerciseTypes && !exerciseTypesLoading) getExerciseTypes();
  }, [exerciseTypes, exerciseTypesLoading]);

  return (
    <Tab.Pane>
      <TypeForm
        open={addOpen}
        onCancel={() => setAddOpen(false)}
        onConfirm={(name, target) => {
          addExerciseType(name, target);
          setAddOpen(false);
        }}
      />
      <Confirm
        open={!!deleteOpen}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => {
          deleteExerciseType(deleteOpen);
          setDeleteOpen(false);
        }}
      >
        Are you sure you want to delete this exercise? This will also delete any
        records of this exercise in the workout logs. This action cannot be
        undone!!!
      </Confirm>
      <Header as="h4">Manage Exercises:</Header>
      <Grid stackable columns={3}>
        {exerciseTypes?.map((e, i) => (
          <ExerciseCard
            key={"exercise-card-" + i}
            exercise={e}
            onDelete={() => setDeleteOpen(e.id)}
          />
        ))}
      </Grid>
      <Button
        color="green"
        icon="plus"
        type="button"
        onClick={() => setAddOpen(true)}
        style={{ marginTop: 30 }}
      />
    </Tab.Pane>
  );
};

function mapStateToProps(state) {
  return {
    exerciseTypes: state.fitness.exerciseTypes,
    exerciseTypesLoading: state.fitness.typesLoading,
  };
}

export default connect(mapStateToProps, {
  getExerciseTypes,
  deleteExerciseType,
  addExerciseType,
})(Exercises);
