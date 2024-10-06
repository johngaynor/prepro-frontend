import React, { useContext, useEffect } from "react";
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
import { PDFDownloadLink, usePDF, PDFViewer } from "@react-pdf/renderer";
import CheckInDoc from "./Pdf/ReportPdf";
import AppContext from "../../context/appContext";
import CheckInContext from "../context/checkInContext";
import { DateTime } from "luxon";

const ReportModal = ({
  handleCloseModal,
  selectedDay,
  modalOpen,
  lastCheckIn,
}) => {
  const [pdf, update] = usePDF({ document: CheckInDoc({ selectedDay }) });

  useEffect(() => {
    if (!pdf.loading) update(CheckInDoc({ selectedDay }));
  });

  const { user } = useContext(AppContext);
  const { sendPdfToCoach, dailyLogs } = useContext(CheckInContext);

  const logs = dailyLogs
    ?.sort((a, b) => {
      const dateA = DateTime.fromISO(a.date);
      const dateB = DateTime.fromISO(b.date);
      return dateA - dateB;
    })
    .map((l) => ({ date: l.date, weight: parseFloat(l.amWeight) }));

  const filename = `${user.name} ${selectedDay?.date} Check In`;

  const reportProps = {
    selectedDay,
    logs,
    lastCheckIn,
  };

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
          <PDFViewer showToolbar={true} style={{ width: "100%", height: 700 }}>
            <CheckInDoc {...reportProps} />
          </PDFViewer>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button
          color="purple"
          icon="send"
          content="Email to Coach"
          onClick={() => {
            handleCloseModal();
            sendPdfToCoach(<CheckInDoc {...reportProps} />, filename);
          }}
        />

        <PDFDownloadLink
          document={<CheckInDoc {...reportProps} />}
          fileName={filename}
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
