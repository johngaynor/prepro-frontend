import React from "react";
import { Accordion, Icon } from "semantic-ui-react";
import Summary from "./Summary";
import Exercises from "./Exercises";
import FitnessContext from "../../Context/fitnessContext";
import Spinner from "../../../components/Spinner";

const Log = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const { workoutTypes, workoutTypesLoading, getWorkoutTypes } =
    React.useContext(FitnessContext);

  React.useEffect(() => {
    if (!workoutTypes && !workoutTypesLoading) getWorkoutTypes();
  }, []);

  return (
    <React.Fragment>
      <Accordion fluid styled>
        {workoutTypesLoading && <Spinner />}
        <Accordion.Title
          active={activeTab === 0}
          onClick={() => {
            if (activeTab !== 0) {
              setActiveTab(0);
            } else setActiveTab(null);
          }}
        >
          <Icon name="dropdown" />
          Workout Information
        </Accordion.Title>
        <Accordion.Content active={activeTab === 0}>
          <Summary setActiveTab={setActiveTab} />
        </Accordion.Content>
        <Accordion.Title
          active={activeTab === 1}
          onClick={() => {
            if (activeTab !== 1) {
              setActiveTab(1);
            } else setActiveTab(null);
          }}
        >
          <Icon name="dropdown" />
          Workout Exercises
        </Accordion.Title>
        <Accordion.Content active={activeTab === 1}>
          <Exercises />
        </Accordion.Content>
      </Accordion>
    </React.Fragment>
  );
};

export default Log;
