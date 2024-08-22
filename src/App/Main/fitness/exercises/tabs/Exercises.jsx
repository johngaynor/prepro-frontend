import React, { useContext, useEffect, useState } from "react";
import FitnessContext from "../../Context/fitnessContext";
import { Header, Tab, Grid } from "semantic-ui-react";
import ExerciseCard from "../components/ExerciseCard";

const Exercises = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const {
    editLoading,
    exerciseTypes,
    exerciseTypesLoading,
    getExerciseTypes,
    deleteExerciseType,
  } = useContext(FitnessContext);

  useEffect(() => {
    if (!exerciseTypes && !exerciseTypesLoading) getExerciseTypes();
  }, [exerciseTypes, exerciseTypesLoading]);

  return (
    <Tab.Pane>
      <Header as="h4">Manage Exercises:</Header>
      <Grid stackable columns={3}>
        {exerciseTypes?.map((e, i) => (
          <ExerciseCard
            key={"exercise-card-" + i}
            exercise={e}
            deleteExerciseType={deleteExerciseType}
          />
        ))}
      </Grid>
    </Tab.Pane>
  );
};

export default Exercises;
