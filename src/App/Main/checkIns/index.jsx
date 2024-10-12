import React, { useContext, useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import CheckInContext, { CheckInProvider } from "./context/checkInContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DateTime } from "luxon";
import Spinner from "../components/Spinner";
import ViewCheckIn from "./components/ViewCheckIn";
import EditCheckIn from "./components/EditCheckIn";
import ReportModal from "./components/ReportModal";
import { connect } from "react-redux";

const CheckInLog = () => {
  const [editMode, setEditMode] = useState(false);
  const {
    checkIns,
    checkInsLoading,
    getCheckIns,
    templates,
    templatesLoading,
    getTemplates,
    editLoading,
    dailyLogs,
    logsLoading,
    getDailyLogs,
    getPoses,
    poses,
    posesLoading,
  } = useContext(CheckInContext);

  useEffect(() => {
    if (!checkIns && !checkInsLoading) getCheckIns();
    if (!templates && !templatesLoading) getTemplates();
    if (!dailyLogs && !logsLoading) getDailyLogs();
    if (!poses && !posesLoading) getPoses();
  }, [
    checkIns,
    checkInsLoading,
    templates,
    templatesLoading,
    dailyLogs,
    logsLoading,
    poses,
    posesLoading,
  ]);

  const { date } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const report = searchParams.get("report");

  // set the date in params if there isn't one given or if the date is invalid
  useEffect(() => {
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const currentDate = DateTime.now().toFormat("yyyy-MM-dd");
      navigate(`/checkins/${currentDate}?report=false`); // change these back to false
    }

    if (date && report !== "false" && report !== "true") {
      navigate(`/checkins/${date}?report=false`);
    }
  });

  const selectedDay = checkIns?.find((c) => c.date === date);
  const lastCheckIn = checkIns
    ?.filter((c) => {
      const today = DateTime.fromISO(date).startOf("day");
      const checkInDate = DateTime.fromISO(c.date).startOf("day");
      return checkInDate < today;
    })
    .sort((a, b) => {
      const dateA = DateTime.fromISO(a.date);
      const dateB = DateTime.fromISO(b.date);
      return dateB - dateA;
    })[0];

  function handleCloseReport() {
    navigate(`/checkins/${date}?report=false`);
  }

  return (
    <>
      {(checkInsLoading ||
        templatesLoading ||
        logsLoading ||
        editLoading ||
        posesLoading) && <Spinner />}
      {/* <ReportModal
        handleCloseModal={handleCloseReport}
        selectedDay={selectedDay}
        modalOpen={report}
        lastCheckIn={lastCheckIn}
      /> */}
      {selectedDay && !editMode ? (
        <ViewCheckIn selectedDay={selectedDay} setEditMode={setEditMode} />
      ) : (
        <EditCheckIn
          selectedDay={selectedDay}
          setEditMode={setEditMode}
          date={date}
          lastCheckIn={lastCheckIn}
        />
      )}
    </>
  );
};

const CheckInLogs = () => {
  return (
    <CheckInProvider>
      <CheckInLog />
    </CheckInProvider>
  );
};

export default CheckInLogs;

// function mapStateToProps(state) {
//   return {
//     checkIns: state.checkIns.checkIns,
//     checkInsLoading: state.checkIns.checkInsLoading,
//     templates: state.checkIns.templates,
//     templatesLoading: state.checkIns.templatesLoading,
//     dailyLogs: state.checkIns.dailyLogs,
//     logsLoading: state.checkIns.logsLoading,
//     commentary: state.checkIns.commentary,
//     commentaryLoading: state.checkIns.commentaryLoading,
//     commentaryId: state.checkIns.commentaryId,
//   };
// }

// export default connect(mapStateToProps)(CheckInLogs);
