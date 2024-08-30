import React, { useEffect, useState, useContext } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import Summary from "./Summary";
import Exercises from "./Exercises";
import FitnessContext, { FitnessProvider } from "../context/fitnessContext";
import Spinner from "../../components/Spinner";
import { useParams, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

const Log = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [editMode, setEditMode] = useState(false);

  const {
    editLoading,
    exerciseTypes,
    exerciseTypesLoading,
    getExerciseTypes,
    workoutLogs,
    logsLoading,
    getWorkoutLogs,
    workoutTemplates,
    templatesLoading,
    getWorkoutTemplates,
  } = useContext(FitnessContext);

  useEffect(() => {
    if (!exerciseTypes && !exerciseTypesLoading) getExerciseTypes();
    if (!workoutLogs && !logsLoading) getWorkoutLogs();
    if (!workoutTemplates && !templatesLoading) getWorkoutTemplates();
  }, [
    exerciseTypes,
    exerciseTypesLoading,
    workoutLogs,
    logsLoading,
    workoutTemplates,
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

  const selectedWorkout = workoutLogs?.find((l) => l.date === date);

  return (
    <React.Fragment>
      <Accordion fluid styled>
        {(logsLoading || editLoading) && <Spinner />}
        <Accordion.Title
          active={activeTab === 1}
          onClick={() => {
            if (activeTab !== 1) {
              setActiveTab(1);
            } else setActiveTab(null);
          }}
        >
          <Icon name="dropdown" />
          Workout Information
        </Accordion.Title>
        <Accordion.Content active={activeTab === 1}>
          <Summary
            selectedWorkout={selectedWorkout}
            setActiveTab={setActiveTab}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        </Accordion.Content>
        {!editMode && selectedWorkout && (
          <>
            <Accordion.Title
              active={activeTab === 2}
              onClick={() => {
                if (activeTab !== 2) {
                  setActiveTab(2);
                } else setActiveTab(null);
              }}
            >
              <Icon name="dropdown" />
              Workout Exercises
            </Accordion.Title>
            <Accordion.Content active={activeTab === 2}>
              <Exercises selectedWorkout={selectedWorkout} />
            </Accordion.Content>
          </>
        )}
      </Accordion>
    </React.Fragment>
  );
};

const ExerciseLog = () => {
  return (
    <FitnessProvider>
      <Log />
    </FitnessProvider>
  );
};

export default ExerciseLog;
