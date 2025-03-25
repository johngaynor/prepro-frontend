import React, { useState, useEffect } from "react";
import {
  Segment,
  Form,
  Grid,
  Label,
  Button,
  Input,
  Header,
} from "semantic-ui-react";
import {
  DropdownField,
  InputField,
  TextAreaField,
} from "../../../../components/FormFields";
import { connect } from "react-redux";
import { cloneDeep } from "lodash";

const defaultValues = {
  exerciseId: "",
  restTime: "",
  comments: "",
  sets: [{ weight: "", reps: "" }],
};

const Exercise = ({ exercise, exerciseTypes, index }) => {
  const [formValues, setFormValues] = useState(defaultValues);

  useEffect(() => {
    if (exercise) {
      setFormValues(cloneDeep(exercise));
    }
  }, [exercise]);

  return (
    <Segment
      style={{
        height: "90%",
        width: "90vw",
        maxWidth: 800,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Header as="h1" style={{ marginBottom: 30 }} textAlign="center">
        Exercise {index + 1}
      </Header>
      <Form>
        <Grid columns={2} stackable>
          <DropdownField
            label="Exercise"
            options={exerciseTypes?.map((e) => ({
              text: e.name,
              value: e.id,
            }))}
            value={formValues.exerciseId || ""}
            onChange={(e, { value }) =>
              setFormValues({ ...formValues, exerciseId: value })
            }
            search
          />
          <InputField
            type="text"
            label="Rest Time"
            value={formValues.restTime}
            onChange={(e, { value }) =>
              setFormValues({ ...formValues, restTime: value })
            }
          />
        </Grid>
        {/* Labels */}
        <Grid columns={3} style={{ marginBottom: "-35px" }}>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={4} style={{ marginLeft: 10 }}>
              <Label horizontal style={{ textAlign: "center" }}>
                Set:
              </Label>
            </Grid.Column>
            <Grid.Column width={5}>
              <Label horizontal style={{ textAlign: "center" }}>
                Weight:
              </Label>
            </Grid.Column>
            <Grid.Column width={5}>
              <Label horizontal style={{ textAlign: "center" }}>
                Reps:
              </Label>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* Sets */}
        {formValues.sets.map((s, i) => (
          <Grid key={"set" + i}>
            <Grid.Row style={{ marginBottom: "-20px" }}>
              <Grid.Column width={1}>
                <Button
                  icon="trash"
                  color="red"
                  onClick={() => {
                    const newSets = [...formValues.sets];
                    newSets.splice(i, 1);
                    setFormValues({ ...formValues, sets: newSets });
                  }}
                />
              </Grid.Column>
              <Grid.Column width={4} style={{ marginLeft: 10 }}>
                <Input
                  placeholder="Set #"
                  value={i + 1}
                  disabled
                  type="number"
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <Input
                  //   placeholder={
                  //     prevExercise
                  //       ? prevExercise.sets[i]?.weight || "Weight"
                  //       : "Weight"
                  //   }
                  type="number"
                  value={s.weight || ""}
                  onChange={(e, { value }) => {
                    const newSets = [...formValues.sets];
                    newSets[i].weight = value;
                    setFormValues({ ...formValues, sets: newSets });
                  }}
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <Input
                  //   placeholder={
                  //     prevExercise ? prevExercise.sets[i]?.reps || "Reps" : "Reps"
                  //   }
                  type="number"
                  value={s.reps || ""}
                  onChange={(e, { value }) => {
                    const newSets = [...formValues.sets];
                    newSets[i].reps = value;
                    setFormValues({ ...formValues, sets: newSets });
                  }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ))}
        <Grid style={{ marginBottom: "0px" }}>
          <Grid.Column width={2}>
            <Button
              icon="plus"
              color="green"
              onClick={() =>
                setFormValues({
                  ...formValues,
                  sets: [...formValues.sets, { weight: "", reps: "" }],
                })
              }
            />
          </Grid.Column>
        </Grid>
        <TextAreaField
          fullWidth
          label="comments"
          value={formValues.comments}
          // placeholder={
          //   prevExercise ? prevExercise.comments || "Comments" : "Comments"
          // }
          onChange={(e, { value }) =>
            setFormValues({ ...formValues, comments: value })
          }
        />
      </Form>
    </Segment>
  );
};

function mapStateToProps(state) {
  return {
    exerciseTypes: state.fitness.exerciseTypes,
  };
}

export default connect(mapStateToProps, {})(Exercise);
