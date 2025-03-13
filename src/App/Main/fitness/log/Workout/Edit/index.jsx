import React from "react";
import Summary from "../components/Summary";
import Exercise from "../components/Exercise";
import Pagination from "../../../../components/Pagination";

const EditWorkout = ({ workout, activeIndex, setActiveIndex }) => {
  const pages = [
    { name: "Start", component: <Summary workout={workout} /> },
    ...(workout
      ? workout.exercises
          .sort((a, b) => a.orderId - b.orderId)
          .map((e) => ({
            name: e.id,
            exercise: e,
            component: <Exercise exercise={e} />,
          }))
      : []),
  ];

  //   console.log(pages);

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
