import React, { useState } from "react";
import {
  Segment,
  Grid,
  Container,
  Button,
  Header,
  Icon,
  HeaderSubheader,
  List,
  ListItem,
} from "semantic-ui-react";
import { InputField } from "../../../../components/FormFields";
import { connect } from "react-redux";
import { DateTime } from "luxon";
import useDebounce from "../../../../customHooks/useDebounce";
import { editWorkoutStart, deleteWorkout } from "../../../actions";
import { useNavigate } from "react-router-dom";

const StartPage = ({
  workout,
  templates,
  exerciseTypes,
  editWorkoutStart,
  deleteWorkout,
}) => {
  const [formValues, setFormValues] = useState({ ...workout });
  const navigate = useNavigate();

  const template = templates.find((t) => t.id === workout.workoutTemplateId);

  useDebounce(
    async () => {
      const { id, timeStarted } = formValues;
      await editWorkoutStart(id, timeStarted);
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
      }}
    >
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
          // error={formErrors.timeStarted}
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
              e.sets.find((e) => !e.weight || !e.reps)
                ? "square outline"
                : "check square outline"
            }
            content={
              <div>
                {exerciseTypes.find((t) => t.id === e.exerciseId)?.name}
              </div>
            }
          />
        ))}
      </List>
      <Container
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          type="button"
          icon="trash"
          color="red"
          onClick={() =>
            deleteWorkout(workout.id).then(() =>
              navigate(`/fitness/log/${workout.date}`)
            )
          }
        />
      </Container>
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
