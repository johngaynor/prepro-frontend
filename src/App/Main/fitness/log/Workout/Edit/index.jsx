import React from "react";
import StartPage from "../components/Start";
import EndPage from "../components/End";
import Exercise from "../components/Exercise";
import Pagination from "../../../../components/Pagination";

const EditWorkout = ({ workout, activeIndex, setActiveIndex }) => {
  const pages = [
    { name: "Start", component: <StartPage workout={workout} />, workout },
    ...(workout
      ? workout.exercises
          .sort((a, b) => a.orderId - b.orderId)
          .map((e, index) => ({
            name: e.id,
            exercise: e,
            component: <Exercise exercise={e} index={index} />,
          }))
      : []),
    { name: "End", component: <EndPage workout={workout} />, workout },
  ];

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {pages[activeIndex].component}
      <Pagination
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        data={pages}
      />
    </div>
  );
};

export default EditWorkout;
