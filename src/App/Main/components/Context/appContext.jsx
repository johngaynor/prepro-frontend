import React, { useReducer } from "react";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = React.useState({});
  const [userLoading, setUserLoading] = React.useState(true);
  const [auth, setAuth] = React.useState(false);
  const [apps, setApps] = React.useState([]);
  const [appsLoading, setAppsLoading] = React.useState(false);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
