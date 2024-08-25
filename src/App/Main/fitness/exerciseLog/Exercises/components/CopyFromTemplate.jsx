import React, { useContext, useState } from "react";
import { DropdownField } from "../../../../components/FormFields";
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
import toast from "react-hot-toast";

const CopyFromTemplate = ({ open, setOpen, selectedWorkout }) => {
  const [template, setTemplate] = useState("");

  const { workoutTemplates, copyWorkoutFromTemplate } =
    useContext(FitnessContext);

  function handleConfirm() {
    if (!template) {
      toast.error("No template selected to copy.");
    } else {
      copyWorkoutFromTemplate(selectedWorkout.id, template);
      handleCancel();
    }
  }

  function handleCancel() {
    setTemplate("");
    setOpen(false);
  }
  return (
    <Modal onClose={handleCancel} open={open}>
      <ModalHeader>Copy Workout from Template</ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form>
            <Grid>
              <DropdownField
                fullWidth
                label="Template"
                options={workoutTemplates?.map((t) => ({
                  text: t.name,
                  value: t.id,
                }))}
                value={template}
                onChange={(e, { value }) => setTemplate(value)}
                search
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

export default CopyFromTemplate;
