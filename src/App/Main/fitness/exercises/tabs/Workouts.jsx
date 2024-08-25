import React, { useContext, useEffect, useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import FitnessContext from "../../Context/fitnessContext";
import { DropdownField } from "../../../components/FormFields";
import EditExerciseModal from "../../components/EditExerciseModal";
import ViewExerciseCard from "../../components/ExerciseCards/ViewExerciseCard";

const Workouts = () => {
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [activeExercise, setActiveExercise] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const {
    workoutTemplates,
    templatesLoading,
    getWorkoutTemplates,
    exerciseTypes,
    exerciseTypesLoading,
    getExerciseTypes,
    editTemplateExercises,
    deleteTemplateExercise,
  } = useContext(FitnessContext);

  useEffect(() => {
    if (!workoutTemplates && !templatesLoading) getWorkoutTemplates();
    if (!exerciseTypes && !exerciseTypesLoading) getExerciseTypes();
  }, [workoutTemplates, templatesLoading]);

  const template = workoutTemplates?.find((t) => t.id === activeTemplate);

  function handleCloseModal() {
    setEditOpen(false);
    setActiveExercise(null);
  }

  function handleOpenModal(id) {
    setEditOpen(true);
    setActiveExercise(id);
  }

  function handleSubmitModal(vals) {
    editTemplateExercises(vals);
    setEditOpen(false);
    setActiveExercise(null);
  }

  function handleDeleteModal(id) {
    deleteTemplateExercise(id);
    setActiveExercise(null);
    setEditOpen(false);
  }

  return (
    <Tab.Pane>
      <Header as="h4">Manage Workouts:</Header>
      <DropdownField
        label="Workout Templates"
        options={
          workoutTemplates
            ? workoutTemplates.map((t) => ({ text: t.name, value: t.id }))
            : []
        }
        onChange={(e, { value }) => setActiveTemplate(value)}
      />
      {editOpen && (
        <EditExerciseModal
          open={true}
          handleSubmit={handleSubmitModal}
          handleCancel={handleCloseModal}
          handleDelete={handleDeleteModal}
          exercise={template?.exercises?.find((e) => e.id === activeExercise)}
          parentId={template?.id}
        />
      )}

      {activeTemplate ? (
        <>
          <Header as="h5">{template?.name}</Header>
          <Grid columns={3}>
            {template?.exercises?.map((e, i) => (
              <ViewExerciseCard
                exercise={e}
                index={i}
                handleEdit={() => handleOpenModal(e.id)}
                key={"view-card-workouts-" + i}
              />
            ))}
            <Grid.Column>
              <Button
                color="green"
                icon="plus"
                onClick={() => setEditOpen(true)}
              />
            </Grid.Column>
          </Grid>
        </>
      ) : (
        <em>Please select a template to edit the associated exercises.</em>
      )}
    </Tab.Pane>
  );
};

export default Workouts;
