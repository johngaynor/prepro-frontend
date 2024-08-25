import React, { useContext } from "react";
import { Grid, Button, Card, Header, Label } from "semantic-ui-react";
import { ViewInput } from "../../../components/FormFields/view";
import FitnessContext from "../../Context/fitnessContext";

// exercise object needs the following params:
// id: auto incremented identifier for the exercise
// exerciseId: id for the type of exercise
// sets: array of set objects

// set object needs the following params:
// orderId: order to display sets in (effectively the set #)
// reps: int
// weight: int (optional)

/**
 * ViewExerciseCard component for an exercise card, used in Workout Log and Workout Template Management
 *
 * @param {Object} props.exercise - Exercise object to display.
 * @param {Int} props.index - Auto generated index value for the exercise from iterating over all exercises
 * @param {function} props.handleEdit - The function to call when the user clicks "edit". Accepts an argument with the id of the exercise to edit.
 *
 * @returns {JSX.Element} The rendered ViewExerciseCard component
 */
const ViewExerciseCard = ({ exercise, index, handleEdit }) => {
  const { exerciseTypes } = useContext(FitnessContext);

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
            icon="pencil"
            type="button"
            floated="right"
            size="small"
            color="orange"
            onClick={() => handleEdit(exercise.id)}
          />
          <Header as="h4">Exercise #{index + 1}</Header>
        </Card.Header>
        <Card.Content textAlign="left">
          <ViewInput
            label="Exercise"
            value={
              exerciseTypes?.find((e) => e.id === exercise.exerciseId).name
            }
          />
          <Grid columns={4} style={{ marginTop: "10px" }}>
            <Grid.Row>
              <Grid.Column width={4} style={{ marginLeft: "10px" }}>
                <Label
                  horizontal
                  style={{ minWidth: "45%", textAlign: "center" }}
                >
                  Set #:
                </Label>
              </Grid.Column>
              <Grid.Column width={5}>
                <Label
                  horizontal
                  style={{ minWidth: "45%", textAlign: "center" }}
                >
                  Weight:
                </Label>
              </Grid.Column>
              <Grid.Column width={5}>
                <Label
                  horizontal
                  style={{ minWidth: "45%", textAlign: "center" }}
                >
                  Reps:
                </Label>
              </Grid.Column>
            </Grid.Row>

            {exercise.sets
              .sort((a, b) => a.orderId - b.orderId)
              ?.map((s, i) => (
                <Grid.Row
                  style={{ marginTop: "-26px" }}
                  key={"exercise-" + index + "-set" + i}
                >
                  <Grid.Column width={4} style={{ marginLeft: "10px" }}>
                    <ViewInput placeholder="Set #" value={i + 1} disabled />
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <ViewInput value={s.weight} />
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <ViewInput value={s.reps} />
                  </Grid.Column>
                </Grid.Row>
              ))}
            <ViewInput
              value={exercise.comments}
              label="Comments"
              fullRow
              height={90}
            />
          </Grid>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
};

export default ViewExerciseCard;
