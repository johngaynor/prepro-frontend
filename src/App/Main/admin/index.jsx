import Tab from "../components/Tab";
import ManageUsers from "./tabs/ManageUsers/ManageUsers";
import BuildLog from "./tabs/BuildLog/BuildLog";
import { AdminProvider } from "./Context/adminContext";

const AdminConsole = () => {
  const mainPanes = [
    {
      menuItem: "Build Log",
      render: () => {
        return <BuildLog />;
      },
    },
    {
      menuItem: "Manage Users",
      render: () => {
        return <ManageUsers />;
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
