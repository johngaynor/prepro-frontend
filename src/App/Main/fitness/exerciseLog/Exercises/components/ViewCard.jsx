import React, { useContext } from "react";
import {
  Grid,
  Button,
  Card,
  Header,
  Label,
  Container,
} from "semantic-ui-react";
import { ViewInput } from "../../../../components/FormFields/view";
import { FitnessContext } from "../../../Context/fitnessContext";

const ViewCard = ({ exercise, id, setEditMode }) => {
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
            onClick={() => setEditMode(exercise.id)}
          />
          <Header as="h4">Exercise #{id + 1}</Header>
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
              .map((s, i) => (
                <Grid.Row
                  style={{ marginTop: "-26px" }}
                  key={"exercise-" + id + "-set" + i}
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
          </Grid>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
};

export default ViewCard;
