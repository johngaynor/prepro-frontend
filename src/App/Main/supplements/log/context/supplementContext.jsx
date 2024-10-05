import React from "react";
import { apiCall } from "../../../../services/api";
import toast from "react-hot-toast";

export const SupplementContext = React.createContext();

export const SupplementProvider = ({ children }) => {
  const [suppItems, setSuppItems] = React.useState(null);
  const [suppLogs, setSuppLogs] = React.useState(null);
  const [missedLogs, setMissedLogs] = React.useState(null);
  // loading states
  const [suppsLoading, setSuppsLoading] = React.useState(false);
  const [logsLoading, setLogsLoading] = React.useState(false);
  const [missedLogsLoading, setMissedLogsLoading] = React.useState(false);

  // api calls
  function getSupplements() {
    setSuppsLoading(true);
    apiCall("get", "/api/supplements/items", { credentials: "include" })
      .then((res) => {
        if (res.result.length) {
          setSuppItems(res.result);
        } else {
          toast.error("No supplements returned...");
        }
      })
      .catch((err) => {
        toast.error(`Error getting supplements: ${err}`);
      })
      .finally(() => setSuppsLoading(false));
  }

  function getSupplementLogs() {
    setLogsLoading(true);
    apiCall("get", "/api/supplements/logs", { credentials: "include" })
      .then((res) => {
        setSuppLogs(res.result);
      })
      .catch((err) => {
        toast.error(`Error getting supplement logs: ${err}`);
      })
      .finally(() => setLogsLoading(false));
  }

  function toggleSupplementLog(item, date) {
    apiCall("post", "/api/supplements/logs", {
      credentials: "include",
      item,
      date,
    })
      .then(() => {
        getSupplementLogs();
      })
      .catch((err) => {
        toast.error(`Error toggling supplement log: ${err}`);
      });
  }

  function getMissedSupplements() {
    setMissedLogsLoading(true);
    apiCall("get", "/api/supplements/logs/missed", { credentials: "include" })
      .then((res) => {
        setMissedLogs(res.result);
      })
      .catch((err) => {
        toast.error(`Error getting missed supplement logs: ${err}`);
      })
      .finally(() => setMissedLogsLoading(false));
  }

  function addMissedSupplement(item, date, reason) {
    apiCall("post", "/api/supplements/logs/missed", {
      credentials: "include",
      item,
      date,
      reason,
    })
      .then(() => {
        getMissedSupplements();
      })
      .catch((err) => {
        toast.error(`Error adding missed supplement: ${err}`);
      });
  }

  return (
    <SupplementContext.Provider
      value={{
        suppItems,
        suppsLoading,
        getSupplements,
        suppLogs,
        logsLoading,
        getSupplementLogs,
        toggleSupplementLog,
        missedLogs,
        missedLogsLoading,
        getMissedSupplements,
        addMissedSupplement,
      }}
    >
      {children}
    </SupplementContext.Provider>
  );
};

export default SupplementContext;
