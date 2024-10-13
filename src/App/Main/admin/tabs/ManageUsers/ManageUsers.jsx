import React from "react";
import { Tab, Header } from "semantic-ui-react";
import { DropdownField } from "../../../components/FormFields";
import AppSelector from "./AppSelector";
import AdminContext from "../../Context/adminContext";
import Spinner from "../../../components/Spinner";
import { connect } from "react-redux";
import { getAllUsers } from "../../../actions";

const ManageUsers = ({
  // from redux
  apiUsers,
  usersLoading,
  getAllUsers,
}) => {
  const [activeUser, setActiveUser] = React.useState(null);

  const {
    allApps,
    appAccess,
    getAllApps,
    getAllAccess,
    appsLoading,
    accessLoading,
  } = React.useContext(AdminContext);

  React.useEffect(() => {
    if (!apiUsers && !usersLoading) getAllUsers();
    if (!allApps && !appsLoading) getAllApps();
    if (!appAccess && !accessLoading) getAllAccess();
  }, [apiUsers, usersLoading, allApps, appAccess]);

  const activeUserApps = allApps?.map((app) => {
    const match = appAccess?.find(
      (a) => a.appId === app.id && a.userId === activeUser
    );
    return { ...app, access: match ? true : false };
  });

  const panes = [
    {
      menuItem: "Available Apps",
      render: () => {
        return (
          <Tab.Pane>
            {activeUser && apiUsers && allApps && appAccess ? (
              <AppSelector
                activeUser={activeUser}
                activeUserApps={activeUserApps}
              />
            ) : activeUser ? (
              <Spinner />
            ) : (
              <Header as="h5">
                <em>Select a user to edit their available apps</em>
              </Header>
            )}
          </Tab.Pane>
        );
      },
    },
  ];
  return (
    <Tab.Pane>
      <Header as="h4">Manage Users:</Header>
      <DropdownField
        label="Selected User"
        placeholder="Select a user to manage..."
        options={
          apiUsers
            ? apiUsers.map((u) => ({
                text: u.name + " - " + u.email,
                value: u.id,
              }))
            : []
        }
        value={activeUser}
        onChange={(e, { value }) => setActiveUser(value)}
      />
      <Tab
        panes={panes}
        menu={{
          pointing: true,
          className: "wrapped",
          color: "grey",
          inverted: true,
        }}
        style={{ marginTop: "10px" }}
      ></Tab>
    </Tab.Pane>
  );
};

function mapStateToProps(state) {
  return {
    apiUsers: state.app.apiUsers,
    usersLoading: state.app.usersLoading,
  };
}

export default connect(mapStateToProps, { getAllUsers })(ManageUsers);
