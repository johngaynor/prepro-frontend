import React from "react";
import { Grid } from "semantic-ui-react";
import { exercisesTest } from "../../components/dropdownOptions";
import EditCard from "./components/EditCard";
import ViewCard from "./components/ViewCard";

const Exercises = () => {
  const [exercises, setExercises] = React.useState([]);

  React.useEffect(() => {
    if (!exercises.length) setExercises(exercisesTest);
  }, [exercises]);

  return (
    <Grid stackable columns={3}>
      {exercises.map((e, i) => (
        <EditCard key={"exercise" + i} item={e} id={i} />
        // <ViewCard key={"exercise" + i} item={e} id={i} />
      ))}
    </Grid>
  );
};

export default Exercises;
