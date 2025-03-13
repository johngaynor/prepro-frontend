import React from "react";
import { Radio } from "semantic-ui-react";

const StartChoice = ({ choice, setChoice, children, id }) => {
  return (
    <div
      style={{
        backgroundColor: choice === id ? "#EBEBEB" : "white",
        minHeight: 50,
        width: "95%",
        borderRadius: 5,
        padding: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `2px solid ${choice === id ? "#C2C2C2" : "#EBEBEB"}`,
        position: "relative",
        cursor: "pointer",
        flexDirection: "column",
        userSelect: "none",
      }}
      onClick={() => setChoice(id)}
    >
      <Radio
        checked={choice === id}
        style={{ position: "absolute", left: 10 }}
      />
      {children}
    </div>
  );
};

export default StartChoice;
