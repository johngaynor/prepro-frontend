import React from "react";
import { Grid, Button, Card, Header } from "semantic-ui-react";
import FitnessContext from "../../Context/fitnessContext";

const ExerciseCard = ({ exercise, deleteExerciseType }) => {
  return (
    <Grid.Column
      mobile={16} // < 768
      tablet={8} // 768-991
      computer={8} // 992-1199
      largeScreen={5} // 1200+
    >
      <Card fluid>
        <Card.Header textAlign="left">
          <Button
            icon="trash"
            type="button"
            floated="right"
            size="small"
            color="red"
            onClick={() => deleteExerciseType(exercise.id)}
          />
          <Header as="h4">{exercise.name}</Header>
        </Card.Header>
        <Card.Content textAlign="left">
          <p>
            <strong>id:</strong> {exercise.id}
          </p>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
};

export default ExerciseCard;
