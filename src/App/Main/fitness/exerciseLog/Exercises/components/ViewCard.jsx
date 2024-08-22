import React from "react";
import {
  Grid,
  Button,
  Card,
  Header,
  Label,
  Container,
} from "semantic-ui-react";
import { ViewInput } from "../../../../components/FormFields/view";

const ViewCard = ({ item, id }) => {
  const [exercise, setExercise] = React.useState(item);

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
          ></Button>
          <Header as="h4">Exercise #{id + 1}</Header>
        </Card.Header>
        <Card.Content textAlign="left">
          <ViewInput label="Exercise" value={exercise?.name} />
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

            {Object.keys(exercise.sets)
              .sort((a, b) => a - b)
              .map((s, i) => (
                <Grid.Row style={{ marginTop: "-26px" }} key={"set" + i}>
                  <Grid.Column width={4} style={{ marginLeft: "10px" }}>
                    <ViewInput placeholder="Set #" value={i + 1} disabled />
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <ViewInput
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
                    <ViewInput
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
        </Card.Content>
      </Card>
    </Grid.Column>
  );
};

export default ViewCard;
