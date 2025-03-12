import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Card, Segment, Input, Transition } from "semantic-ui-react";
import { getExerciseTypes } from "../actions";
import { Link } from "react-router-dom";

const ExerciseDatabase = ({
  exerciseTypes,
  exerciseTypesLoading,
  getExerciseTypes,
}) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!exerciseTypes && !exerciseTypesLoading) getExerciseTypes();
  }, [exerciseTypes, exerciseTypesLoading]);

  return (
    <React.Fragment>
      <Input
        style={{ marginTop: 25 }}
        value={search}
        onChange={(e, { value }) => setSearch(value)}
        placeholder="Search..."
        icon="search"
        fluid
      />
      {exerciseTypes ? (
        <Transition.Group
          as={Card.Group}
          duration={300}
          animation="fade"
          className="ui centered relaxed grid container"
          style={{ width: "90%", marginTop: 25 }}
          itemsPerRow={window.innerWidth > 600 ? 4 : null}
        >
          {exerciseTypes &&
            exerciseTypes
              .filter((e) =>
                e.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((exercise) => (
                <Card
                  link
                  style={{ height: "10rem", margin: 5 }}
                  key={exercise.id}
                >
                  <Link
                    to={`/TEST/exercise/${exercise.id}`}
                    key={exercise.id}
                    style={{ margin: 0, padding: 0 }}
                    className="appTile"
                  >
                    <Card>
                      <Card.Content style={{ height: "10rem" }}>
                        <Card.Header>{exercise.name}</Card.Header>
                        <Card.Description style={{ margin: 0 }}>
                          ...
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </Link>
                </Card>
              ))}
        </Transition.Group>
      ) : (
        <Segment basic textAlign="center">
          No exercises found with your search parameters...
        </Segment>
      )}
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    exerciseTypes: state.fitness.exerciseTypes,
    exerciseTypesLoading: state.fitness.typesLoading,
  };
}

export default connect(mapStateToProps, { getExerciseTypes })(ExerciseDatabase);
