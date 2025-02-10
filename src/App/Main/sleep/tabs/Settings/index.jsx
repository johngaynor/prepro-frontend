import React, { useState, useEffect } from "react";
import { Grid, Header, Segment, Input } from "semantic-ui-react";
import { DropdownSelector, InputSelector } from "./components/FormFields";
import { cloneDeep } from "lodash";

const SleepSettings = ({ settings, updateSleepSettings }) => {
  const [search, setSearch] = React.useState("");
  const [formValues, setFormValues] = useState(null);

  useEffect(() => {
    if (!formValues) setFormValues(cloneDeep(settings));
  }, [settings]);

  function onSettingsChange(name, value) {
    setFormValues({ ...formValues, [name]: value });
  }

  function onSettingsBlur(name) {
    updateSleepSettings(name, formValues[name]);
  }

  return (
    <Segment>
      <Header as="h1">User Settings</Header>
      <Grid columns={2} doubling stackable>
        <Grid.Column width={5}>
          <Input
            icon="search"
            iconPosition="left"
            placeholder="Search settings..."
            style={{ width: "100%" }}
            onChange={(e, { value }) => setSearch(value.toLowerCase())}
          />
        </Grid.Column>
        <Grid.Column width={11}>
          <Segment>
            <Header as="h2">Check-Ins</Header>
            <Header as="h5">
              Modify your typical check-in duration and scheduled date.
            </Header>
            <Grid columns={2} doubling stackable>
              <InputSelector
                label="Frequency (Days)"
                name="checkInFrequency"
                value={formValues?.checkInFrequency || ""}
                onChange={onSettingsChange}
                onBlur={onSettingsBlur}
                type="number"
              />
              <DropdownSelector
                label="Check-in Day"
                name="checkInDay"
                days
                value={formValues?.checkInDay || ""}
                onChange={onSettingsChange}
                onBlur={onSettingsBlur}
              />
            </Grid>
          </Segment>
          <Segment>
            <Header as="h2">Goals</Header>
            <Header as="h5">Set target amounts of sleep for each week.</Header>
            <Grid columns={2} doubling stackable>
              <InputSelector
                label="Average Sleep (hrs)"
                name="sleepGoal"
                value={formValues?.sleepGoal || ""}
                onChange={onSettingsChange}
                onBlur={onSettingsBlur}
                type="number"
              />
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default SleepSettings;
