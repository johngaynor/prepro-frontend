import React, { useContext, useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import CheckInContext, { CheckInProvider } from "./context/checkInContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DateTime } from "luxon";
import Spinner from "../components/Spinner";
import ViewCheckIn from "./components/ViewCheckIn";
import EditCheckIn from "./components/EditCheckIn";
import ReportModal from "./components/ReportModal";

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
  } = useContext(CheckInContext);

  useEffect(() => {
    if (!checkIns && !checkInsLoading) getCheckIns();
    if (!templates && !templatesLoading) getTemplates();
  }, [checkIns, checkInsLoading, templates, templatesLoading]);

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
  const template = templates?.find((t) => t.isDefault);

  function handleCloseReport() {
    navigate(`/checkins/${date}?report=false`);
  }

  return (
    <Segment>
      {(checkInsLoading || templatesLoading || editLoading) && <Spinner />}
      <ReportModal
        handleCloseModal={handleCloseReport}
        selectedDay={selectedDay}
        modalOpen={report}
      />

      {selectedDay && !editMode ? (
        <ViewCheckIn selectedDay={selectedDay} setEditMode={setEditMode} />
      ) : (
        <EditCheckIn
          selectedDay={selectedDay}
          template={template}
          setEditMode={setEditMode}
          date={date}
        />
      )}
    </Segment>
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
