import React, { useState } from "react";
import { InputField, DropdownField } from "../../../components/FormFields";
import { exerciseTargets } from "./ExerciseTargets";
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  Grid,
} from "semantic-ui-react";
import toast from "react-hot-toast";

const TypeForm = ({ open, onCancel, onConfirm }) => {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");

  function handleCancel() {
    setName("");
    setTarget("");
    onCancel();
  }

  function handleSubmit() {
    if (!name || !target) {
      toast.error("Please add both an exercise name and primary muscle group.");
    } else {
      onConfirm(name, target);
      setName("");
    }
  }

  return (
    <Modal onClose={handleCancel} open={open}>
      <ModalHeader>Add New Exercise Type</ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Grid columns={2}>
            <InputField
              type="text"
              label="Exercise Name"
              value={name}
              onChange={(e, { value }) => setName(value)}
            />
            <DropdownField
              label="Primary Muscle Group"
              options={exerciseTargets.map((t) => ({
                text: t.name,
                value: t.id,
              }))}
              value={target}
              onChange={(e, { value }) => setTarget(value)}
            />
          </Grid>
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

export default TypeForm;
