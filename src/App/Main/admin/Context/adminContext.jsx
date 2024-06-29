import React from "react";
import { apiCall } from "../../../services/api";
import toast from "react-hot-toast";

export const AdminContext = React.createContext();

export const AdminProvider = ({ children }) => {
  const [apiUsers, setApiUsers] = React.useState([]);
  const [allApps, setAllApps] = React.useState([]);
  const [appAccess, setAppAccess] = React.useState([]);

  function getAllApps() {
    apiCall("get", "/api/admin/apps", { credentials: "include" })
      .then((res) => {
        if (res.result.length) {
          setAllApps(res.result);
        } else {
          toast.error("No apps returned...");
        }
      })
      .catch((err) => {
        toast.error(`Error getting admin apps: ${err}`);
      });
  }

  function getAllAccess() {
    apiCall("get", "/api/admin/access", { credentials: "include" })
      .then((res) => {
        if (res.result.length) {
          setAppAccess(res.result);
        } else {
          toast.error("No apps returned...");
        }
      })
      .catch((err) => {
        toast.error(`Error getting all user access: ${err}`);
      });
  }

  function getAllUsers() {
    apiCall("get", "/api/admin/users", { credentials: "include" })
      .then((res) => {
        if (res.result.length) {
          setApiUsers(res.result);
        } else {
          toast.error("No apps returned...");
        }
      })
      .catch((err) => {
        toast.error(`Error getting all user access: ${err}`);
      });
  }

  return (
    <AdminContext.Provider
      value={{
        apiUsers,
        allApps,
        appAccess,
        getAllApps,
        getAllAccess,
        getAllUsers,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
