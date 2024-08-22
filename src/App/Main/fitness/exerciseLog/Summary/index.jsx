import React from "react";
import FitnessContext from "../../Context/fitnessContext";
import { useParams } from "react-router-dom";
import { DateTime } from "luxon";
import ViewSummary from "./ViewSummary";
import EditSummary from "./EditSummary";

const Summary = ({ setActiveTab, editMode, setEditMode }) => {
  const { date } = useParams();

  const { workoutSummaries } = React.useContext(FitnessContext);

  const rawDate = DateTime.fromISO(date).toUTC().toISO();
  const selectedSummary = workoutSummaries?.find((l) => l.date === rawDate);

  if (selectedSummary && !editMode) {
    return (
      <ViewSummary
        selectedSummary={selectedSummary}
        setEditMode={setEditMode}
      />
    );
  } else {
    return (
      <EditSummary
        selectedSummary={selectedSummary}
        setEditMode={setEditMode}
        setActiveTab={setActiveTab}
        date={date}
      />
    );
  }
};

export default Summary;
