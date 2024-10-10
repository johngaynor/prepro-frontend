import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Container, Segment, Label } from "semantic-ui-react";
import { InputField } from "../../components/FormFields";
import { DateTime } from "luxon";
import { ViewInput } from "../../components/FormFields/view";
import CheckInContext from "../context/checkInContext";
import AttachFile from "../../components/AttachFile";
import CommentsDisplay from "./CommentsDisplay";
import PhotosDisplay from "./PhotosDisplay";

const ViewCheckIn = ({ selectedDay, setEditMode }) => {
  const [fileOpen, setFileOpen] = useState(false);

  const { addAttachments, deleteAttachment, poses, assignPose } =
    useContext(CheckInContext);
  const navigate = useNavigate();

  function handleSubmitFile(formData) {
    addAttachments(formData, selectedDay.id);
  }

  const labels = {
    incomplete: false,
    noPhotos: selectedDay.photos.length <= 0,
    missingPoses: !!selectedDay.photos.find((p) => !p.poseId),
  };

  return (
    <>
      <Container
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: -5,
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
      <Segment>
        <Label
          ribbon
          color={
            labels.incomplete
              ? "red"
              : labels.noPhotos
              ? "orange"
              : labels.missingPoses
              ? "teal"
              : "green"
          }
        >
          {labels.incomplete
            ? "red"
            : labels.noPhotos
            ? "Missing Photos"
            : labels.missingPoses
            ? "Missing Pose Assignments"
            : "Complete"}
        </Label>
        {fileOpen && (
          <AttachFile
            headerText="Submit Check In Photos"
            onSubmit={handleSubmitFile}
            toggleFormOpen={() => setFileOpen(!fileOpen)}
          />
        )}
        <Grid stackable columns={3} style={{ marginBottom: 10, marginTop: 0 }}>
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
        {selectedDay && (
          <Grid columns={2} stackable>
            <Grid.Column>
              <CommentsDisplay checkInId={selectedDay.id} />
            </Grid.Column>
            <Grid.Column>
              <PhotosDisplay
                photos={selectedDay.photos}
                poses={poses}
                deleteAttachment={deleteAttachment}
                checkInId={selectedDay.id}
                assignPose={assignPose}
              />
            </Grid.Column>
          </Grid>
        )}
      </Segment>
    </>
  );
};

export default ViewCheckIn;
