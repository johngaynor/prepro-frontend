import React from "react";
import { Segment, Button } from "semantic-ui-react";

const Circle = ({
  active = false,
  completed = false,
  index,
  setActiveIndex,
}) => {
  return (
    <div
      style={{
        width: active ? 25 : 15,
        height: active ? 25 : 15,
        margin: 2,
        backgroundColor: completed ? "#C2C2C2" : "white",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontWeight: "bold",
        border: "3px solid #C2C2C2",
        cursor: "pointer",
      }}
      onClick={() => setActiveIndex(index)}
    ></div>
  );
};

const Pagination = ({ data = [], activeIndex = 0, setActiveIndex }) => {
  return (
    <Segment
      style={{
        padding: 5,
        marginTop: -10,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
      }}
    >
      <Button icon="backward" size="tiny" onClick={() => setActiveIndex(0)} />
      <Button
        icon="step backward"
        size="tiny"
        onClick={() => setActiveIndex(activeIndex > 0 ? activeIndex - 1 : 0)}
      />
      {data.map((d, i) => {
        return (
          <Circle
            active={i === activeIndex}
            key={i}
            completed={
              d.name === "Start"
                ? d.workout.timeStarted
                  ? true
                  : false
                : d.name === "End"
                ? d.workout.timeCompleted && d.workout.comments
                  ? true
                  : false
                : !d.exercise?.sets.find((e) => !e.weight || !e.reps)
            }
            setActiveIndex={setActiveIndex}
            index={i}
          />
        );
      })}
      <Button
        icon="step forward"
        size="tiny"
        onClick={() =>
          setActiveIndex(
            activeIndex >= data.length - 1 ? data.length - 1 : activeIndex + 1
          )
        }
        style={{ marginLeft: 5 }}
      />
      <Button
        icon="forward"
        size="tiny"
        onClick={() => setActiveIndex(data.length - 1)}
      />
    </Segment>
  );
};

export default Pagination;
