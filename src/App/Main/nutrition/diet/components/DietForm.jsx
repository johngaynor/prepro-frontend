import React, { useState, useEffect } from "react";
import { InputField, TextAreaField } from "../../../components/FormFields";
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  Grid,
  Form,
} from "semantic-ui-react";
import toast from "react-hot-toast";
import { DateTime } from "luxon";
import { cloneDeep } from "lodash";

const defaultValues = {
  effectiveDate: DateTime.now().toISODate(),
  protein: "",
  carbs: "",
  fat: "",
  cardio: "",
};

const DietForm = ({ open, onCancel, onConfirm, log }) => {
  const [formValues, setFormValues] = useState(defaultValues);

  useEffect(() => {
    if (log) {
      setFormValues(cloneDeep(log));
    }
  }, [log]);

  function handleCancel() {
    setFormValues(defaultValues);
    onCancel();
  }

  function handleSubmit() {
    if (
      !formValues.effectiveDate ||
      !formValues.protein ||
      !formValues.carbs ||
      !formValues.fat ||
      !formValues.cardio
    ) {
      toast.error("Please add all required fields to proceed.");
    } else {
      onConfirm(formValues);
      handleCancel();
    }
  }

  function handleChange(e, { name, value }) {
    setFormValues({ ...formValues, [name]: value });
  }

  return (
    <Modal onClose={handleCancel} open={open}>
      <ModalHeader>Add New Diet Log</ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <Grid columns={2}>
              <InputField
                type="date"
                label="Effective Date"
                name="effectiveDate"
                value={formValues.effectiveDate || ""}
                onChange={handleChange}
              />
              <InputField
                type="number"
                label="Protein"
                name="protein"
                value={formValues.protein || ""}
                onChange={handleChange}
              />
              <InputField
                type="number"
                label="Carbs"
                name="carbs"
                value={formValues.carbs || ""}
                onChange={handleChange}
              />
              <InputField
                type="number"
                label="Fat"
                name="fat"
                value={formValues.fat || ""}
                onChange={handleChange}
              />
              <TextAreaField
                label="Cardio (style, duration, number of times per week)"
                name="cardio"
                value={formValues.cardio || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Form>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button color="red" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={handleSubmit}
          positive
        />
      </ModalActions>
    </Modal>
  );
};

export default DietForm;
