import React, { useState, useEffect } from "react";
import { Grid, Form, Button, Container } from "semantic-ui-react";
import { InputField, TextAreaField } from "../../../components/FormFields";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { editWorkoutSummary, deleteWorkoutSummary } from "../../actions";
import { connect } from "react-redux";

const defaultValues = {
  comments: "",
  timeStarted: "",
};

const EditSummary = ({
  selectedWorkout,
  setEditMode,
  setActiveTab,
  date,
  editLoading,
  editWorkoutSummary,
  deleteWorkoutSummary,
}) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (selectedWorkout) {
      setFormValues(selectedWorkout);
    }
  }, [selectedWorkout]);

  const navigate = useNavigate();

  function validateForm(vals) {
    const errors = {
      timeStarted: false,
      timeCompleted: false,
    };
    if (!vals.timeStarted)
      errors.timeStarted = "Please enter the time you started the workout.";

    if (errors.timeStarted) {
      setFormErrors(errors);
      return false;
    }

    return true;
  }
  return (
    <Form
      onSubmit={() => {
        const valid = validateForm(formValues);
        if (valid) {
          setFormErrors({});
          editWorkoutSummary({ ...formValues, date });

          if (selectedWorkout) {
            setEditMode(false);
          } else {
            setActiveTab(2);
          }
        }
      }}
    >
      {editLoading && <Spinner />}
      <Grid stackable columns={3} style={{ marginBottom: "10px" }}>
        <InputField
          type="date"
          label="Date"
          value={date || ""}
          onChange={(e, { value }) => navigate(`/fitness/log/${value}`)}
        />
        <InputField
          type="time"
          label="Time Started"
          value={formValues.timeStarted}
          onChange={(e, { value }) =>
            setFormValues({ ...formValues, timeStarted: value })
          }
          error={formErrors.timeStarted}
        />

        <TextAreaField
          label="Workout Comments"
          fullWidth
          value={formValues.comments}
          onChange={(e, { value }) =>
            setFormValues({
              ...formValues,
              comments: value,
            })
          }
        />
      </Grid>
      <Container
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {selectedWorkout && (
          <>
            <Button
              type="button"
              content="Cancel"
              icon="cancel"
              color="red"
              onClick={() => setEditMode(false)}
            />
            <Button
              type="button"
              icon="trash"
              color="red"
              onClick={() => {
                deleteWorkoutSummary(selectedWorkout.id);
                setFormValues(defaultValues);
              }}
            />
          </>
        )}
        <Button type="submit" content="Save" icon="save" color="blue" />
      </Container>
    </Form>
  );
};

function mapStateToProps(state) {
  return {
    editLoading: state.fitness.editLoading,
  };
}

export default connect(mapStateToProps, {
  editWorkoutSummary,
  deleteWorkoutSummary,
})(EditSummary);
