import React, { useState } from "react";
import { InputField } from "../../../components/FormFields";

import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Modal,
} from "semantic-ui-react";

const TypeForm = ({ open, onCancel, onConfirm }) => {
  const [name, setName] = useState("");
  return (
    <Modal
      onClose={() => {
        setName("");
        onCancel();
      }}
      open={open}
    >
      <ModalHeader>Add New Exercise Type</ModalHeader>
      <ModalContent>
        <ModalDescription>
          <InputField
            placeholder="Exercise Name..."
            value={name}
            onChange={(e, { value }) => setName(value)}
          />
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button color="red" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={() => onConfirm(name)}
          positive
        />
      </ModalActions>
    </Modal>
  );
};

export default TypeForm;
