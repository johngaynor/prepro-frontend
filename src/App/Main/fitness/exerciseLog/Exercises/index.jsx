import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import EditCard from "./components/EditCard";
import ViewCard from "./components/ViewCard";
import NewExercise from "./components/NewExercise";
import CopyFromTemplate from "./components/CopyFromTemplate";

const Exercises = ({ selectedWorkout }) => {
  const [editMode, setEditMode] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [copyOpen, setCopyOpen] = useState(false);

  return (
    <>
      <NewExercise
        open={addOpen}
        onCancel={() => setAddOpen(false)}
        selectedWorkout={selectedWorkout}
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
          style={{ marginTop: selectedWorkout.exercises.length ? 20 : 40 }}
        />
      </>
    </>
  );
};

export default Exercises;
