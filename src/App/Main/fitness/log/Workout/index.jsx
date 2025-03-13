import React from "react";
import { Segment, Header, Icon, List, ListItem } from "semantic-ui-react";
import { connect } from "react-redux";
import { DateTime } from "luxon";

const Workout = ({ activeWorkout, exerciseTypes }) => {
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
      <Header as="h1" icon style={{ userSelect: "none" }}>
        <Icon name="history" size="massive" color="blue" />
        Workout Summary
      </Header>

      <Header as="h2" textAlign="center">
        {DateTime.fromISO(activeWorkout.date).toFormat("cccc MM/dd/yyyy")}
      </Header>

      <Header as="h3" textAlign="center">
        Time: {startTime} - {endTime}
      </Header>

      <List>
        {activeWorkout.exercises
          .sort((a, b) => a.orderId - b.orderId)
          .map((e) => (
            <ListItem
              key={e.id}
              style={{ margin: 0 }}
              icon="check"
              content={
                <div>
                  <strong>
                    {exerciseTypes.find((t) => t.id === e.exerciseId)?.name}
                  </strong>
                  <p>
                    {e.sets.reduce((acc, val, i) => {
                      return `${acc} ${val.weight}x${val.reps}${
                        i < e.sets.length - 1 ? "," : ""
                      } `;
                    }, "")}
                  </p>
                </div>
              }
            />
          ))}
      </List>

      {/* <p>Comments: {activeWorkout.comments}</p> */}
      {/* <Container
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          type="button"
          content="Edit"
          icon="pencil"
          color="orange"
          onClick={() => setEditMode(true)}
        />
      </Container> */}
    </Segment>
  );
};

function mapStateToProps(state) {
  return {
    exerciseTypes: state.fitness.exerciseTypes,
  };
}

export default connect(mapStateToProps, {})(Workout);
