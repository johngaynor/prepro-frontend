import React, { useContext, useEffect } from "react";
import FitnessContext from "../../Context/fitnessContext";
import { Header, Tab } from "semantic-ui-react";

const Exercises = () => {
  const { editLoading, exerciseTypes, exerciseTypesLoading, getExerciseTypes } =
    useContext(FitnessContext);

  useEffect(() => {
    if (!exerciseTypes && !exerciseTypesLoading) getExerciseTypes();
  }, [exerciseTypes, exerciseTypesLoading]);

  console.log(exerciseTypes);

  return (
    <Tab.Pane>
      <Header as="h4">Manage Exercises:</Header>
    </Tab.Pane>
  );
};

export default Exercises;
