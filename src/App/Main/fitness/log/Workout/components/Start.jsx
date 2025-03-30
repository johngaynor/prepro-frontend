import React, { useState } from "react";
import {
  Segment,
  Grid,
  Button,
  Header,
  Icon,
  HeaderSubheader,
  List,
  ListItem,
  Confirm,
} from "semantic-ui-react";
import { InputField } from "../../../../components/FormFields";
import { connect } from "react-redux";
import { DateTime } from "luxon";
import useDebounce from "../../../../customHooks/useDebounce";
import { editWorkoutStart, deleteWorkout } from "../../../actions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const StartPage = ({
  workout,
  templates,
  exerciseTypes,
  editWorkoutStart,
  deleteWorkout,
}) => {
  const [formValues, setFormValues] = useState({ ...workout });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();

  const template = templates.find((t) => t.id === workout.workoutTemplateId);

  useDebounce(
    async () => {
      const { id, timeStarted } = formValues;
      const promise = editWorkoutStart(id, timeStarted);

      toast.promise(promise, {
        loading: "Saving...",
        success: "Save Complete!",
        error: "Save failed. Please refresh.",
      });

      try {
        await promise;
      } catch (error) {
        console.error(error);
      }
    },
    [formValues],
    1000
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
        position: "relative",
      }}
    >
      <Button
        style={{ position: "absolute", top: 10, left: 10 }}
        type="button"
        icon="undo"
        onClick={() => navigate(`/fitness/log/${workout.date}`)}
        content="Go Back"
      />
      <Header as="h1" icon>
        <Icon name="lightning" />
        {DateTime.fromISO(workout.date).toFormat("cccc MMMM dd, yyyy")}
        <HeaderSubheader>Template: {template.name}</HeaderSubheader>
      </Header>

      {/* {editLoading && <Spinner />} */}
      <Grid
        stackable
        columns={1}
        style={{
          width: "100%",
        }}
      >
        <InputField
          type="time"
          label="Time Started"
          value={formValues.timeStarted}
          onChange={(e, { value }) =>
            setFormValues({ ...formValues, timeStarted: value })
          }
        />
      </Grid>
      <Header as="h3" textAlign="center">
        Summary
      </Header>
      <List>
        {workout.exercises.map((e) => (
          <ListItem
            key={e.id}
            icon={
              e.sets.find((e) => e.weight || e.reps)
                ? "check square outline"
                : "square outline"
            }
            content={
              <div>
                {exerciseTypes.find((t) => t.id === e.exerciseId)?.name}
              </div>
            }
          />
        ))}
      </List>
      <Button
        style={{ position: "absolute", right: 10, bottom: 10 }}
        type="button"
        icon="trash"
        color="red"
        onClick={() => setConfirmOpen(true)}
        content="Delete Workout"
      />
      <Confirm
        open={confirmOpen}
        onConfirm={() =>
          deleteWorkout(workout.id).then(() =>
            navigate(`/fitness/log/${workout.date}`)
          )
        }
        onCancel={() => setConfirmOpen(false)}
      />
    </Segment>
  );
};

function mapStateToProps(state) {
  return {
    templates: state.fitness.templates,
    exerciseTypes: state.fitness.exerciseTypes,
  };
}

export default connect(mapStateToProps, { editWorkoutStart, deleteWorkout })(
  StartPage
);
