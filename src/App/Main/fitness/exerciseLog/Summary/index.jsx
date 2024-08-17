import React from "react";
import FitnessContext from "../../Context/fitnessContext";
import { useParams } from "react-router-dom";
import { DateTime } from "luxon";
import ViewSummary from "./ViewSummary";
import EditSummary from "./EditSummary";

const Summary = ({ setActiveTab, editMode, setEditMode }) => {
  const { date } = useParams();

  const { workoutLogs } = React.useContext(FitnessContext);

  const rawDate = DateTime.fromISO(date).toUTC().toISO();
  const selectedLog = workoutLogs?.find((l) => l.date === rawDate);

  if (selectedLog && !editMode) {
    return <ViewSummary selectedLog={selectedLog} setEditMode={setEditMode} />;
  } else {
    return (
      <EditSummary
        selectedLog={selectedLog}
        setEditMode={setEditMode}
        setActiveTab={setActiveTab}
        date={date}
      />
    );
  }
};

export default Summary;
