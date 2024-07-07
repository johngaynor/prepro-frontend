import React from "react";
import { apiCall } from "../../../services/api";
import toast from "react-hot-toast";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = React.useState({});
  const [userLoading, setUserLoading] = React.useState(true);
  const [auth, setAuth] = React.useState(false);
  const [apps, setApps] = React.useState([]);
  const [appsLoading, setAppsLoading] = React.useState(false);
  const [changeLog, setChangeLog] = React.useState(null);
  const [logLoading, setLogLoading] = React.useState(false);

  function authUser() {
    apiCall("get", "/api/auth/user", { credentials: "include" })
      .then((res) => {
        if (res.user) {
          setUserLoading(false);
          setAuth(true);
          setUser(res.user);
        } else {
          toast.error("Unknown error occurred...");
          setUser({});
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
