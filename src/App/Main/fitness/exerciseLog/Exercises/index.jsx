import React from "react";
import { Grid, Form, Button, Container } from "semantic-ui-react";
import {
  InputField,
  TextAreaField,
  DropdownField,
} from "../../../components/FormFields";
import { exerciseTypes } from "../../components/dropdownOptions";
import toast from "react-hot-toast";

const Exercises = () => {
  const [formValues, setFormValues] = React.useState({
    comments: "",
    type: "",
    timeStarted: "",
    timeCompleted: "",
  });
  const [formErrors, setFormErrors] = React.useState({});

  function validateForm(vals) {
    const errors = {
      type: false,
      timeStarted: false,
      timeCompleted: false,
    };
    if (!vals.type) errors.type = "Please select a valid option.";
    if (!vals.timeStarted)
      errors.timeStarted = "Please enter the time you started the workout.";
    if (!vals.timeCompleted)
      errors.timeCompleted = "Please enter the time you ended the workout.";

    if (errors.type || errors.timeStarted || errors.timeCompleted) {
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
          toast.success("Valid form entries!");
          setFormErrors({});
          // do whatever submissions
        }
      }}
    >
      <Grid stackable columns={3} style={{ marginBottom: "10px" }}>
        <DropdownField
          options={exerciseTypes}
          label="Workout Type"
          value={formValues.type}
          onChange={(e, { value }) =>
            setFormValues({ ...formValues, type: value })
          }
          error={formErrors.type}
        />
        <InputField
          type="time"
          label="Time Started"
          onChange={(e, { value }) =>
            setFormValues({ ...formValues, timeStarted: value })
          }
          error={formErrors.timeStarted}
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

export default Exercises;
