import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Grid,
  Divider,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";
import { DropdownField } from "../../../../components/FormFields";
import { connect } from "react-redux";
import LandingChoice from "./StartChoice";
import { startWorkout } from "../../../actions";
import { useParams, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

const LandingPage = ({ templates, programs, startWorkout }) => {
  const { date } = useParams();
  const dayOfWeek = DateTime.fromISO(date).weekday;
  const programmedWorkout = programs?.days?.find((d) => d.day === dayOfWeek);

  const [choice, setChoice] = useState(programmedWorkout ? 3 : 1);
  const [template, setTemplate] = useState(null);

  const navigate = useNavigate();

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
      <Header as="h2" textAlign="center">
        {DateTime.fromISO(date).toFormat("cccc MM/dd/yyyy")}
      </Header>
      <Header as="h1" icon style={{ userSelect: "none" }}>
        <Icon name="fire" size="massive" color="orange" />
        Start Workout
      </Header>
      <Header as="h4" textAlign="center">
        Choose one of the following options:
      </Header>
      <LandingChoice
        choice={choice}
        setChoice={setChoice}
        id={3}
        disabled={!programmedWorkout}
      >
        <Header
          as="h3"
          style={{ margin: 0, textAlign: "center", userSelect: "none" }}
        >
          Scheduled Workout{" "}
          {programmedWorkout ? `- ${programmedWorkout.name}` : ""}
        </Header>
      </LandingChoice>
      <Divider horizontal>Or</Divider>
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
        disabled={
          (choice === 1 && !template) ||
          choice === 2 ||
          (choice === 3 && !programmedWorkout)
        } // clear out the manual workout if it is not selected
        onClick={() => {
          const time = DateTime.now().setZone("local").toFormat("HH:mm");
          startWorkout(
            date,
            time,
            choice === 3 ? programmedWorkout.templateId : template,
            choice === 2
          ).then((data) => navigate(`/fitness/workout/${data.workoutId}`));
        }}
      />
    </Segment>
  );
};

function mapStateToProps(state) {
  return {
    templates: state.fitness.templates,
    programs: state.fitness.programs,
  };
}

export default connect(mapStateToProps, { startWorkout })(LandingPage);
