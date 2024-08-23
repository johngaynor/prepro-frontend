import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import EditCard from "./components/EditCard";
import ViewCard from "./components/ViewCard";
import NewExercise from "./components/NewExercise";

const Exercises = ({ selectedWorkout }) => {
  const [editMode, setEditMode] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  return (
    <>
      <NewExercise
        open={addOpen}
        onCancel={() => setAddOpen(false)}
        selectedWorkout={selectedWorkout}
      />
      <Grid stackable columns={3}>
        {selectedWorkout?.exercises.map((e, i) => {
          if (e.id === editMode) {
            return (
              <EditCard
                key={"exercise" + i}
                item={e}
                id={i}
                setEditMode={setEditMode}
              />
            );
          } else {
            return (
              <ViewCard
                key={"exercise-view-" + i}
                exercise={e}
                id={i}
                setEditMode={setEditMode}
              />
            );
          }
        })}
      </Grid>
      <Button
        icon="plus"
        type="button"
        onClick={() => setAddOpen(true)}
        color="green"
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default Exercises;
