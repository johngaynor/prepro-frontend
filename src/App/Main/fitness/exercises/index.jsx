import React from "react";
import { FitnessProvider } from "../Context/fitnessContext";
import Tab from "../../components/Tab";
import Exercises from "./tabs/Exercises";

const ExerciseManager = () => {
  const mainPanes = [
    {
      menuItem: "Manage Exercises",
      render: () => {
        return <Exercises />;
      },
    },
    // {
    //   menuItem: "Manage Gyms",
    //   render: () => {
    //     return <Gyms />;
    //   },
    // },
  ];
  return (
    <FitnessProvider>
      <Tab panes={mainPanes} />
    </FitnessProvider>
  );
};

export default ExerciseManager;
