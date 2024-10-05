import React, { useState } from "react";
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  Container,
  Header,
  Form,
} from "semantic-ui-react";
import { TextAreaField } from "../../../../../components/FormFields";

const MissedModal = ({
  handleClose,
  missedItem,
  selectedDay,
  addMissedSupplement,
}) => {
  const [reason, setReason] = useState("");

  const handleCloseModal = () => {
    setReason("");
    handleClose();
  };

  return (
    <Modal onClose={handleCloseModal} open={!!missedItem}>
      <ModalHeader>
        <Container style={{ display: "flex", justifyContent: "space-between" }}>
          <Header>Report Missed Supplement</Header>
          <Button color="red" onClick={handleCloseModal} icon="cancel" />
        </Container>
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Header as="h5">
            Please provide the reason for missing this supplement. Please be
            honest as this allows us to identify pain points and help find
            solutions!
          </Header>
          <Form>
            <TextAreaField
              value={reason}
              onChange={(e, { value }) => setReason(value)}
              label="Reason"
            />
          </Form>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        Note: once you submit a missed supplement, it cannot be undone.
        <Button
          color="green"
          icon="check"
          content="Submit"
          onClick={() => {
            handleCloseModal();
            addMissedSupplement(missedItem, selectedDay, reason);
          }}
        />
      </ModalActions>
    </Modal>
  );
};

export default MissedModal;
