import React from "react";
import { ViewInput } from "../../../components/FormFields/view";
import { InputField } from "../../../components/FormFields";
import { Grid, Button, Container } from "semantic-ui-react";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

const ViewSummary = ({ selectedLog, setEditMode }) => {
  const navigate = useNavigate();
  return (
    <>
      <Grid stackable columns={3} style={{ marginBottom: "10px" }}>
        <InputField
          type="date"
          label="Date"
          value={DateTime.fromISO(selectedLog.date).toFormat("yyyy-MM-dd")}
          onChange={(e, { value }) => navigate(`/fitness/log/${value}`)}
        />
        <ViewInput
          // value={selectedLog.type}
          value={"--------------------"}
          label="Workout Type"
        />
        <ViewInput
          value={DateTime.fromFormat(
            selectedLog.timeCompleted,
            "HH:mm:ss"
          ).toFormat("hh:mm a")}
          label="Time Completed"
        />
        <ViewInput
          value={selectedLog.comments}
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
