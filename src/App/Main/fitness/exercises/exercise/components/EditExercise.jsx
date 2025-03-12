import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Button, Container, Form, Segment } from "semantic-ui-react";
import { editExerciseType } from "../../../actions";
import { cloneDeep } from "lodash";

const EditExercise = ({ editExerciseType, activeExercise }) => {
  const [formValues, setFormValues] = useState({
    id: 0,
    name: "",
    target: 0,
  });

  const defaultValues = { id: null, name: "" };

  useEffect(() => {
    if (activeExercise) {
      setFormValues(cloneDeep(activeExercise));
    }
  }, [activeExercise]);
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(EditExercise);
