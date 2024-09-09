import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Container, Image } from "semantic-ui-react";
import { InputField } from "../../components/FormFields";
import { DateTime } from "luxon";
import { ViewInput } from "../../components/FormFields/view";
import CheckInContext from "../context/checkInContext";
import AttachFile from "../../components/AttachFile";

const ViewCheckIn = ({ selectedDay, setEditMode }) => {
  const [fileOpen, setFileOpen] = useState(false);

  const { addAttachments } = useContext(CheckInContext);
  const navigate = useNavigate();

  function handleSubmitFile(formData) {
    addAttachments(formData, selectedDay.id);
  }

  return (
    <>
      {fileOpen && (
        <AttachFile
          headerText="Submit Check In Photos"
          onSubmit={handleSubmitFile}
          toggleFormOpen={() => setFileOpen(!fileOpen)}
        />
      )}
      <Grid stackable columns={3} style={{ marginBottom: "10px" }}>
        <InputField
          type="date"
          label="Date"
          value={DateTime.fromISO(selectedDay.date).toFormat("yyyy-MM-dd")}
          onChange={(e, { value }) => navigate(`/checkins/${value}`)}
        />
        {selectedDay.questions
          .sort((a, b) => a.orderId - b.orderId)
          .map((q, i) => (
            <ViewInput
              value={q.answer}
              label={q.question}
              key={"question-" + i}
              height={q.textArea ? 90 : null}
              fullRow={q.fullWidth}
            />
          ))}
      </Grid>
      <Grid columns={5} doubling stackable style={{ marginBottom: 20 }}>
        {selectedDay.photos?.map((p, i) => {
          return (
            <Grid.Column key={"checkin-photo-" + i}>
              <Image
                size="small"
                src={p.s3Url}
                style={{ height: 200, width: "auto" }}
              />
            </Grid.Column>
          );
        })}
      </Grid>
      <Container
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={() => setFileOpen(true)}
          color="purple"
          type="button"
          content="Add Photos"
          icon="file"
        />
        <Button
          type="button"
          content="View Report"
          icon="eye"
          color="teal"
          onClick={() => navigate(`/checkins/${selectedDay.date}?report=true`)}
        />
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

export default ViewCheckIn;
