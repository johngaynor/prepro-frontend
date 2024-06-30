import React from "react";
import { Grid, Header, Tab } from "semantic-ui-react";
import { DropdownField, InputField } from "../../components/FormFields";
import AdminContext from "../Context/adminContext";

const BuildLog = () => {
  const [selectedApps, setSelectedApps] = React.useState([]);
  const [version, setVersion] = React.useState("");
  const { allApps, appsLoading, getAllApps } = React.useContext(AdminContext);

  React.useEffect(() => {
    if (!allApps && !appsLoading) getAllApps();
  });

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
          value={selectedApps}
          onChange={(e, { value }) => setSelectedApps(value)}
        />
        <InputField
          value={version}
          onChange={(e, { value }) => setVersion(value)}
          label="Version"
          placeholder="Enter a version number..."
          type="string"
        />
      </Grid>
      {!selectedApps.length ? (
        <Header as="h5">
          <em>Please select an app for the build.</em>
        </Header>
      ) : (
        <>
          <Header as="h4">Apps:</Header>
        </>
      )}
      {/* <Tab
        panes={panes}
        menu={{
          pointing: true,
          className: "wrapped",
          color: "grey",
          inverted: true,
        }}
        style={{ marginTop: "10px" }}
      ></Tab> */}
    </Tab.Pane>
  );
};

export default BuildLog;
