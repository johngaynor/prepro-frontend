import React, { createContext, useState } from "react";
import { apiCall } from "../../services/api";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);
  const [apps, setApps] = useState([]);
  const [apiUsers, setApiUsers] = useState(null);
  // loading states
  const [userLoading, setUserLoading] = useState(true);
  const [appsLoading, setAppsLoading] = useState(false);
  const [changeLog, setChangeLog] = useState(null);
  const [logLoading, setLogLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);

  function authUser() {
    apiCall("get", "/api/auth/user", { credentials: "include" })
      .then((res) => {
        if (res.user) {
          setUserLoading(false);
          setAuth(true);
          setUser(res.user);
        } else {
          throw new Error("No user is signed in...");
        }
      })
      .catch((err) => {
        toast.error(`Error authenticating user: ${err}`);
      });
  }

  function getApps() {
    setAppsLoading(true);
    apiCall("get", "/api/dashboard/apps")
      .then((res) => {
        setApps(res.result);
      })
      .catch((err) => {
        toast.error(`Error getting user apps: ${err}`);
      });
    setAppsLoading(false);
  }

  function clearApps() {
    setAppsLoading(true);
    setApps([]);
    setAppsLoading(false);
  }

  function getChangeLog() {
    setLogLoading(true);
    apiCall("get", "/api/dashboard/changelog")
      .then((res) => {
        if (res.result) {
          setChangeLog(res.result);
        } else {
          toast.error("Something went wrong retrieving change log...");
        }
      })
      .catch((err) => {
        toast.error(`Error getting change log: ${err}`);
      })
      .finally(() => setLogLoading(false));
  }

  function clearLog(versions) {
    apiCall("post", "/api/dashboard/changelog", { versions })
      .then((res) => {})
      .catch((err) => {
        toast.error(`Error updating change log: ${err}`);
      });
  }

  function getAllUsers() {
    setUsersLoading(true);
    apiCall("get", "/api/users", { credentials: "include" })
      .then((res) => {
        if (res.result.length) {
          setApiUsers(res.result);
        } else {
          toast.error("No apps returned...");
        }
      })
      .catch((err) => {
        toast.error(`Error getting all user access: ${err}`);
      })
      .finally(() => setUsersLoading(false));
  }

  return (
    <AppContext.Provider
      value={{
        user,
        userLoading,
        auth,
        apps,
        appsLoading,
        changeLog,
        logLoading,
        getChangeLog,
        clearLog,
        authUser,
        getApps,
        clearApps,
        getAllUsers,
        apiUsers,
        usersLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
