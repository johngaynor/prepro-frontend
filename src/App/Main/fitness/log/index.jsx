import React, { useEffect, useState } from "react";
import { Accordion, Icon, Segment } from "semantic-ui-react";
import Summary from "./Summary";
import Exercises from "./Exercises";
import Spinner from "../../components/Spinner";
import { useParams, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { connect } from "react-redux";
import {
  getWorkoutLogs,
  getExerciseTypes,
  getWorkoutTemplates,
} from "../actions";

// pages
import LandingPage from "./LandingPage";

const FitnessLog = ({
  workoutLogs,
  logsLoading,
  getWorkoutLogs,
  exerciseTypes,
  exerciseTypesLoading,
  getExerciseTypes,
  templates,
  templatesLoading,
  getWorkoutTemplates,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!exerciseTypes && !exerciseTypesLoading) getExerciseTypes();
    if (!workoutLogs && !logsLoading) getWorkoutLogs();
    if (!templates && !templatesLoading) getWorkoutTemplates();
  }, [
    exerciseTypes,
    exerciseTypesLoading,
    workoutLogs,
    logsLoading,
    templates,
    templatesLoading,
  ]);

  const { date } = useParams();
  const navigate = useNavigate();

  // set the date in params if there isn't one given or if the date is invalid
  useEffect(() => {
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const currentDate = DateTime.now().toFormat("yyyy-MM-dd");
      navigate(`/fitness/log/${currentDate}`);
    }
  });

  const activeWorkout = workoutLogs?.find((l) => l.date === date);
  const lastWorkout = workoutLogs
    ?.filter(
      (l) =>
        l.workoutTemplateId === activeWorkout?.workoutTemplateId &&
        l.date !== activeWorkout.date
    )
    .sort((a, b) => {
      const dateA = DateTime.fromISO(a.date);
      const dateB = DateTime.fromISO(b.date);
      return dateB - dateA;
    })[0];

  console.log(activeWorkout);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Segment
        style={{
          height: "90%",
          width: "90vw",
          maxWidth: 800,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {activeWorkout ? (
          <React.Fragment>
            <Accordion fluid styled>
              {logsLoading && <Spinner />}
              <Accordion.Title
                active={activeTab === 1 || !activeWorkout}
                onClick={() => {
                  if (activeTab !== 1) {
                    setActiveTab(1);
                  } else setActiveTab(null);
                }}
              >
                <Icon name="dropdown" />
                Workout Information
              </Accordion.Title>
              <Accordion.Content active={activeTab === 1 || !activeWorkout}>
                <Summary
                  selectedWorkout={activeWorkout}
                  setActiveTab={setActiveTab}
                  editMode={editMode}
                  setEditMode={setEditMode}
                />
              </Accordion.Content>
            </Accordion>
            {!editMode && activeWorkout && (
              <Exercises
                selectedWorkout={activeWorkout}
                lastWorkout={lastWorkout}
              />
            )}
          </React.Fragment>
        ) : (
          <LandingPage />
        )}
      </Segment>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    workoutLogs: state.fitness.workoutLogs,
    logsLoading: state.fitness.logsLoading,
    exerciseTypes: state.fitness.exerciseTypes,
    exerciseTypesLoading: state.fitness.typesLoading,
    templates: state.fitness.templates,
    templatesLoading: state.fitness.templatesLoading,
  };
}

export default connect(mapStateToProps, {
  getWorkoutLogs,
  getExerciseTypes,
  getWorkoutTemplates,
})(FitnessLog);
