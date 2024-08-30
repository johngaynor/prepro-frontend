import React, { useReducer } from "react";

export const LogContext = React.createContext();

export const LogProvider = ({ children }) => {
  const [logs, setLogs] = React.useState([]);
  const [logsLoading, setLogsLoading] = React.useState(false);
  const [logType, setLogType] = React.useState("");
  const [date, setDate] = React.useState("");
  const [selectedLog, setSelectedLog] = React.useState(null);
  const [formData, setFormData] = React.useState({
    amWeight: "",
    // photos: null,
    sleepQuality: "",
    sleepHours: "",
    stress: "",
    soreness: "",
    mood: "",
    energy: "",
    workoutComments: "",
    dayComments: "",
    logType: "",
  });

  return (
    <LogContext.Provider
      value={{
        logs,
        setLogs,
        logsLoading,
        setLogsLoading,
        logType,
        setLogType,
        formData,
        setFormData,
        date,
        setDate,
        selectedLog,
        setSelectedLog,
      }}
    >
      {children}
    </LogContext.Provider>
  );
};

export default LogContext;
