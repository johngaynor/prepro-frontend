import React from "react";
import { Grid, Label, Segment } from "semantic-ui-react";

export const ViewInput = ({
  value,
  label,
  fullRow,
  width,
  height,
  noLabel,
}) => {
  return (
    <Grid.Column width={fullRow ? 16 : width}>
      {label && (
        <Label horizontal style={{ minWidth: "45%", textAlign: "center" }}>
          {label}:
        </Label>
      )}
      <Segment style={{ marginTop: 0, padding: 9, height: height || null }}>
        {value ? value : "--"}
      </Segment>
    </Grid.Column>
  );
};
