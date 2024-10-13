import Tab from "../components/Tab";
import ManageUsers from "./tabs/ManageUsers/ManageUsers";
import BuildLog from "./tabs/BuildLog/BuildLog";

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
  return <Tab panes={mainPanes} />;
};

export default AdminConsole;
