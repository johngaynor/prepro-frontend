import React from "react";
import { Grid } from "semantic-ui-react";
import EditCard from "./components/EditCard";
import ViewCard from "./components/ViewCard";

const Exercises = ({ selectedWorkout }) => {
  return (
    <Grid stackable columns={3}>
      {selectedWorkout?.exercises.map((e, i) => (
        // <EditCard key={"exercise" + i} item={e} id={i} />
        <ViewCard key={"exercise-view-" + i} exercise={e} id={i} />
      ))}
    </Grid>
  );
};

export default Exercises;
