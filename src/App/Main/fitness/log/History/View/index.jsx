import React from "react";
import {
  Segment,
  Header,
  Icon,
  List,
  ListItem,
  Button,
  Label,
  Divider,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

function convertTime(start, end) {
  const format = "HH:mm:ss";

  const startTime = DateTime.fromFormat(start, format);
  const endTime = DateTime.fromFormat(end, format);
  const diff = endTime.diff(startTime, ["hours", "minutes"]);

  const {
    values: { hours, minutes },
  } = diff;

  if (hours < 0 || minutes < 0) {
    return "--";
  } else if (hours === 0) {
    return `${minutes}m`;
  } else {
    return `${hours}h ${minutes}m`;
  }
}

const Workout = ({ activeWorkout, exerciseTypes }) => {
  const navigate = useNavigate();

  const startTime = activeWorkout.timeStarted
    ? DateTime.fromFormat(activeWorkout.timeStarted, "HH:mm:ss").toFormat(
        "hh:mm a"
      )
    : "??";

  const endTime = activeWorkout.timeCompleted
    ? DateTime.fromFormat(activeWorkout.timeCompleted, "HH:mm:ss").toFormat(
        "hh:mm a"
      )
    : "??";

  const totalTime =
    activeWorkout.timeStarted && activeWorkout.timeCompleted
      ? convertTime(activeWorkout.timeStarted, activeWorkout.timeCompleted)
      : "--";

  return (
    <Segment
      style={{
        height: "90%",
        width: "90vw",
        maxWidth: 800,
        position: "relative",
      }}
    >
      <Label
        style={{ position: "absolute", left: -14 }}
        ribbon
        color={activeWorkout.timeCompleted ? "green" : "orange"}
      >
        {activeWorkout.timeCompleted ? "Completed" : "Incomplete"}
      </Label>
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Header as="h2" textAlign="center">
          {DateTime.fromISO(activeWorkout.date).toFormat("cccc MM/dd/yyyy")}
        </Header>
        <Header as="h1" icon style={{ userSelect: "none" }}>
          <Icon name="history" size="massive" color="blue" />
          Workout Summary
        </Header>
        <div>
          <Header
            icon
            style={{
              fontSize: 60,
              marginBottom: 0,
            }}
            color="teal"
          >
            {totalTime}
          </Header>
          <Header as="h4" icon style={{ marginTop: 0 }}>
            Time: {startTime} - {endTime}
          </Header>
        </div>
        <List>
          {activeWorkout.exercises
            .sort((a, b) => a.orderId - b.orderId)
            .map((e) => (
              <ListItem
                key={e.id}
                style={{ margin: 0 }}
                icon="check"
                content={
                  <strong>
                    {exerciseTypes.find((t) => t.id === e.exerciseId)?.name}
                  </strong>
                }
              />
            ))}
        </List>
        <Divider horizontal>Comments</Divider>
        <i style={{ width: "80%" }}>"{activeWorkout.comments}"</i>
        <Button
          style={{ marginTop: 40 }}
          content="View"
          icon="eye"
          onClick={() => navigate(`/fitness/workout/${activeWorkout.id}`)}
        />
      </div>
    </Segment>
  );
};

function mapStateToProps(state) {
  return {
    exerciseTypes: state.fitness.exerciseTypes,
  };
}

export default connect(mapStateToProps, {})(Workout);
