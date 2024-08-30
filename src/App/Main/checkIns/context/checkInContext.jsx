import React, { createContext, useState } from "react";
import { apiCall } from "../../../services/api";
import toast from "react-hot-toast";

export const CheckInContext = createContext();

export const CheckInProvider = ({ children }) => {
  const [checkIns, setCheckIns] = useState([
    {
      id: 1,
      date: "2024-08-30",
      weight: 100,
      questions: [],
    },
  ]);

  // get workout logs
  //   function getWorkoutLogs() {
  //     setLogsLoading(true);
  //     apiCall("get", "/api/fitness/logs")
  //       .then((res) => {
  //         if (res.result) {
  //           setWorkoutLogs(res.result);
  //         } else {
  //           throw new Error("No result from API call...");
  //         }
  //       })
  //       .catch((err) => {
  //         toast.error(`Error getting workout logs: ${err.message}`);
  //       })
  //       .finally(() => setLogsLoading(false));
  //   }

  return (
    <CheckInContext.Provider value={{ checkIns }}>
      {children}
    </CheckInContext.Provider>
  );
};

export default CheckInContext;
