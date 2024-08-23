import React, { useContext, useState } from "react";
import {
  DropdownField,
  InputField,
  TextAreaField,
} from "../../../../components/FormFields";
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
import FitnessContext from "../../../Context/fitnessContext";

const defaultValues = {
  exerciseId: null,
  restTime: "",
  comments: "",
  sets: [],
};

const NewExercise = ({ open, onCancel }) => {
  const [formValues, setFormValues] = useState({
    exerciseId: null,
    restTime: "",
    comments: "",
    sets: [],
  });

  const { exerciseTypes } = useContext(FitnessContext);

  function handleCancel() {
    setFormValues(defaultValues);
    onCancel();
  }

  function handleConfirm() {
    setFormValues(defaultValues);
    onCancel();
  }
  return (
    <Modal onClose={handleCancel} open={open}>
      <ModalHeader>Add New Exercise Type</ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form>
            <Grid columns={2}>
              <DropdownField
                label="Exercise"
                options={exerciseTypes?.map((e) => ({
                  text: e.name,
                  value: e.id,
                }))}
                value={formValues.exerciseId}
                onChange={(e, { value }) =>
                  setFormValues({ ...formValues, exerciseId: value })
                }
                search
              />
              <InputField
                label="Rest Time"
                value={formValues.restTime}
                onChange={(e, { value }) =>
                  setFormValues({ ...formValues, restTime: value })
                }
              />
              <TextAreaField
                label="comments"
                value={formValues.comments}
                onChange={(e, { value }) =>
                  setFormValues({ ...formValues, comments: value })
                }
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
          onClick={handleConfirm}
          positive
        />
      </ModalActions>
    </Modal>
  );
};

export default NewExercise;
