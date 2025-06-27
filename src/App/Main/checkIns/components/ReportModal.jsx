import React, { useEffect, useState } from "react";
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  Container,
  Header,
  Input,
  Grid,
} from "semantic-ui-react";
import {
  PDFDownloadLink,
  usePDF,
  PDFViewer,
  pdf as reactPDF,
} from "@react-pdf/renderer";
import CheckInDoc from "./Pdf/CheckInDoc";
import { DateTime } from "luxon";
import Spinner from "../../components/Spinner";
import {
  getSupplementLogs,
  getSupplements,
} from "../../nutrition/supplements/actions";
import { getWeightLogs, getDietLogs } from "../../nutrition/actions";
import { getSleepLogs } from "../../sleep/actions";
import { sendPdfToCoach } from "../actions";
import { connect } from "react-redux";

const ReportModal = ({
  handleCloseModal,
  selectedDay,
  modalOpen,
  lastCheckIn,
  // from redux
  supplements,
  supplementsLoading,
  getSupplements,
  supplementLogs,
  supplementLogsLoading,
  getSupplementLogs,
  weightLogs,
  weightLogsLoading,
  getWeightLogs,
  sendPdfToCoach,
  user,
  sleepLogs,
  sleepLogsLoading,
  getSleepLogs,
  dietLogs,
  dietLogsLoading,
  getDietLogs,
}) => {
  const [pdf, update] = usePDF({ document: CheckInDoc({ selectedDay }) });
  const [coachNotes, setCoachNotes] = useState("");

  useEffect(() => {
    // if (!supplements && !supplementsLoading) getSupplements();
    // if (!supplementLogs && !supplementLogsLoading) getSupplementLogs();
    if (!weightLogs && !weightLogsLoading) getWeightLogs();
    if (!sleepLogs && !sleepLogsLoading) getSleepLogs();
    if (!dietLogs && !dietLogsLoading) getDietLogs();
  }, [
    supplements,
    supplementsLoading,
    supplementLogs,
    supplementLogsLoading,
    sleepLogs,
    sleepLogsLoading,
    dietLogs,
    dietLogsLoading,
  ]);

  useEffect(() => {
    if (!pdf.loading) update(CheckInDoc({ selectedDay }));
  });

  const dailyLogs = weightLogs
    ?.sort((a, b) => {
      const dateA = DateTime.fromISO(a.date);
      const dateB = DateTime.fromISO(b.date);
      return dateA - dateB;
    })
    .map((l) => ({
      date: l.date,
      weight: parseFloat(l.weight),
      steps: l.steps,
    }));

  const activeDietLog = dietLogs
    ?.filter((l) => {
      const today = DateTime.fromISO(selectedDay?.date).startOf("day");
      const dietLogDate = DateTime.fromISO(l.effectiveDate).startOf("day");
      return dietLogDate < today;
    })
    .sort((a, b) => {
      const dateA = DateTime.fromISO(a.effectiveDate);
      const dateB = DateTime.fromISO(b.effectiveDate);
      return dateB - dateA;
    })[0];

  const filename = `${user.name} ${selectedDay?.date} Check In`;

  const reportProps = {
    selectedDay,
    dailyLogs,
    lastCheckIn,
    supplements,
    supplementLogs,
    sleepLogs,
    activeDietLog,
  };

  async function handleSendPdf(reportPdf, filename, checkInId, message) {
    const blob = await reactPDF(reportPdf).toBlob();
    const formData = new FormData();
    formData.append("filename", filename);
    formData.append("checkInId", checkInId);
    formData.append("message", message);
    formData.append("file", blob, "test-name-report");
    // send pdf
    sendPdfToCoach(formData);
  }

  return (
    <Modal
      onClose={handleCloseModal}
      open={modalOpen === "true" ? true : false}
    >
      {(supplementsLoading || supplementLogsLoading || sleepLogsLoading) && (
        <Spinner />
      )}
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
        <Grid columns="2" doubling stackable>
          <Grid.Column>
            <Input
              placeholder="Add notes for coach email..."
              fluid
              value={coachNotes}
              onChange={(e, { value }) => setCoachNotes(value)}
            />
          </Grid.Column>
          <Grid.Column>
            <Button
              color="purple"
              icon="send"
              content="Email to Coach"
              onClick={() => {
                handleCloseModal();
                handleSendPdf(
                  <CheckInDoc {...reportProps} />,
                  filename,
                  selectedDay?.id,
                  coachNotes
                );
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
          </Grid.Column>
        </Grid>
      </ModalActions>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    supplements: state.supplements.supplements,
    supplementsLoading: state.supplements.supplementsLoading,
    supplementLogs: state.supplements.logs,
    supplementLogsLoading: state.supplements.logsLoading,
    weightLogs: state.nutrition.weightLogs,
    weightLogsLoading: state.nutrition.logsLoading,
    user: state.app.user,
    sleepLogs: state.sleep.logs,
    sleepLogsLoading: state.sleep.logsLoading,
    dietLogs: state.nutrition.dietLogs,
    dietLogsLoading: state.nutrition.dietLogsLoading,
  };
}

export default connect(mapStateToProps, {
  getSupplements,
  getSupplementLogs,
  getWeightLogs,
  sendPdfToCoach,
  getSleepLogs,
  getDietLogs,
})(ReportModal);
