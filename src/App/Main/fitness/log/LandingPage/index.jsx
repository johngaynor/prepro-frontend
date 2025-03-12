import React, { useState } from "react";
import { Button, Form, Grid, Divider, Header, Icon } from "semantic-ui-react";
import { DropdownField } from "../../../components/FormFields";
import { connect } from "react-redux";
import LandingChoice from "./LandingChoice";
import { startWorkout } from "../../actions";
import { useParams } from "react-router-dom";

const LandingPage = ({ templates, startWorkout }) => {
  const [choice, setChoice] = useState(1);
  const [template, setTemplate] = useState(null);

  const { date } = useParams();

  return (
    <React.Fragment>
      <Header as="h1" icon style={{ userSelect: "none" }}>
        <Icon name="fire" size="massive" color="orange" />
        Start Workout
      </Header>
      <Header as="h4" textAlign="center">
        Choose one of the following options:
      </Header>
      <LandingChoice choice={choice} setChoice={setChoice} id={1}>
        <Header
          as="h3"
          style={{
            margin: 0,
            textAlign: "center",
          }}
        >
          Copy From Template
        </Header>
        <Form style={{ width: "80%", marginTop: 10 }}>
          <Grid>
            <DropdownField
              fullWidth
              placeholder="Select Template..."
              options={
                templates
                  ? templates.map((t) => ({
                      text: t.name,
                      value: t.id,
                    }))
                  : []
              }
              value={template}
              onChange={(e, { value }) => setTemplate(value)}
              search
            />
          </Grid>
        </Form>
      </LandingChoice>
      <Divider horizontal>Or</Divider>
      <LandingChoice choice={choice} setChoice={setChoice} id={2}>
        <Header
          as="h3"
          style={{ margin: 0, textAlign: "center", userSelect: "none" }}
        >
          Start from Scratch
        </Header>
      </LandingChoice>
      <Button
        content="Start Session"
        icon="play"
        labelPosition="right"
        color="blue"
        style={{ marginTop: 40 }}
        disabled={choice === 1 && !template}
        onClick={() => startWorkout(date, template, choice === 2)}
      />
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    templates: state.fitness.templates,
  };
}

export default connect(mapStateToProps, { startWorkout })(LandingPage);
