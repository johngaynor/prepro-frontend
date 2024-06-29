import React from "react";

export const AdminContext = React.createContext();

export const AdminProvider = ({ children }) => {
  const [apiUsers, setApiUsers] = React.useState([
    {
      id: "103338778199308905720",
      name: "John Gaynor",
    },
    {
      id: "114883008758552617790",
      name: "Tyler Goodall",
    },
  ]);
  const [allApps, setAllApps] = React.useState([
    {
      id: 1,
      name: "Test App",
      link: "/test",
    },
    {
      id: 2,
      name: "Logs",
      link: "/logs",
    },
  ]);
  const [appAccess, setAppAccess] = React.useState([
    { appId: 1, userId: "103338778199308905720" },
  ]);

  return (
    <AdminContext.Provider value={{ apiUsers, allApps, appAccess }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
