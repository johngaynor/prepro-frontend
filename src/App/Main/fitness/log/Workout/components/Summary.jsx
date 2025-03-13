import React from "react";
import { Segment } from "semantic-ui-react";

const Summary = ({ workout }) => {
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
      Summary
    </Segment>
  );
};

export default Summary;
