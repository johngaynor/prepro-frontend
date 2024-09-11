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
import CheckInDoc from "./ReportPdf";
import AppContext from "../../context/appContext";

const ReportModal = ({ handleCloseModal, selectedDay, modalOpen }) => {
  const [pdf, update] = usePDF({ document: CheckInDoc({ selectedDay }) });

  useEffect(() => {
    if (!pdf.loading) update(CheckInDoc({ selectedDay }));
  });

  const { user } = useContext(AppContext);

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
            <CheckInDoc selectedDay={selectedDay} />
          </PDFViewer>
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
          fileName={`${user.name} ${selectedDay?.date} Check In`}
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