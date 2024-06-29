import ManageUsers from "./tabs/ManageUsers";
import Tab from "../components/Tab";
import { apiUsers, allApps, appAccess } from "./TESTDATA";
import { AdminProvider } from "./Context/adminContext";

const AdminConsole = () => {
  const mainPanes = [
    {
      menuItem: "Manage Users",
      render: () => {
        return (
          <ManageUsers
            apiUsers={apiUsers}
            allApps={allApps}
            appAccess={appAccess}
          />
        );
      },
    },
  ];
  return (
    <AdminProvider>
      <Tab panes={mainPanes} />
    </AdminProvider>
  );
};

export default AdminConsole;
