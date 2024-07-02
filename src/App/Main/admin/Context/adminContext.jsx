import React from "react";
import { apiCall } from "../../../services/api";
import toast from "react-hot-toast";

export const AdminContext = React.createContext();

export const AdminProvider = ({ children }) => {
  const [apiUsers, setApiUsers] = React.useState(null);
  const [allApps, setAllApps] = React.useState(null);
  const [appAccess, setAppAccess] = React.useState(null);
  // loading states
  const [usersLoading, setUsersLoading] = React.useState(false);
  const [appsLoading, setAppsLoading] = React.useState(false);
  const [accessLoading, setAccessLoading] = React.useState(false);
  const [accessChanging, setAccessChanging] = React.useState(false);
  const [buildLoading, setBuildLoading] = React.useState(false);

  // api calls
  function getAllApps() {
    setAppsLoading(true);
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
      })
      .finally(() => setAppsLoading(false));
  }

  function getAllAccess() {
    setAccessLoading(true);
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
      })
      .finally(() => setAccessLoading(false));
  }

  function getAllUsers() {
    setUsersLoading(true);
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
      })
      .finally(() => setUsersLoading(false));
  }

  function toggleUserAppAccess(activeUser, app) {
    setAccessChanging(true);
    const access = appAccess.find(
      (a) => a.userId === activeUser && a.appId === app.id
    );
    if (access) {
      // delete from db
      apiCall("post", "/api/admin/access/delete", {
        credentials: "include",
        userId: activeUser,
        appId: app.id,
      })
        .then((res) => {
          const newAccess = appAccess.filter(
            (a) => !(a.userId === activeUser && a.appId === app.id)
          );
          setAppAccess(newAccess);
        })
        .catch((err) => {
          toast.error(`Error removing app access: ${err}`);
        })
        .finally(() => setAccessChanging(false));
    } else {
      // add access
      apiCall("post", "/api/admin/access/add", {
        credentials: "include",
        userId: activeUser,
        appId: app.id,
      })
        .then((res) => {
          setAppAccess([
            ...appAccess,
            {
              userId: activeUser,
              appId: app.id,
            },
          ]);
        })
        .catch((err) => {
          toast.error(`Error adding app access: ${err}`);
        })
        .finally(() => setAccessChanging(false));
    }
  }

  function publishBuild(version, changes, affectedUsers) {
    setBuildLoading(true);
    const users = Array.from(new Set(affectedUsers));
    apiCall("post", "/api/admin/build", {
      credentials: "include",
      version,
      changes,
      users,
    })
      .then((res) => {
        toast.success("Successfully published build " + version);
      })
      .catch((err) => {
        toast.error(`Error publishing build: ${err}`);
      })
      .finally(() => setBuildLoading(false));
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
        usersLoading,
        appsLoading,
        accessLoading,
        toggleUserAppAccess,
        accessChanging,
        buildLoading,
        publishBuild,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
