import React from "react";
import { Accordion, Icon } from "semantic-ui-react";
import Summary from "./Summary";
import Exercises from "./Exercises";

const ExerciseLog = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <React.Fragment>
      <Accordion fluid styled>
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
          <Summary />
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

export default ExerciseLog;
