import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Container } from "semantic-ui-react";
import { InputField } from "../../components/FormFields";

const defaultValues = {
  weight: "",
};

const EditCheckIn = ({ selectedDay, setEditMode, date }) => {
  const [formValues, setFormValues] = useState(defaultValues);
  // const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (selectedDay) {
      setFormValues(selectedDay);
    }
  }, [selectedDay]);

  const navigate = useNavigate();

  return (
    <>
      <Grid stackable columns={3} style={{ marginBottom: "10px" }}>
        <InputField
          type="date"
          label="Date"
          value={date || ""}
          onChange={(e, { value }) => navigate(`/checkins/${value}`)}
        />
        <InputField
          label="Weight"
          type="number"
          value={formValues.weight}
          onChange={(e, { value }) =>
            setFormValues({
              ...formValues,
              weight: value,
            })
          }
        />
        {/* <ViewInput
            value={DateTime.fromFormat(
              selectedWorkout.timeStarted,
              "HH:mm:ss"
            ).toFormat("hh:mm a")}
            label="Time Started"
          /> */}
      </Grid>
      {/* <Container
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            type="button"
            content="Edit"
            icon="pencil"
            color="orange"
            onClick={() => setEditMode(true)}
          />
        </Container> */}
    </>
  );
};

export default EditCheckIn;
