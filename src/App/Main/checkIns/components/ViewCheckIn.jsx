import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Container, Image, Segment } from "semantic-ui-react";
import { InputField } from "../../components/FormFields";
import { DateTime } from "luxon";
import { ViewInput } from "../../components/FormFields/view";
import CheckInContext from "../context/checkInContext";
import AttachFile from "../../components/AttachFile";
import PhotoModal from "./PhotoModal";
import CommentsDisplay from "./CommentsDisplay";

const ViewCheckIn = ({ selectedDay, setEditMode }) => {
  const [fileOpen, setFileOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(false);

  const { addAttachments, deleteAttachment } = useContext(CheckInContext);
  const navigate = useNavigate();

  function handleSubmitFile(formData) {
    addAttachments(formData, selectedDay.id);
  }

  function handleClosePhoto() {
    setActivePhoto(null);
  }

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
        {fileOpen && (
          <AttachFile
            headerText="Submit Check In Photos"
            onSubmit={handleSubmitFile}
            toggleFormOpen={() => setFileOpen(!fileOpen)}
          />
        )}
        <PhotoModal
          modalOpen={!!activePhoto}
          photo={activePhoto}
          handleCloseModal={handleClosePhoto}
          handleDeletePhoto={deleteAttachment}
        />
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
        {selectedDay && (
          <Grid columns={2} stackable>
            <Grid.Column>
              <CommentsDisplay checkInId={selectedDay.id} />
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
        )}

        {/* <Grid columns={5} doubling stackable style={{ marginBottom: 20 }}>
        {selectedDay.photos?.map((p, i) => {
          return (
            <Grid.Column
              key={"checkin-photo-" + i}
              onClick={() => setActivePhoto(p)}
            >
              <Image
                size="small"
                src={p.signedUrl}
                style={{ height: 200, width: "auto" }}
              />
            </Grid.Column>
          );
        })}
      </Grid> */}
      </Segment>
    </>
  );
};

export default ViewCheckIn;
