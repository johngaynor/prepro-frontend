import React from "react";
import { Grid, Form, Button, Container } from "semantic-ui-react";
import {
  InputField,
  TextAreaField,
  DropdownField,
} from "../../../../components/FormFields";
import FitnessContext from "../../../Context/fitnessContext";
import Spinner from "../../../../components/Spinner";

const Summary = ({ setActiveTab }) => {
  const [formValues, setFormValues] = React.useState({
    workoutId: null,
    comments: "",
    type: "",
    date: `${new Date().getFullYear()}-${String(
      new Date().getMonth() + 1
    ).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`,
    timeCompleted: "",
  });
  const [formErrors, setFormErrors] = React.useState({});

  const { workoutTypes, editLoading, editWorkoutSummary } =
    React.useContext(FitnessContext);

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
          setActiveTab(1);
        }
      }}
    >
      {editLoading && <Spinner />}
      <Grid stackable columns={3} style={{ marginBottom: "10px" }}>
        <InputField
          type="date"
          label="Date"
          onChange={(e, { value }) =>
            setFormValues({ ...formValues, date: value })
          }
          error={formErrors.date}
        />
        <DropdownField
          options={
            workoutTypes
              ? workoutTypes.map((t) => ({ value: t.id, text: t.name }))
              : []
          }
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
        <Button type="submit" content="Save" icon="save" color="blue" />
      </Container>
    </Form>
  );
};

export default Summary;
