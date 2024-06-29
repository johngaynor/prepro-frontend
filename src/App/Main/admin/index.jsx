import ManageUsers from "./tabs/ManageUsers";
import Tab from "../components/Tab";
import { AdminProvider } from "./Context/adminContext";

const AdminConsole = () => {
  const mainPanes = [
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
