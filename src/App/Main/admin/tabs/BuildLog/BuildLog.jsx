import React from "react";
import { Grid, Header, Tab } from "semantic-ui-react";
import { DropdownField, InputField } from "../../../components/FormFields";
import AdminContext from "../../Context/adminContext";
import AppCard from "./AppCard";

const BuildLog = () => {
  const [selectedApps, setSelectedApps] = React.useState({});
  const [version, setVersion] = React.useState("");
  const { allApps, appsLoading, getAllApps } = React.useContext(AdminContext);

  React.useEffect(() => {
    if (!allApps && !appsLoading) getAllApps();
  });

  const handleAppChange = (vals) => {
    const newState = { ...selectedApps };
    // add any new apps
    vals.forEach((val, i) => {
      const app = parseInt(val);
      if (!newState[app]) {
        newState[app] = { 0: "" };
      }
    });
    // remove any old ones
    Object.keys(newState).forEach((app) => {
      const match = vals.find((v) => v === parseInt(app));
      if (!match) delete newState[parseInt(app)];
    });

    setSelectedApps(newState);
  };

  return (
    <Tab.Pane>
      <Header as="h4">Run a Build:</Header>
      <Grid columns={2}>
        <DropdownField
          label="Select Apps"
          placeholder="Select apps to add build notes to..."
          options={
            allApps
              ? allApps.map((u) => ({
                  text: u.name,
                  value: u.id,
                }))
              : []
          }
          multiple
          search
          value={Object.keys(selectedApps).map((a) => parseInt(a))}
          onChange={(e, { value }) => handleAppChange(value)}
        />
        <InputField
          value={version}
          onChange={(e, { value }) => setVersion(value)}
          label="Version"
          placeholder="Enter a version number..."
          type="string"
        />
      </Grid>
      {!Object.keys(selectedApps).length ? (
        <Header as="h5">
          <em>Please select an app for the build.</em>
        </Header>
      ) : (
        <>
          <Header as="h4">Apps:</Header>
          <Grid>
            {Object.keys(selectedApps).map((app, i) => (
              <AppCard
                key={"app" + i}
                app={allApps.find((a) => a.id === parseInt(app))}
                selectedApps={selectedApps}
                setSelectedApps={setSelectedApps}
              />
            ))}
          </Grid>
        </>
      )}
    </Tab.Pane>
  );
};

export default BuildLog;
