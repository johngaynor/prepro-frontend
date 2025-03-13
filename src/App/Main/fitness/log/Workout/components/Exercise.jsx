import React from "react";
import { Segment } from "semantic-ui-react";

const Exercise = ({ exercise }) => {
  console.log(exercise);
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
      {exercise.id}
    </Segment>
  );
};

export default Exercise;
