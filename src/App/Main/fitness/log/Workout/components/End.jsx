import React, { useState } from "react";
import { Segment, Form, Grid, Container, Button } from "semantic-ui-react";
import { InputField, TextAreaField } from "../../../../components/FormFields";

const EndPage = ({ workout }) => {
  const [formValues, setFormValues] = useState({ ...workout });

  return (
    <Segment
      style={{
        height: "90%",
        width: "90vw",
        maxWidth: 800,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Form
        onSubmit={() => {
          // const valid = validateForm(formValues);
          // if (valid) {
          //   setFormErrors({});
          //   editWorkoutSummary({ ...formValues, date });

          //   if (selectedWorkout) {
          //     setEditMode(false);
          //   } else {
          //     setActiveTab(2);
          //   }
          // }
          console.log("submitting");
        }}
      >
        {/* {editLoading && <Spinner />} */}
        <Grid stackable columns={3} style={{ marginBottom: "10px" }}>
          <InputField
            type="date"
            label="Date"
            value={workout.date}
            onChange={(e, { value }) => navigate(`/fitness/log/${value}`)}
          />
          <InputField
            type="time"
            label="Time Started"
            value={formValues.timeStarted}
            onChange={(e, { value }) =>
              setFormValues({ ...formValues, timeStarted: value })
            }
            // error={formErrors.timeStarted}
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
          <Button
            type="button"
            icon="trash"
            color="red"
            onClick={() => {
              // deleteWorkoutSummary(selectedWorkout.id);
              // setFormValues(defaultValues);
              console.log("deleting");
            }}
          />
        </Container>
      </Form>
    </Segment>
  );
};

export default EndPage;
