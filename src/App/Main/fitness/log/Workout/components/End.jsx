import React, { useState } from "react";
import { Segment, Grid, Form, Header, Divider } from "semantic-ui-react";
import { InputField, TextAreaField } from "../../../../components/FormFields";
import useDebounce from "../../../../customHooks/useDebounce";
import { connect } from "react-redux";
import { editWorkoutEnd } from "../../../actions";

const EndPage = ({ workout, editWorkoutEnd }) => {
  const [formValues, setFormValues] = useState({ ...workout });

  useDebounce(
    async () => {
      const { id, timeCompleted, comments } = formValues;
      await editWorkoutEnd(id, timeCompleted, comments);
    },
    [formValues],
    1000
  );

  const stats = workout.exercises.reduce(
    (acc, val) => {
      const { sets } = val;

      let totalWeight = 0;
      sets.forEach((set) => {
        const { weight, reps } = set;

        if (weight && reps) {
          totalWeight += weight * reps;
        }
      });

      return { weight: acc.weight + totalWeight, sets: acc.sets + sets.length };
    },
    { weight: 0, sets: 0 }
  );

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
      <Header as="h1" icon>
        Workout Complete!
      </Header>
      <Divider horizontal style={{ padding: 15 }}>
        Here's how you did:
      </Divider>
      <div>
        <Header
          icon
          style={{
            fontSize: 60,
            marginBottom: 0,
          }}
          color="red"
        >
          {stats.sets}
        </Header>
        <Header as="h2" icon style={{ marginTop: 0 }}>
          Total Sets
        </Header>
      </div>
      <div>
        <Header
          icon
          style={{
            fontSize: 60,
            marginBottom: 0,
          }}
          color="blue"
        >
          {stats.weight}
        </Header>
        <Header as="h2" icon style={{ marginTop: 0 }}>
          Total Weight Lifted (lbs)
        </Header>
      </div>

      <Divider horizontal style={{ padding: 15 }}>
        Fill this out:
      </Divider>
      <Form>
        <Grid stackable style={{ marginBottom: "10px" }}>
          <InputField
            type="time"
            label="Time Completed"
            value={formValues.timeCompleted ?? ""}
            onChange={(e, { value }) =>
              setFormValues({ ...formValues, timeCompleted: value })
            }
            // error={formErrors.timeStarted}
          />

          <TextAreaField
            label="Workout Comments"
            fullWidth
            value={formValues.comments ?? ""}
            onChange={(e, { value }) =>
              setFormValues({
                ...formValues,
                comments: value,
              })
            }
          />
        </Grid>
      </Form>
    </Segment>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { editWorkoutEnd })(EndPage);
