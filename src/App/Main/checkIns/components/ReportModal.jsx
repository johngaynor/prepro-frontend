import React, { useContext, useState, useEffect } from "react";
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  Container,
  Header,
} from "semantic-ui-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportPdf, { CheckInDoc } from "./ReportPdf";

const ReportModal = ({ handleCloseModal, selectedDay, modalOpen }) => {
  return (
    <Modal
      onClose={handleCloseModal}
      open={modalOpen === "true" ? true : false}
    >
      <ModalHeader>
        <Container style={{ display: "flex", justifyContent: "space-between" }}>
          <Header>Check In Report</Header>
          <Button color="red" onClick={handleCloseModal} icon="cancel" />
        </Container>
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <ReportPdf selectedDay={selectedDay} />
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button
          color="purple"
          icon="send"
          content="Email to Coach"
          //   onClick={() => {
          //     handleChangePosition("down", exercise);
          //     handleCloseModal();
          //   }}
        />

        <PDFDownloadLink
          document={<CheckInDoc selectedDay={selectedDay} />}
          fileName={`Summary - `}
          className="ui yellow button"
        >
          <i aria-hidden="true" className={"download icon"} />
          Download PDF
        </PDFDownloadLink>
      </ModalActions>
    </Modal>
  );
};

export default ReportModal;
