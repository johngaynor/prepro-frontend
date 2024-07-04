import React from "react";
import { Grid, Header, Tab, Button, Container, Form } from "semantic-ui-react";
import { DropdownField, InputField } from "../../../components/FormFields";
import AdminContext from "../../Context/adminContext";
import AppCard from "./AppCard";
import Spinner from "../../../components/Spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BuildLog = () => {
  const [selectedApps, setSelectedApps] = React.useState({});
  const [version, setVersion] = React.useState("");
  const [formErrors, setFormErrors] = React.useState({});

  const {
    allApps,
    appsLoading,
    getAllApps,
    publishBuild,
    buildLoading,
    appAccess,
    accessLoading,
    getAllAccess,
    apiUsers,
    usersLoading,
    getAllUsers,
  } = React.useContext(AdminContext);

  React.useEffect(() => {
    if (!allApps && !appsLoading) getAllApps();
    if (!appAccess && !accessLoading) getAllAccess();
    if (!apiUsers && !usersLoading) getAllUsers();
  });

  const navigate = useNavigate();

  const validateForm = (vals) => {
    const errors = {
      version: false,
    };

    if (!vals.version)
      errors.version = "Please enter a version number for this build.";
    if (errors.version) {
      setFormErrors(errors);
      return false;
    }

    return true;
  };

  const handleAppChange = (vals) => {
    const newState = { ...selectedApps };
    // add any new apps
    vals.forEach((val, i) => {
      const app = parseInt(val);
      if (!newState[app]) {
        newState[app] = { 0: { text: "", type: "bug" } };
      }
    });
    // remove any old ones
    Object.keys(newState).forEach((app) => {
      const match = vals.find((v) => v === parseInt(app));
      if (!match) delete newState[parseInt(app)];
    });

    setSelectedApps(newState);
  };

  const handleSubmitBuild = () => {
    const buildObj = Object.keys(selectedApps).reduce(
      (acc, app) => {
        const retObj = { ...acc };

        const appId = parseInt(app);

        // add in comments for each app
        Object.keys(selectedApps[appId]).forEach((t) => {
          if (selectedApps[appId][t] !== "")
            retObj.changes.push({
              appId,
              textId: parseInt(t),
              text: selectedApps[appId][t].text,
              type: selectedApps[appId][t].type,
            });
        });

        // add affected users
        const allUsers = allApps.find((a) => a.id === appId)?.allUsers;
        if (allUsers) {
          apiUsers.forEach((u) => {
            retObj.affectedUsers.push(u.id);
          });
        } else {
          appAccess.forEach((a) => {
            if (a.appId === appId) retObj.affectedUsers.push(a.userId);
          });
        }

        return retObj;
      },
      { changes: [], affectedUsers: [] }
    );

    if (!buildObj.changes.length) {
      toast.error("Please add app changes before publishing this build.");
    } else {
      publishBuild(version, buildObj.changes, buildObj.affectedUsers);
      navigate("/");
    }
  };

  return (
    <Tab.Pane>
      {(appsLoading || buildLoading || accessLoading) && <Spinner />}
      <Header as="h4">Run a Build:</Header>
      <Form
        onSubmit={() => {
          const valid = validateForm({ version, apps: selectedApps });
          if (valid) {
            setFormErrors({});
            handleSubmitBuild();
          }
        }}
      >
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
            error={formErrors.version}
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
            <Container
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
                width: "100%",
              }}
            >
              <Button
                style={{ marginRight: 0 }}
                color="blue"
                icon="save"
                content="Submit"
                type="submit"
              />
            </Container>
          </>
        )}
      </Form>
    </Tab.Pane>
  );
};

export default BuildLog;
