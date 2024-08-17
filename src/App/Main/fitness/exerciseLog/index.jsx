import React, { useEffect } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import Summary from "./Summary";
import Exercises from "./Exercises";
import FitnessContext, { FitnessProvider } from "../Context/fitnessContext";
import Spinner from "../../components/Spinner";
import { useParams, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

const Log = () => {
  const [activeTab, setActiveTab] = React.useState(1);
  const [editMode, setEditMode] = React.useState(1);

  const {
    workoutTypes,
    workoutTypesLoading,
    getWorkoutTypes,
    workoutLogs,
    logsLoading,
    getWorkoutLogs,
  } = React.useContext(FitnessContext);

  useEffect(() => {
    getWorkoutLogs();
  }, []);

  console.log(workoutLogs);

  React.useEffect(() => {
    if (!workoutTypes && !workoutTypesLoading) getWorkoutTypes();
  }, [workoutTypes]);

  const { date } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!date) {
      const currentDate = DateTime.now().toFormat("yyyy-MM-dd");
      navigate(`/fitness/log/${currentDate}`);
    }
  });

  return (
    <React.Fragment>
      <Accordion fluid styled>
        {workoutTypesLoading && <Spinner />}
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
          <Summary setActiveTab={setActiveTab} />
        </Accordion.Content>
        {/* exercise section */}
        {!editMode && editMode !== 2 && (
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
              <Exercises editMode={editMode} setEditMode={setEditMode} />
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
