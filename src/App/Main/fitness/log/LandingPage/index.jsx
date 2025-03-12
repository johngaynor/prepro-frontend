import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Divider,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";
import { DropdownField, InputField } from "../../../components/FormFields";
import { connect } from "react-redux";
import LandingChoice from "./LandingChoice";
import { startWorkout } from "../../actions";
import { useParams, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import HorizontalSlide from "../../../components/Motion/HorizontalSlide";

const LandingPage = ({ templates, startWorkout }) => {
  const [choice, setChoice] = useState(1);
  const [template, setTemplate] = useState(null);

  const { date } = useParams();
  const navigate = useNavigate();

  function handleChangeDate(direction) {
    const currentDate = DateTime.fromISO(date);
    let newDate;

    if (direction === "left") {
      newDate = currentDate.minus({ days: 1 });
    } else if (direction === "right") {
      newDate = currentDate.plus({ days: 1 });
    }

    navigate(`/fitness/log/${newDate.toFormat("yyyy-MM-dd")}`);
  }

  return (
    <HorizontalSlide
      handleChangeDate={handleChangeDate}
      pageKey={date}
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
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
        <Header as="h1" icon style={{ userSelect: "none" }}>
          <Icon name="fire" size="massive" color="orange" />
          Start Workout
        </Header>

        <Grid stackable columns={1} style={{ width: "90%" }}>
          <InputField
            type="date"
            value={DateTime.fromISO(date).toFormat("yyyy-MM-dd")}
            onChange={(e, { value }) => navigate(`/fitness/log/${value}`)}
          />
        </Grid>
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
      </Segment>
    </HorizontalSlide>
  );
};

function mapStateToProps(state) {
  return {
    templates: state.fitness.templates,
  };
}

export default connect(mapStateToProps, { startWorkout })(LandingPage);
