import React, { useContext, useEffect } from "react";
import { Grid, Header, Tab } from "semantic-ui-react";
import FitnessContext from "../../Context/fitnessContext";
import { DropdownField } from "../../../components/FormFields";
import EditExerciseModal from "../../components/EditExerciseModal";
import ViewExerciseCard from "../../components/ExerciseCards/ViewExerciseCard";

const Workouts = () => {
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const {
    workoutTemplates,
    templatesLoading,
    getWorkoutTemplates,
    exerciseTypes,
    exerciseTypesLoading,
    getExerciseTypes,
    editWorkoutTemplate,
  } = useContext(FitnessContext);

  useEffect(() => {
    if (!workoutTemplates && !templatesLoading) getWorkoutTemplates();
    if (!exerciseTypes && !exerciseTypesLoading) getExerciseTypes();
  }, [workoutTemplates, templatesLoading]);

  return (
    <Tab.Pane>
      <Header as="h4">Manage Workouts:</Header>
      <DropdownField
        label="Templates"
        options={
          workoutTemplates
            ? workoutTemplates.map((t) => ({ text: t.name, value: t.id }))
            : []
        }
        onChange={(e, { value }) => setActiveTemplate(value)}
      />
      <EditExerciseModal
        open={editOpen}
        handleSubmit={editWorkoutTemplate}
        handleCancel={() => setEditOpen(false)}
        exercise={activeTemplate?.[editOpen]}
        parentId={activeTemplate.id}
      />
      {activeTemplate ? (
        <>
          <Header as="h5">{activeTemplate.name}</Header>
          <Grid columns={3}>
            {activeTemplate?.exercises.map((e, i) => (
              <ViewExerciseCard
                exercise={e}
                index={i}
                handleEdit={() => setEditOpen(e.id)}
              />
            ))}
          </Grid>
        </>
      ) : (
        <em>Please select a template to edit the associated exercises.</em>
      )}
    </Tab.Pane>
  );
};

export default Workouts;
