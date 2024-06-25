import React from "react";
import { Accordion, Icon, Grid, Input, Form } from "semantic-ui-react";
import { InputField, TextAreaField } from "../../components/FormFields";

const ExerciseLog = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [formValues, setFormValues] = React.useState({
    comments: "",
    type: "",
    timeStarted: "",
    timeCompleted: "",
  });

  console.log(formValues);

  return (
    <React.Fragment>
      <Accordion fluid styled>
        <Accordion.Title active={activeTab === 0}>
          <Icon name="dropdown" />
          Workout Information
        </Accordion.Title>
        <Accordion.Content active={activeTab === 0}>
          <Form>
            <Grid stackable columns={3}>
              <InputField type="number" placeholder="hi" label="Type" />
              <InputField
                type="time"
                label="Time Started"
                onChange={(e, { value }) =>
                  setFormValues({ ...formValues, timeCompleted: value })
                }
              />
              <InputField
                type="time"
                label="Time Completed"
                onChange={(e, { value }) =>
                  setFormValues({ ...formValues, timeStarted: value })
                }
              />
              <TextAreaField
                label="Workout Comments"
                fullWidth
                value={formValues.comments}
                onChange={(e, { value }) =>
                  setFormValues({ ...formValues, comments: value })
                }
              />
            </Grid>
          </Form>
        </Accordion.Content>
      </Accordion>
    </React.Fragment>
  );
};

export default ExerciseLog;
