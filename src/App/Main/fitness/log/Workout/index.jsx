import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import Pagination from "../../components/Pagination";

const WorkoutTab = (id) => {
  return (
    <Segment
      style={{
        height: "90%",
        width: "90vw",
        maxWidth: 800,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Workout {id}</h1>
    </Segment>
  );
};

const Workout = ({ activeWorkout }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  //   console.log(activeWorkout);

  const pages = activeWorkout.exercises.map((e, i) => (
    <WorkoutTab id={i} key={i} />
  ));

  return (
    <Segment
      style={{
        height: "90%",
        width: "90vw",
        maxWidth: 800,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Button
        onClick={() =>
          setActiveIndex(activeIndex < pages.length - 1 ? activeIndex + 1 : 0)
        }
      >
        Next
      </Button>
      <Pagination
        data={pages}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </Segment>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(Workout);
