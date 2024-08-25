import React, { useState, useContext } from "react";
import { Grid, Form, Button, Container } from "semantic-ui-react";
import { InputField, TextAreaField } from "../../../components/FormFields";
import FitnessContext from "../../Context/fitnessContext";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";

const EditSummary = ({ selectedWorkout, setEditMode, setActiveTab, date }) => {
  const [formValues, setFormValues] = useState({
    date,
    workoutId: selectedWorkout?.id || null,
    comments: selectedWorkout?.comments || "",
    timeStarted: selectedWorkout?.timeStarted.slice(0, -3) || "",
    timeCompleted: selectedWorkout?.timeCompleted.slice(0, -3) || "",
  });
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const params = useParams();

  const { editLoading, editWorkoutSummary, deleteWorkoutSummary } =
    useContext(FitnessContext);

  function validateForm(vals) {
    const errors = {
      date: false,
      timeStarted: false,
      timeCompleted: false,
    };
    if (!vals.timeStarted)
      errors.timeStarted = "Please enter the time you started the workout.";
    if (!vals.timeCompleted)
      errors.timeCompleted = "Please enter the time you ended the workout.";
    if (!vals.date) errors.date = "Please select a date for the workout.";

    if (errors.timeStarted || errors.date || errors.timeCompleted) {
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
          editWorkoutSummary(formValues);

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
          value={params.date}
          onChange={(e, { value }) => navigate(`/fitness/log/${value}`)}
          error={formErrors.date}
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
        <InputField
          type="time"
          label="Time Completed"
          value={formValues.timeCompleted}
          onChange={(e, { value }) =>
            setFormValues({ ...formValues, timeCompleted: value })
          }
          error={formErrors.timeCompleted}
        />
        <TextAreaField
          label="Workout Comments"
          fullWidth
          value={formValues.comments}
          onChange={(e, { value }) =>
            setFormValues({ ...formValues, comments: value })
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
                setFormValues({
                  workoutId: null,
                  comments: "",
                  timeStarted: "",
                  timeCompleted: "",
                });
              }}
            />
          </>
        )}
        <Button type="submit" content="Save" icon="save" color="blue" />
      </Container>
    </Form>
  );
};

export default EditSummary;
