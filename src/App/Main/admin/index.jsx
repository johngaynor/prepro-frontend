import Tab from "../components/Tab";
import ManageUsers from "./tabs/ManageUsers/ManageUsers";
import BuildLog from "./tabs/BuildLog/BuildLog";
import { AdminProvider } from "./Context/adminContext";

const AdminConsole = () => {
  const mainPanes = [
    {
      menuItem: "Manage Users",
      render: () => {
        return <ManageUsers />;
      },
    },
    {
      menuItem: "Build Log",
      render: () => {
        return <BuildLog />;
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
