import React, { useState } from "react";
import { Grid, Form, Button, Container } from "semantic-ui-react";
import {
  InputField,
  TextAreaField,
  DropdownField,
} from "../../../components/FormFields";
import FitnessContext from "../../Context/fitnessContext";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";

const EditSummary = ({ selectedLog, setEditMode, setActiveTab, date }) => {
  const [formValues, setFormValues] = useState({
    date,
    workoutId: selectedLog?.id || null,
    comments: selectedLog?.comments || "",
    type: selectedLog?.type || "",
    timeCompleted: selectedLog?.timeCompleted.slice(0, -3) || "",
  });
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const params = useParams();

  const { editLoading, editWorkoutSummary } = React.useContext(FitnessContext);

  function validateForm(vals) {
    const errors = {
      type: false,
      date: false,
      timeCompleted: false,
    };
    if (!vals.type) errors.type = "Please select a valid option.";
    if (!vals.timeCompleted)
      errors.timeCompleted = "Please enter the time you ended the workout.";
    if (!vals.date) errors.date = "Please select a date for the workout.";

    if (errors.type || errors.date || errors.timeCompleted) {
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

          if (selectedLog) {
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
        <DropdownField
          options={[
            { value: "Cardio", text: "Cardio" },
            { value: "Weight Training", text: "Weight Training" },
          ]}
          label="Workout Type"
          value={formValues.type}
          onChange={(e, { value }) =>
            setFormValues({ ...formValues, type: value })
          }
          error={formErrors.type}
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
        {selectedLog && (
          <Button
            type="button"
            content="Cancel"
            icon="cancel"
            color="red"
            onClick={() => setEditMode(false)}
          />
        )}
        <Button type="submit" content="Save" icon="save" color="blue" />
      </Container>
    </Form>
  );
};

export default EditSummary;
