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
  const maxItems = 9;

  const indexToUse = isNaN(activeIndex) ? 0 : activeIndex;

  const startPos =
    data.length - indexToUse < maxItems ? data.length - maxItems : indexToUse;
  const endPos =
    indexToUse + maxItems > data.length ? data.length : indexToUse + maxItems;

  const circles = data.map((d, i) => (
    <Circle
      active={i === indexToUse}
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
          : d.exercise?.sets.find((e) => e.weight || e.reps)
      }
      setActiveIndex={setActiveIndex}
      index={i}
    />
  ));

  const items = circles.slice(startPos, endPos);

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
        onClick={() => setActiveIndex(indexToUse > 0 ? indexToUse - 1 : 0)}
      />
      {items.map((circle, i) => circle)}
      <Button
        icon="step forward"
        size="tiny"
        onClick={() =>
          setActiveIndex(
            indexToUse >= data.length - 1 ? data.length - 1 : indexToUse + 1
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
