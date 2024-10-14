import React from "react";
import {
  Grid,
  Button,
  Card,
  Header,
  Label,
  Container,
} from "semantic-ui-react";
import { InputField, DropdownField } from "../../../../components/FormFields";
import { connect } from "react-redux";

// exercise object needs the following params:
// id: auto incremented identifier for the exercise
// exerciseId: id for the type of exercise
// sets: array of set objects

// set object needs the following params:
// orderId: order to display sets in (effectively the set #)
// reps: int
// weight: int (optional)

/**
 * EditCard component for an exercise card, used in Workout Log and Workout Template Management
 *
 * @param {Object} props.exercise - Exercise object to display.
 * @param {Int} props.index - Auto generated index value for the exercise from iterating over all exercises
 * @param {function} props.handleCancel - The function to call when the user cancels the edit form
 * @param {function} props.handleSubmit - The function to call when the user submits the form to save the exercise. Takes argument for exercise to save
 * @param {function} props.handleDelete - The function to call when the user deletes the exercise. Takes argument for exercise to delete
 *
 * @returns {JSX.Element} The rendered ViewCard component
 */
const ExerciseCard = ({
  exercise,
  index,
  handleCancel,
  handleSubmit,
  handleDelete,
  exerciseTypes,
}) => {
  const [item, setItem] = React.useState(exercise);

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
            onClick={() => handleDelete(item.id)}
          />
          <Header as="h4">Exercise #{index + 1}</Header>
        </Card.Header>
        <Card.Content textAlign="left">
          <DropdownField
            label="Exercise"
            options={exerciseTypes?.map((e) => ({
              text: e.name,
              value: e.id,
            }))}
            search
            value={item?.exerciseId}
            onChange={(e, { value }) => setItem({ ...item, name: value })}
          />
          <Grid columns={4} style={{ marginTop: "10px" }}>
            <Grid.Row>
              <Grid.Column width={1} />
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

            {Object.keys(exercise.sets)
              .sort((a, b) => a - b)
              .map((s, i) => (
                <Grid.Row style={{ marginTop: "-26px" }} key={"set" + i}>
                  <Grid.Column width={1}>
                    <Button
                      icon="trash"
                      color="red"
                      // onClick={() => {
                      //   const sets = { ...exercise.sets };
                      //   delete sets[s];
                      //   setItem({ ...exercise, sets });
                      // }}
                    />
                  </Grid.Column>
                  <Grid.Column width={4} style={{ marginLeft: "10px" }}>
                    <InputField
                      placeholder="Set #"
                      value={i + 1}
                      disabled
                      type="number"
                    />
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <InputField
                      placeholder="Weight"
                      type="number"
                      value={exercise.sets[s].weight}
                      // onChange={(e, { value }) =>
                      //   setExercise({
                      //     ...exercise,
                      //     sets: {
                      //       ...exercise.sets,
                      //       [s]: {
                      //         ...exercise.sets[s],
                      //         weight: parseFloat(value),
                      //       },
                      //     },
                      //   })
                      // }
                    />
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <InputField
                      type="number"
                      placeholder="Reps"
                      value={exercise.sets[s].reps}
                      // onChange={(e, { value }) =>
                      //   setExercise({
                      //     ...exercise,
                      //     sets: {
                      //       ...exercise.sets,
                      //       [s]: {
                      //         ...exercise.sets[s],
                      //         reps: parseFloat(value),
                      //       },
                      //     },
                      //   })
                      // }
                    />
                  </Grid.Column>
                </Grid.Row>
              ))}
          </Grid>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Button
              icon="plus"
              color="green"
              onClick={() => {
                const orderId = Math.max(...Object.keys(exercise.sets)) + 1;
                setExercise({
                  ...exercise,
                  sets: {
                    ...exercise.sets,
                    [orderId]: { weight: "", reps: "" },
                  },
                });
              }}
            />
            <Button
              icon="save"
              content="Save"
              color="blue"
              onClick={() => handleSubmit(item)}
            />
            <Button icon="cancel" color="red" onClick={handleCancel} />
          </Container>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
};

function mapStateToProps(state) {
  return {
    exerciseTypes: state.fitness.exerciseTypes,
  };
}

export default connect(mapStateToProps, {})(ExerciseCard);
