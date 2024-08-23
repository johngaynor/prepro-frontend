import React from "react";
import { FitnessProvider } from "../Context/fitnessContext";
import Tab from "../../components/Tab";
import Exercises from "./tabs/Exercises";
import Gyms from "./tabs/Gyms";
import Workouts from "./tabs/Workouts";

const ExerciseManager = () => {
  const mainPanes = [
    {
      menuItem: "Manage Exercises",
      render: () => {
        return <Exercises />;
      },
    },
    {
      menuItem: "Manage Workouts",
      render: () => {
        return <Workouts />;
      },
    },
    {
      menuItem: "Manage Gyms",
      render: () => {
        return <Gyms />;
      },
    },
  ];
  return (
    <FitnessProvider>
      <Tab panes={mainPanes} />
    </FitnessProvider>
  );
};

export default ExerciseManager;
