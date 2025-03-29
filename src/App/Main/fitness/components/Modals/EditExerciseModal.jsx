import React, { useState, useEffect } from "react";
import {
  DropdownField,
  InputField,
  TextAreaField,
} from "../../../components/FormFields";
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  Grid,
  Form,
  Label,
  Container,
  Header,
} from "semantic-ui-react";
import { cloneDeep } from "lodash";
import { connect } from "react-redux";

const defaultValues = {
  exerciseId: "",
  restTime: "",
  instructions: "",
  sets: [{ weight: "", reps: "" }],
};

const EditExerciseModal = ({
  modalOpen,
  setModalOpen,
  exercise,
  setActiveExercise,
  handleSubmit,
  handleDelete,
  handleChangePosition,
  parentId,
  prevExercise,
  exerciseTypes,
}) => {
  const [formValues, setFormValues] = useState(defaultValues);

  useEffect(() => {
    if (exercise) {
      setFormValues(cloneDeep(exercise)); // make a deep clone to avoid mutating original object
    }
  }, [exercise]);

  function handleCloseModal() {
    setModalOpen(false);
    setActiveExercise(null);
    setFormValues(defaultValues);
  }

  function handleSubmitModal() {
    // add in validation later
    handleSubmit({
      ...formValues,
      parentId,
    });
    handleCloseModal(); // close modal afterwards
  }

  function handleDeleteModal(id) {
    handleDelete(id);
    handleCloseModal(); // close modal afterwards
  }

  function copyFromLastWorkout(i, weight, reps) {
    const newSets = [...formValues.sets];
    newSets[i].reps = reps;
    newSets[i].weight = weight;
    setFormValues({ ...formValues, sets: newSets });
  }

  return (
    <Modal onClose={handleCloseModal} open={modalOpen}>
      <ModalHeader>
        <Container style={{ display: "flex", justifyContent: "space-between" }}>
          <Header>{exercise ? "Edit" : "Add"} Exercise</Header>
          {exercise && (
            <Button
              color="red"
              icon="trash"
              onClick={() => handleDeleteModal(exercise.id)}
            />
          )}
        </Container>
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form>
            <Grid columns={2}>
              <DropdownField
                label="Exercise"
                options={exerciseTypes?.map((e) => ({
                  text: e.name,
                  value: e.id,
                }))}
                value={formValues.exerciseId || ""}
                onChange={(e, { value }) =>
                  setFormValues({ ...formValues, exerciseId: value })
                }
                search
              />
              <InputField
                type="text"
                label="Rest Time"
                value={formValues.restTime}
                onChange={(e, { value }) =>
                  setFormValues({ ...formValues, restTime: value })
                }
              />
              <Grid.Row>
                <Grid.Column width={1} />
                <Grid.Column width={4} style={{ marginLeft: "10px" }}>
                  <Label
                    horizontal
                    style={{ minWidth: "45%", textAlign: "center" }}
                  >
                    Set #:
                  </Label>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Label
                    horizontal
                    style={{ minWidth: "45%", textAlign: "center" }}
                  >
                    Weight:
                  </Label>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Label
                    horizontal
                    style={{ minWidth: "45%", textAlign: "center" }}
                  >
                    Reps:
                  </Label>
                </Grid.Column>
              </Grid.Row>
              {/* Sets */}
              {formValues.sets.map((s, i) => (
                <Grid.Row style={{ marginTop: "-26px" }} key={"set" + i}>
                  <Grid.Column width={1}>
                    <Button
                      icon="trash"
                      color="red"
                      onClick={() => {
                        const newSets = [...formValues.sets];
                        newSets.splice(i, 1);
                        setFormValues({ ...formValues, sets: newSets });
                      }}
                    />
                  </Grid.Column>
                  <Grid.Column
                    width={4}
                    style={{ marginLeft: "10px" }}
                    onClick={() =>
                      copyFromLastWorkout(
                        i,
                        prevExercise?.sets[i]?.weight,
                        prevExercise?.sets[i]?.reps
                      )
                    }
                  >
                    <InputField
                      placeholder="Set #"
                      value={i + 1}
                      disabled
                      type="number"
                    />
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <InputField
                      placeholder={
                        prevExercise
                          ? prevExercise.sets[i]?.weight || "Weight"
                          : "Weight"
                      }
                      type="number"
                      value={s.weight || ""}
                      onChange={(e, { value }) => {
                        const newSets = [...formValues.sets];
                        newSets[i].weight = value;
                        setFormValues({ ...formValues, sets: newSets });
                      }}
                    />
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <InputField
                      placeholder={
                        prevExercise
                          ? prevExercise.sets[i]?.reps || "Reps"
                          : "Reps"
                      }
                      type="number"
                      value={s.reps || ""}
                      onChange={(e, { value }) => {
                        const newSets = [...formValues.sets];
                        newSets[i].reps = value;
                        setFormValues({ ...formValues, sets: newSets });
                      }}
                    />
                  </Grid.Column>
                </Grid.Row>
              ))}
              <Grid.Row style={{ marginTop: "-20px" }}>
                <Grid.Column width={2}>
                  <Button
                    icon="plus"
                    color="green"
                    onClick={() =>
                      setFormValues({
                        ...formValues,
                        sets: [...formValues.sets, { weight: "", reps: "" }],
                      })
                    }
                  />
                </Grid.Column>
              </Grid.Row>
              <TextAreaField
                fullWidth
                label="instructions"
                value={formValues.instructions}
                placeholder={
                  prevExercise
                    ? prevExercise.instructions || "Instructions"
                    : "Instructions"
                }
                onChange={(e, { value }) =>
                  setFormValues({ ...formValues, instructions: value })
                }
              />
            </Grid>
          </Form>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button
          color="blue"
          icon="arrow up"
          onClick={() => {
            handleChangePosition("up", exercise);
            handleCloseModal();
          }}
        />
        <Button
          color="blue"
          icon="arrow down"
          onClick={() => {
            handleChangePosition("down", exercise);
            handleCloseModal();
          }}
        />
        <Button color="red" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={handleSubmitModal}
          positive
        />
      </ModalActions>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    exerciseTypes: state.fitness.exerciseTypes,
  };
}

export default connect(mapStateToProps, {})(EditExerciseModal);
