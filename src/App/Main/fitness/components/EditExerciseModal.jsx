import React, { useContext, useState } from "react";
import {
  DropdownField,
  InputField,
  TextAreaField,
} from "../../../../components/FormFields";
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
} from "semantic-ui-react";
import FitnessContext from "../../../Context/fitnessContext";

const defaultValues = {
  exerciseId: null,
  restTime: "",
  comments: "",
  sets: [{ weight: "", reps: "" }],
};

const EditExerciseModal = ({
  open,
  exercise,
  handleCancel,
  handleSubmit,
  parentId,
}) => {
  const [formValues, setFormValues] = useState({
    exerciseId: exercise.id,
    restTime: exercise.restTime || "",
    comments: exercise.comments || "",
    sets: exercise.sets || [{ weight: "", reps: "" }],
  });

  const { exerciseTypes } = useContext(FitnessContext);

  return (
    <Modal
      onClose={() => {
        handleCancel();
        setFormValues(defaultValues);
      }}
      open={open}
    >
      <ModalHeader>Add Exercise</ModalHeader>
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
                value={formValues.exerciseId}
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
              {formValues.sets
                // .sort((a, b) => a.orderId - b.orderId)
                .map((s, i) => (
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
                    <Grid.Column width={4} style={{ marginLeft: "10px" }}>
                      <InputField
                        placeholder="Set #"
                        value={i + 1}
                        disabled
                        type="number"
                      />
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <InputField
                        placeholder="Weight"
                        type="number"
                        value={s.weight}
                        onChange={(e, { value }) => {
                          const newSets = [...formValues.sets];
                          newSets[i].weight = value;
                          setFormValues({ ...formValues, sets: newSets });
                        }}
                      />
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <InputField
                        placeholder="Reps"
                        type="number"
                        value={s.reps}
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
                label="comments"
                value={formValues.comments}
                onChange={(e, { value }) =>
                  setFormValues({ ...formValues, comments: value })
                }
              />
            </Grid>
          </Form>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button
          color="red"
          onClick={() => {
            handleCancel();
            setFormValues(defaultValues);
          }}
        >
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={() => handleSubmit({ ...formValues, parentId })}
          // will need to add validation here at some point
          positive
        />
      </ModalActions>
    </Modal>
  );
};

export default EditExerciseModal;
