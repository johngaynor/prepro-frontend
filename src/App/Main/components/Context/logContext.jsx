import React, { useReducer } from "react";

export const LogContext = React.createContext();

export const LogProvider = ({ children }) => {
  const [logs, setLogs] = React.useState([]);
  const [logsLoading, setLogsLoading] = React.useState(false);

  return (
    <LogContext.Provider
      value={{
        logs,
        setLogs,
        logsLoading,
        setLogsLoading,
      }}
    >
      {children}
    </LogContext.Provider>
  );
};

export default LogContext;
