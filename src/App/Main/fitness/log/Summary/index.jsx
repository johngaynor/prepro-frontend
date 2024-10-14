import React from "react";
import { useParams } from "react-router-dom";
import ViewSummary from "./ViewSummary";
import EditSummary from "./EditSummary";

const Summary = ({ selectedWorkout, setActiveTab, editMode, setEditMode }) => {
  const { date } = useParams();

  if (selectedWorkout && !editMode) {
    return (
      <ViewSummary
        selectedWorkout={selectedWorkout}
        setEditMode={setEditMode}
      />
    );
  } else {
    return (
      <EditSummary
        selectedWorkout={selectedWorkout}
        setEditMode={setEditMode}
        setActiveTab={setActiveTab}
        date={date}
      />
    );
  }
};

export default Summary;
