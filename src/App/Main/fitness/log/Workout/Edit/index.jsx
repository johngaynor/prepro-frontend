import React from "react";
import StartPage from "../components/Start";
import EndPage from "../components/End";
import Exercise from "../components/Exercise";
import Pagination from "../../../../components/Pagination";

const EditWorkout = ({
  workout,
  activeIndex,
  setActiveIndex,
  template,
  lastWorkout,
}) => {
  const pages = [
    { name: "Start", component: <StartPage workout={workout} />, workout },
    ...(workout
      ? workout.exercises
          .sort((a, b) => a.orderId - b.orderId)
          .map((e, index) => ({
            name: e.id,
            exercise: e,
            component: (
              <Exercise
                exercise={e}
                index={index}
                template={template}
                lastWorkout={lastWorkout}
              />
            ),
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
      {pages[activeIndex || 0].component}
      <Pagination
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        data={pages}
      />
    </div>
  );
};

export default EditWorkout;
