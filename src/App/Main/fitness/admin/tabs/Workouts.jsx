import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { DropdownField } from "../../../components/FormFields";
import EditExerciseModal from "../../components/Modals/EditExerciseModal";
import ViewExerciseCard from "../../components/Cards/ViewExerciseCard";
import {
  changeExercisePosition,
  getWorkoutTemplates,
  getExerciseTypes,
  editTemplateExercise,
  deleteTemplateExercise,
} from "../../actions";
import { connect } from "react-redux";

const Workouts = ({
  changeExercisePosition,
  templates,
  templatesLoading,
  getWorkoutTemplates,
  exerciseTypes,
  exerciseTypesLoading,
  getExerciseTypes,
  editTemplateExercise,
  deleteTemplateExercise,
}) => {
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [activeExercise, setActiveExercise] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (!templates && !templatesLoading) getWorkoutTemplates();
    if (!exerciseTypes && !exerciseTypesLoading) getExerciseTypes();
  }, [templates, templatesLoading, exerciseTypes, exerciseTypesLoading]);

  const template = templates?.find((t) => t.id === activeTemplate);

  function handleOpenModal(id) {
    setEditOpen(true);
    setActiveExercise(id);
  }

  return (
    <Tab.Pane>
      <Header as="h4">Manage Workouts:</Header>
      <DropdownField
        label="Workout Templates"
        options={
          templates ? templates.map((t) => ({ text: t.name, value: t.id })) : []
        }
        onChange={(e, { value }) => setActiveTemplate(value)}
      />
      {template ? (
        <>
          <EditExerciseModal
            modalOpen={editOpen}
            setModalOpen={setEditOpen}
            exercise={template.exercises?.find((e) => e.id === activeExercise)}
            setActiveExercise={setActiveExercise}
            handleSubmit={editTemplateExercise}
            handleDelete={deleteTemplateExercise}
            handleChangePosition={changeExercisePosition}
            parentId={template.id}
          />
          <Header as="h5">{template?.name}</Header>
          <Grid columns={3}>
            {template?.exercises
              ?.sort((a, b) => a.orderId - b.orderId)
              .map((e, i) => (
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

function mapStateToProps(state) {
  return {
    templates: state.fitness.templates,
    templatesLoading: state.fitness.templatesLoading,
    exerciseTypes: state.fitness.exerciseTypes,
    exerciseTypesLoading: state.fitness.exerciseTypesLoading,
  };
}

export default connect(mapStateToProps, {
  getWorkoutTemplates,
  getExerciseTypes,
  editTemplateExercise,
  deleteTemplateExercise,
  changeExercisePosition,
})(Workouts);
