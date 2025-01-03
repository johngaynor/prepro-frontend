import React, { useState } from "react";
import { Grid, Button, Segment } from "semantic-ui-react";
import CopyFromTemplate from "./components/CopyFromTemplate";
import EditExerciseModal from "../../components/Modals/EditExerciseModal";
import ViewExerciseCard from "../../components/Cards/ViewExerciseCard";
import { connect } from "react-redux";
import { editWorkoutExercise, deleteWorkoutExercise } from "../../actions";
import { changeExercisePosition } from "../../actions";

const Exercises = ({
  selectedWorkout,
  lastWorkout,
  editWorkoutExercise,
  deleteWorkoutExercise,
  changeExercisePosition,
}) => {
  const [copyOpen, setCopyOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [activeExercise, setActiveExercise] = useState(null);

  function handleEdit(id) {
    setActiveExercise(id);
    setEditOpen(true);
  }

  const activeExerciseId = selectedWorkout?.exercises?.find(
    (e) => e.id === activeExercise
  )?.exerciseId;

  const prevExercise = lastWorkout?.exercises?.find(
    (e) => e.exerciseId === activeExerciseId
  );

  return (
    <Segment>
      <EditExerciseModal
        modalOpen={editOpen}
        setModalOpen={setEditOpen}
        exercise={selectedWorkout?.exercises?.find(
          (e) => e.id === activeExercise
        )}
        setActiveExercise={setActiveExercise}
        handleSubmit={editWorkoutExercise}
        handleDelete={deleteWorkoutExercise}
        handleChangePosition={changeExercisePosition}
        parentId={selectedWorkout.id}
        prevExercise={prevExercise}
      />
      <CopyFromTemplate
        open={copyOpen}
        setOpen={setCopyOpen}
        selectedWorkout={selectedWorkout}
      />

      {!selectedWorkout.exercises.length && (
        <Button
          color="blue"
          content="Copy from Template"
          onClick={() => setCopyOpen(true)}
        />
      )}
      <Grid
        stackable
        columns={3}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {selectedWorkout?.exercises
          .sort((a, b) => a.orderId - b.orderId)
          .map((e, i) => (
            <ViewExerciseCard
              exercise={e}
              index={i}
              handleEdit={() => handleEdit(e.id)}
              key={"workout-exercise-view-" + i}
            />
          ))}
      </Grid>
      <Button
        icon="plus"
        type="button"
        onClick={() => setEditOpen(true)}
        color="green"
        style={{ marginTop: selectedWorkout.exercises.length ? 20 : 40 }}
      />
    </Segment>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  editWorkoutExercise,
  deleteWorkoutExercise,
  changeExercisePosition,
})(Exercises);
