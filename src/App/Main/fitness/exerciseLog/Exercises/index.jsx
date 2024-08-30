import React, { useState, useContext } from "react";
import { Grid, Button } from "semantic-ui-react";
import FitnessContext from "../../context/fitnessContext";
import CopyFromTemplate from "./components/CopyFromTemplate";
import EditExerciseModal from "../../components/Modals/EditExerciseModal";
import ViewExerciseCard from "../../components/Cards/ViewExerciseCard";

const Exercises = ({ selectedWorkout }) => {
  const [copyOpen, setCopyOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [activeExercise, setActiveExercise] = useState(null);

  const {
    editWorkoutExercises,
    deleteWorkoutExercise,
    changeExercisePosition,
  } = useContext(FitnessContext);

  function handleEdit(id) {
    setActiveExercise(id);
    setEditOpen(true);
  }

  return (
    <>
      <EditExerciseModal
        modalOpen={editOpen}
        setModalOpen={setEditOpen}
        exercise={selectedWorkout?.exercises?.find(
          (e) => e.id === activeExercise
        )}
        setActiveExercise={setActiveExercise}
        handleSubmit={editWorkoutExercises}
        handleDelete={deleteWorkoutExercise}
        handleChangePosition={changeExercisePosition}
        parentId={selectedWorkout.id}
      />
      <CopyFromTemplate
        open={copyOpen}
        setOpen={setCopyOpen}
        selectedWorkout={selectedWorkout}
      />
      <>
        {!selectedWorkout.exercises.length && (
          <Button
            color="blue"
            content="Copy from Template"
            onClick={() => setCopyOpen(true)}
          />
        )}
        <Grid stackable columns={3}>
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
      </>
    </>
  );
};

export default Exercises;
