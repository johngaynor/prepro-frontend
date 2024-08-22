import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import EditCard from "./components/EditCard";
import ViewCard from "./components/ViewCard";

const Exercises = ({ selectedWorkout }) => {
  const [editMode, setEditMode] = useState(null);

  console.log("edit", editMode);
  return (
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
  );
};

export default Exercises;
