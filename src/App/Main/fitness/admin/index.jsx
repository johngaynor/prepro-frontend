import React from "react";
import Tab from "../../components/Tab";
import Exercises from "./tabs/Exercises";
import Gyms from "./tabs/Gyms";
import Workouts from "./tabs/Workouts";

const FitnessLogAdmin = () => {
  const mainPanes = [
    {
      menuItem: "Manage Workouts",
      render: () => {
        return <Workouts />;
      },
    },
    {
      menuItem: "Manage Exercises",
      render: () => {
        return <Exercises />;
      },
    },

    {
      menuItem: "Manage Gyms",
      render: () => {
        return <Gyms />;
      },
    },
  ];
  return <Tab panes={mainPanes} />;
};

export default FitnessLogAdmin;
