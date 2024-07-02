import React from "react";
import { apiCall } from "../../../services/api";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = React.useState({});
  const [userLoading, setUserLoading] = React.useState(true);
  const [auth, setAuth] = React.useState(false);
  const [apps, setApps] = React.useState([]);
  const [appsLoading, setAppsLoading] = React.useState(false);
  const [changeLog, setChangeLog] = React.useState(null);
  const [logLoading, setLogLoading] = React.useState(false);

  // console.log(user); // user.id

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

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        userLoading,
        setUserLoading,
        auth,
        setAuth,
        apps,
        setApps,
        appsLoading,
        setAppsLoading,
        changeLog,
        logLoading,
        getChangeLog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
