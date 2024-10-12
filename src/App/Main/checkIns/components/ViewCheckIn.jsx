import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Container, Segment, Label } from "semantic-ui-react";
import { InputField } from "../../components/FormFields";
import { DateTime } from "luxon";
import { ViewInput } from "../../components/FormFields/view";
import AttachFile from "../../components/AttachFile";
import CommentsDisplay from "./CommentsDisplay";
import PhotosDisplay from "./PhotosDisplay";
import { connect } from "react-redux";
import { addPhoto, deletePhoto, assignPose } from "../../physique/actions";

const ViewCheckIn = ({
  selectedDay,
  setEditMode,
  poses,
  photos,
  addPhoto,
  deletePhoto,
  assignPose,
}) => {
  const [fileOpen, setFileOpen] = useState(false);
  const navigate = useNavigate();

  function handleSubmitFile(formData) {
    addPhoto(formData, selectedDay.id);
  }

  const activePhotos = photos?.filter((p) => p.checkInId === selectedDay.id);

  const labels = {
    incomplete: false,
    noPhotos: selectedDay.photos.length <= 0,
    missingPoses: !!activePhotos?.find((p) => !p.poseId),
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
          <ViewInput
            value={selectedDay?.timeline}
            label="Timeline (how many weeks into diet)"
          />
          <ViewInput
            value={selectedDay?.phase}
            label="Current diet phase (bulk, cut, etc.)"
          />
          <ViewInput
            value={selectedDay?.hormones}
            label="Hormone altering or fat loss supplements used"
          />
          <ViewInput
            value={selectedDay?.cardio}
            label="Cardio (style, duration, number of times per week)"
          />
          <ViewInput
            value={selectedDay?.training}
            label="Training (style and days per week)"
          />
          <ViewInput
            value={selectedDay?.cheats}
            label="Cheat/missed meals (PLEASE BE HONEST, this is necessary for making accurate changes)"
            fullRow
          />
          <ViewInput
            value={selectedDay?.comments}
            label="Overall comments/thoughts from the week (training, mood, sleep, energy, etc.)"
            fullRow
          />
        </Grid>
        {selectedDay && (
          <Grid columns={2} stackable>
            <Grid.Column>
              <CommentsDisplay checkInId={selectedDay.id} />
            </Grid.Column>
            <Grid.Column>
              <PhotosDisplay
                photos={activePhotos}
                poses={poses}
                deletePhoto={deletePhoto}
                assignPose={assignPose}
              />
            </Grid.Column>
          </Grid>
        )}
      </Segment>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    poses: state.physique.poses,
    photos: state.physique.photos,
  };
};

export default connect(mapStateToProps, { addPhoto, deletePhoto, assignPose })(
  ViewCheckIn
);
