import React, { useState, useEffect } from "react";
import { Grid, Button, Container, Form, Segment } from "semantic-ui-react";
import { InputField, TextAreaField } from "../../components/FormFields";
import { cloneDeep } from "lodash";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { editCheckIn, deleteCheckIn } from "../actions";

const EditCheckIn = ({
  selectedDay,
  setEditMode,
  date,
  lastCheckIn,
  editCheckIn,
  deleteCheckIn,
}) => {
  const [formValues, setFormValues] = useState({
    date,
    hormones: "",
    phase: "",
    timeline: "",
    cheats: "",
    comments: "",
    training: "",
    cardio: "",
  });

  const defaultValues = {
    date,
    hormones: "",
    phase: "",
    timeline: "",
    cheats: "",
    comments: "",
    training: "",
    cardio: "",
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (selectedDay) {
      setFormValues(cloneDeep(selectedDay)); // make a deep clone to avoid mutating original object
    }
  }, [selectedDay]);

  function handleSubmit() {
    // handle validation
    editCheckIn({ ...selectedDay, ...formValues });
    setEditMode(false);
  }

  function handleChange(e, { name, value }) {
    setFormValues({ ...formValues, [name]: value });
  }

  function handleCopyFromLast() {
    const newVals = cloneDeep(lastCheckIn);
    setFormValues({ ...newVals, date, id: null });
  }

  return (
    <Segment>
      <Form onSubmit={handleSubmit}>
        <Grid stackable columns={3} style={{ marginBottom: "10px" }}>
          <InputField
            type="date"
            label="Date"
            name="date"
            value={formValues.date}
            onChange={(e, { value }) => navigate(`/checkins/${value}`)}
          />
          <InputField
            label="Timeline (how many weeks into diet)"
            name="timeline"
            value={formValues.timeline || ""}
            onChange={handleChange}
          />
          <InputField
            label="Current diet phase (bulk, cut, etc.)"
            name="phase"
            value={formValues.phase || ""}
            onChange={handleChange}
          />
          <InputField
            label="Hormone altering or fat loss supplements used"
            name="hormones"
            value={formValues.hormones || ""}
            onChange={handleChange}
          />
          <InputField
            label="Cardio (style, duration, number of times per week)"
            name="cardio"
            value={formValues.cardio || ""}
            onChange={handleChange}
          />
          <InputField
            label="Training (style and days per week)"
            name="training"
            value={formValues.training || ""}
            onChange={handleChange}
          />
          <TextAreaField
            label="Cheat/missed meals"
            name="cheats"
            value={formValues.cheats || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextAreaField
            label="Overall comments/thoughts from the week"
            name="comments"
            value={formValues.comments || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Container
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          {selectedDay && (
            <>
              <Button
                type="button"
                content="Cancel"
                icon="cancel"
                color="red"
                onClick={() => {
                  setFormValues(cloneDeep(selectedDay)); // restore original values
                  setEditMode(false);
                }}
              />
              <Button
                type="button"
                icon="trash"
                color="red"
                onClick={() => {
                  deleteCheckIn(selectedDay.id);
                  setFormValues(defaultValues);
                }}
              />
            </>
          )}
          {lastCheckIn && !selectedDay && (
            <Button
              type="button"
              icon="upload"
              color="teal"
              content="Pull From Last Checkin"
              onClick={handleCopyFromLast}
            />
          )}

          <Button type="submit" content="Save" icon="save" color="blue" />
        </Container>
      </Form>
    </Segment>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { editCheckIn, deleteCheckIn })(
  EditCheckIn
);
