import React from "react";
import { ViewInput } from "../../../components/FormFields/view";
import { InputField } from "../../../components/FormFields";
import { Grid, Button, Container } from "semantic-ui-react";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

const ViewSummary = ({ selectedWorkout, setEditMode }) => {
  const navigate = useNavigate();
  return (
    <>
      <Grid stackable columns={3} style={{ marginBottom: "10px" }}>
        <InputField
          type="date"
          label="Date"
          value={DateTime.fromISO(selectedWorkout.date).toFormat("yyyy-MM-dd")}
          onChange={(e, { value }) => navigate(`/fitness/log/${value}`)}
        />
        <ViewInput
          value={DateTime.fromFormat(
            selectedWorkout.timeStarted,
            "HH:mm:ss"
          ).toFormat("hh:mm a")}
          label="Time Started"
        />
        <ViewInput
          value={selectedWorkout.comments}
          label="Workout Comments"
          fullRow
          height={90}
        />
      </Grid>
      <Container
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
      </Container>
    </>
  );
};

export default ViewSummary;
