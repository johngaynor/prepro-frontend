import React, { useContext } from "react";
import {
  Grid,
  Button,
  Card,
  Header,
  Label,
  Container,
} from "semantic-ui-react";
import { InputField, DropdownField } from "../../../../components/FormFields";
import FitnessContext from "../../../Context/fitnessContext";

const ExerciseCard = ({ item, id, setEditMode }) => {
  const [exercise, setExercise] = React.useState(item);

  const { deleteWorkoutExercise, exerciseTypes } = useContext(FitnessContext);

  function handleSubmit() {
    setEditMode(false);
    console.log("attempting to submit for", exercise);
  }

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
            onClick={() => deleteWorkoutExercise(item.id)}
          />
          <Header as="h4">Exercise #{id + 1}</Header>
        </Card.Header>
        <Card.Content textAlign="left">
          <DropdownField
            label="Exercise"
            options={exerciseTypes?.map((e) => ({
              text: e.name,
              value: e.id,
            }))}
            search
            value={exercise?.exerciseId}
            onChange={(e, { value }) =>
              setExercise({ ...exercise, name: value })
            }
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
                      onClick={() => {
                        const sets = { ...exercise.sets };
                        delete sets[s];
                        setExercise({ ...exercise, sets });
                      }}
                    />
                  </Grid.Column>
                  <Grid.Column width={4} style={{ marginLeft: "10px" }}>
                    <InputField placeholder="Set #" value={i + 1} disabled />
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <InputField
                      placeholder="Weight"
                      type="number"
                      value={exercise.sets[s].weight}
                      onChange={(e, { value }) =>
                        setExercise({
                          ...exercise,
                          sets: {
                            ...exercise.sets,
                            [s]: {
                              ...exercise.sets[s],
                              weight: parseFloat(value),
                            },
                          },
                        })
                      }
                    />
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <InputField
                      placeholder="Reps"
                      value={exercise.sets[s].reps}
                      onChange={(e, { value }) =>
                        setExercise({
                          ...exercise,
                          sets: {
                            ...exercise.sets,
                            [s]: {
                              ...exercise.sets[s],
                              reps: parseFloat(value),
                            },
                          },
                        })
                      }
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
              onClick={handleSubmit}
            />
          </Container>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
};

export default ExerciseCard;
